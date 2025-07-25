import { NextResponse } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0/edge'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(req) {
  const session = await getSession(req)
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

    // Security Check: Only allow certain roles to explore
    if (!['TUTOR', 'ADMIN', 'PROFESSOR'].includes(dbUser.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Fetch all notes, as the explore page should show everything
    const notes = await prisma.note.findMany({
      include: {
        course: {
          include: {
            professor: true,
          },
        },
        semester: true,
        uploader: {
          select: {
            name: true,
          },
        },
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

    // Fetch all unique filter options in parallel
    const [courses, professors, semesters] = await prisma.$transaction([
      prisma.course.findMany({ distinct: ['name'] }),
      prisma.professor.findMany({ distinct: ['name'] }),
      prisma.semester.findMany({ distinct: ['name', 'year'] }),
    ])

    const filterOptions = {
      courses: courses.map(c => c.name),
      professors: professors.map(p => p.name),
      semesters: semesters.map(s => `${s.name} ${s.year}`),
    }

    return NextResponse.json({ notes: notesWithRatings, filterOptions })
  } catch (error) {
    console.error('Failed to fetch explore notes:', error)
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
  }
}
