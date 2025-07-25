import { NextResponse } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0/edge'
import prisma from '@/lib/prisma'
import { supabaseAdmin } from '@/lib/supabase-admin'

// GET /api/notes/[id] - Fetches a single note by its ID
export async function GET(req, { params }) {
  const session = await getSession(req)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({ where: { auth0Id: session.user.sub } })
  if (!dbUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  try {
    const { id } = params
    const note = await prisma.note.findUnique({
      where: { id },
      include: {
        _count: {
          select: { reviews: true },
        },
      },
    })

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    // SECURITY CHECK: User must be the uploader or a privileged user
    const isOwner = note.uploaderId === dbUser.id
    const isPrivileged = ['TUTOR', 'ADMIN', 'PROFESSOR'].includes(dbUser.role)
    if (!isOwner && !isPrivileged) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Manually calculate average rating
    const aggregate = await prisma.review.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        noteId: id,
      },
    })
    note.averageRating = aggregate._avg.rating || 0

    return NextResponse.json({ note })
  } catch (error) {
    console.error(`Failed to fetch note:`, error)
    return NextResponse.json({ error: 'Failed to fetch note' }, { status: 500 })
  }
}

// PUT /api/notes/[id] - Updates a note
export async function PUT(req, { params }) {
  const session = await getSession(req)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({ where: { auth0Id: session.user.sub } })
  if (!dbUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  try {
    const { id: noteId } = params
    const note = await prisma.note.findUnique({ where: { id: noteId } })

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    // Security Check: Ensure the user owns the note
    if (note.uploaderId !== dbUser.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { title, description, courseId, semesterId } = await req.json()

    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: {
        title,
        description,
        courseId,
        semesterId,
      },
    })

    return NextResponse.json({ note: updatedNote })
  } catch (error) {
    console.error('Failed to update note:', error)
    return NextResponse.json({ error: 'Failed to update note' }, { status: 500 })
  }
}

// DELETE /api/notes/[id] - Deletes a note
export async function DELETE(req, { params }) {
  const session = await getSession(req)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({ where: { auth0Id: session.user.sub } })
  if (!dbUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  try {
    const { id: noteId } = params
    const note = await prisma.note.findUnique({ where: { id: noteId } })

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    // Security Check: Ensure the user owns the note
    if (note.uploaderId !== dbUser.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Start a transaction to delete the note and its related data
    await prisma.$transaction([
      prisma.review.deleteMany({ where: { noteId } }),
      prisma.raffleEntry.deleteMany({ where: { noteId } }),
      prisma.note.delete({ where: { id: noteId } }),
    ])

    // Delete the associated file from Supabase Storage
    await supabaseAdmin.storage.from('notes').remove([note.filePath])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete note:', error)
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 })
  }
}
