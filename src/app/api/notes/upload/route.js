import { NextResponse } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0/edge'
import { randomUUID } from 'crypto'
import prisma from '@/lib/prisma'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function POST(req) {
  const session = await getSession(req) // Correctly pass the request object
  const user = session?.user

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({
    where: { auth0Id: user.sub },
    select: { id: true },
  })

  if (!dbUser) {
    return NextResponse.json({ error: 'User not found in database' }, { status: 404 })
  }

  const formData = await req.formData()
  const title = formData.get('title')
  const description = formData.get('description')
  const courseId = formData.get('courseId')
  const semesterId = formData.get('semesterId')
  const file = formData.get('file')

  if (!file || !title || !courseId || !semesterId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // 1. Upload file to Supabase Storage
  const fileExt = file.name.split('.').pop()
  const filePath = `${dbUser.id}/${randomUUID()}.${fileExt}`

  const { error: uploadError } = await supabaseAdmin.storage
    .from('notes')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    })

  if (uploadError) {
    console.error('[Upload Error]', uploadError)
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 })
  }

  // 2. Get the public URL of the uploaded file
  const { data: publicUrlData } = supabaseAdmin.storage
    .from('notes')
    .getPublicUrl(filePath)

  const fileUrl = publicUrlData.publicUrl

  // 3. Create the Note record and award Kudos points in a transaction
  try {
    const [newNote, updatedUser] = await prisma.$transaction([
      prisma.note.create({
        data: {
          title,
          description,
          filePath,
          fileType: fileExt,
          fileUrl, // Save the public URL
          uploaderId: dbUser.id,
          courseId: courseId,
          semesterId: semesterId,
        },
      }),
      prisma.user.update({
        where: { id: dbUser.id },
        data: {
          kudosPoints: {
            increment: 10,
          },
        },
      }),
    ])

    // Raffle logic can be added here later if needed

    return NextResponse.json({ note: newNote }, { status: 201 })
  } catch (error) {
    console.error('[DB Insert Error]', error)
    // Cleanup the uploaded file if the DB insert fails
    await supabaseAdmin.storage.from('notes').remove([filePath])
    console.log(`Cleaned up failed upload: ${filePath}`)
    
    return NextResponse.json({ error: 'Database insert failed' }, { status: 500 })
  }
}
