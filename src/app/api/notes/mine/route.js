import { getSession } from '@auth0/nextjs-auth0/edge'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(req) {
  const session = await getSession(req) // Correctly pass the request object
  const user = session?.user

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { auth0Id: user.sub },
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const notes = await prisma.note.findMany({
      where: { uploaderId: dbUser.id },
      include: {
        course: {
          include: {
            professor: true,
          },
        },
        semester: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const notesWithRatings = await Promise.all(
      notes.map(async (note) => {
        const aggregate = await prisma.review.aggregate({
          _avg: {
            rating: true,
          },
          where: {
            noteId: note.id,
          },
        })
        return {
          ...note,
          averageRating: aggregate._avg.rating || 0,
        }
      }),
    )

    return NextResponse.json({ notes: notesWithRatings })
  } catch (error) {
    console.error('Failed to fetch user notes:', error)
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
  }
}
