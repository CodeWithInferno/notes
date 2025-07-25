import { NextResponse } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0/edge'
import prisma from '@/lib/prisma'

// GET /api/raffles?status=active
export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') // 'active', 'upcoming', 'past'

  const now = new Date()
  let where = {}

  if (status === 'active') {
    where = { startTime: { lte: now }, endTime: { gte: now } }
  } else if (status === 'upcoming') {
    where = { startTime: { gt: now } }
  } else if (status === 'past') {
    where = { endTime: { lt: now } }
  }

  try {
    const raffles = await prisma.raffle.findMany({
      where,
      include: {
        raffle_prizes: true,
        _count: {
          select: { entries: true },
        },
      },
      orderBy: {
        startTime: 'desc',
      },
    })
    return NextResponse.json({ raffles })
  } catch (error) {
    console.error('Failed to fetch raffles:', error)
    return NextResponse.json({ error: 'Failed to fetch raffles' }, { status: 500 })
  }
}

// POST /api/raffles
export async function POST(req) {
  const session = await getSession(req)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({ where: { auth0Id: session.user.sub } })
  if (dbUser?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const body = await req.json()
    const { title, description, startTime, endTime, prizes } = body

    if (!title || !startTime || !endTime || !prizes || prizes.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newRaffle = await prisma.raffle.create({
      data: {
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        raffle_prizes: {
          create: prizes.map((prize) => ({
            name: prize.name,
            description: prize.description,
            quantity: prize.quantity,
            imageUrl: prize.imageUrl,
          })),
        },
      },
      include: {
        raffle_prizes: true,
      },
    })

    return NextResponse.json(newRaffle, { status: 201 })
  } catch (error) {
    console.error('Failed to create raffle:', error)
    return NextResponse.json({ error: 'Failed to create raffle' }, { status: 500 })
  }
}
