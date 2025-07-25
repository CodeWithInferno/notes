import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET /api/notes/recent - Fetches the 4 most recently uploaded notes
export async function GET() {
  try {
    const recentNotes = await prisma.note.findMany({
      take: 4,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        course: {
          select: { name: true },
        },
        semester: {
          select: { name: true, year: true },
        },
      },
    })
    return NextResponse.json({ notes: recentNotes })
  } catch (error) {
    console.error('Failed to fetch recent notes:', error)
    return NextResponse.json({ error: 'Failed to fetch recent notes' }, { status: 500 })
  }
}
