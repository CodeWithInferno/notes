import { NextResponse } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0/edge'
import prisma from '@/lib/prisma'

// GET /api/notes/[id]/reviews - Fetches all reviews for a note
export async function GET(req, { params }) {
  const { id: noteId } = params
  try {
    const reviews = await prisma.review.findMany({
      where: { noteId },
      include: {
        user: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json({ reviews })
  } catch (error) {
    console.error(`Failed to fetch reviews for note ${noteId}:`, error)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

// POST /api/notes/[id]/reviews - Submits a new review for a note
export async function POST(req, { params }) {
  const session = await getSession(req)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({ where: { auth0Id: session.user.sub } })
  if (!dbUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  try {
    const { id: noteId } = params
    const { rating, comment } = await req.json()

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Invalid rating. Must be between 1 and 5.' }, { status: 400 })
    }

    const note = await prisma.note.findUnique({
      where: { id: noteId },
      select: { uploaderId: true },
    })

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    // Start a transaction to create the review and update kudos points
    const [newReview] = await prisma.$transaction([
      prisma.review.create({
        data: {
          rating,
          comment,
          noteId,
          userId: dbUser.id,
        },
      }),
      prisma.user.update({
        where: { id: note.uploaderId },
        data: {
          kudosPoints: {
            increment: rating === 5 ? 5 : rating === 1 ? -2 : 0,
          },
        },
      }),
    ])

    return NextResponse.json(newReview, { status: 201 })
  } catch (error) {
    // Handle cases where a user might try to review the same note twice
    if (error.code === 'P2002') {
        return NextResponse.json({ error: 'You have already reviewed this note.' }, { status: 409 });
    }
    console.error('Failed to create review:', error)
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }
}
