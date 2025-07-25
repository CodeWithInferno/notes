import { NextResponse } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0/edge'
import prisma from '@/lib/prisma'

// GET /api/raffles/[id]
export async function GET(req, { params }) {
  const { id } = params
  try {
    const raffle = await prisma.raffle.findUnique({
      where: { id },
      include: {
        raffle_prizes: true,
        entries: {
          include: {
            user: {
              select: { name: true, email: true },
            },
          },
        },
      },
    })
    if (!raffle) {
      return NextResponse.json({ error: 'Raffle not found' }, { status: 404 })
    }
    return NextResponse.json(raffle)
  } catch (error) {
    console.error(`Failed to fetch raffle ${id}:`, error)
    return NextResponse.json({ error: 'Failed to fetch raffle' }, { status: 500 })
  }
}

// PUT /api/raffles/[id]
export async function PUT(req, { params }) {
  const session = await getSession(req)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({ where: { auth0Id: session.user.sub } })
  if (dbUser?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const { id } = params
    const body = await req.json()
    const { title, description, startTime, endTime } = body

    const updatedRaffle = await prisma.raffle.update({
      where: { id },
      data: {
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    })
    return NextResponse.json(updatedRaffle)
  } catch (error) {
    console.error(`Failed to update raffle:`, error)
    return NextResponse.json({ error: 'Failed to update raffle' }, { status: 500 })
  }
}

// DELETE /api/raffles/[id]
export async function DELETE(req, { params }) {
  const session = await getSession(req)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({ where: { auth0Id: session.user.sub } })
  if (dbUser?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  try {
    const { id } = params
    // Prisma requires deleting related records first
    await prisma.raffleEntry.deleteMany({ where: { raffleId: id } })
    await prisma.rafflePrize.deleteMany({ where: { raffleId: id } })
    await prisma.raffle.delete({ where: { id } })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Failed to delete raffle:`, error)
    return NextResponse.json({ error: 'Failed to delete raffle' }, { status: 500 })
  }
}
