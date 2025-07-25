import { NextResponse } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0/edge'
import prisma from '@/lib/prisma'

// GET /api/admin/users?search=... - Fetches users for the admin dashboard
export async function GET(req) {
  const session = await getSession(req)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({ where: { auth0Id: session.user.sub } })
  if (dbUser?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const searchQuery = searchParams.get('search')

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: searchQuery
          ? [
              { name: { contains: searchQuery, mode: 'insensitive' } },
              { email: { contains: searchQuery, mode: 'insensitive' } },
            ]
          : undefined,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json({ users })
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

// PUT /api/admin/users - Updates a user's role
export async function PUT(req) {
  const session = await getSession(req)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({ where: { auth0Id: session.user.sub } })
  if (dbUser?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const { userId, role } = await req.json()
    if (!userId || !role) {
      return NextResponse.json({ error: 'Missing userId or role' }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Failed to update user role:', error)
    return NextResponse.json({ error: 'Failed to update user role' }, { status: 500 })
  }
}
