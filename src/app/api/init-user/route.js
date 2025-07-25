import { getSession } from '@auth0/nextjs-auth0/edge'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(req) {
  const session = await getSession(req)
  const user = session?.user

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Try to find the user in the database
    let dbUser = await prisma.user.findUnique({
      where: { auth0Id: user.sub },
    })

    // If the user doesn't exist, create them
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          auth0Id: user.sub,
          email: user.email,
          name: user.name,
          role: 'STUDENT', // Default role
          kudosPoints: 0,
        },
      })
    }

    return NextResponse.json({ user: dbUser })
  } catch (error) {
    console.error('Error initializing user:', error)
    return NextResponse.json({ error: 'Failed to initialize user' }, { status: 500 })
  }
}

