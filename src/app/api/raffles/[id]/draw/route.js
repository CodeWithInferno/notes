import { NextResponse } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0/edge'
import prisma from '@/lib/prisma'

// POST /api/raffles/[id]/draw
export async function POST(req, { params }) {
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
    const raffle = await prisma.raffle.findUnique({
      where: { id },
      include: {
        raffle_prizes: true,
        entries: {
          where: { isWinner: false }, // Only consider non-winners
        },
      },
    })

    if (!raffle) {
      return NextResponse.json({ error: 'Raffle not found' }, { status: 404 })
    }

    const prizes = raffle.raffle_prizes
    const entries = raffle.entries
    const winners = []

    if (entries.length === 0) {
      return NextResponse.json({ error: 'No entries to draw from' }, { status: 400 })
    }

    for (const prize of prizes) {
      for (let i = 0; i < prize.quantity; i++) {
        const availableEntries = entries.filter(
          (entry) => !winners.some((winner) => winner.userId === entry.userId),
        )

        if (availableEntries.length === 0) {
          break // No more unique users to draw from
        }

        const winnerIndex = Math.floor(Math.random() * availableEntries.length)
        const winningEntry = availableEntries[winnerIndex]
        
        winners.push(winningEntry)
      }
    }

    // Mark winners in the database
    await prisma.raffleEntry.updateMany({
      where: {
        id: {
          in: winners.map((w) => w.id),
        },
      },
      data: {
        isWinner: true,
      },
    })

    return NextResponse.json({ message: 'Winners drawn successfully', count: winners.length })
  } catch (error) {
    console.error(`Failed to draw winners:`, error)
    return NextResponse.json({ error: 'Failed to draw winners' }, { status: 500 })
  }
}
