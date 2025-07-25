// src/app/api/auth/get-role/route.js
import { getSession } from '@auth0/nextjs-auth0/edge'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const runtime = 'nodejs' // This route runs in the Node.js environment

export async function GET(req) {
  const session = await getSession(req)
  const user = session?.user

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { auth0Id: user.sub },
      select: { role: true },
    })

    if (!dbUser) {
      // This can happen if the user is new and hasn't been initialized yet.
      // The middleware will let them pass, and the init-user route will create them.
      return NextResponse.json({ role: null })
    }

    return NextResponse.json({ role: dbUser.role })
  } catch (error) {
    console.error('Failed to get user role:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
