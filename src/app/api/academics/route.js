import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const [courses, professors, semesters] = await prisma.$transaction([
      prisma.course.findMany(),
      prisma.professor.findMany(),
      prisma.semester.findMany(),
    ])

    return NextResponse.json({
      courses,
      professors,
      semesters,
    })
  } catch (error) {
    console.error('Error fetching academic data:', error)
    return NextResponse.json({ error: 'Failed to fetch academic data' }, { status: 500 })
  }
}
