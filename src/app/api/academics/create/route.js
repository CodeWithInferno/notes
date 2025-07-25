import { getSession } from '@auth0/nextjs-auth0/edge'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
  const session = await getSession(request)
  const user = session?.user

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { type, data } = await request.json()

  if (!type || !data) {
    return NextResponse.json({ error: 'Missing type or data' }, { status: 400 })
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { auth0Id: user.sub },
      select: { id: true },
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found in database' }, { status: 404 })
    }

    let result
    const createData = { ...data, createdById: dbUser.id }

    switch (type) {
      case 'course':
        result = await prisma.course.create({ data: createData })
        break
      case 'professor':
        result = await prisma.professor.create({ data: createData })
        break
      case 'semester':
        result = await prisma.semester.create({ data: createData })
        break
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error(`Error creating ${type}:`, error)
    // Provide a more specific error message if possible (e.g., unique constraint violation)
    if (error.code === 'P2002') {
        return NextResponse.json({ error: `A ${type} with these details already exists.` }, { status: 409 });
    }
    return NextResponse.json({ error: `Failed to create ${type}` }, { status: 500 })
  }
}
