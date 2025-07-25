import { NextResponse } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0/edge'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { randomUUID } from 'crypto'

export const runtime = 'nodejs'

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
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${randomUUID()}.${fileExt}`

    const { error: uploadError } = await supabaseAdmin.storage
      .from('raffle-prizes')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      })

    if (uploadError) {
      throw uploadError
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from('raffle-prizes')
      .getPublicUrl(fileName)

    return NextResponse.json({ imageUrl: publicUrlData.publicUrl })
  } catch (error) {
    console.error('Failed to upload prize image:', error)
    return NextResponse.json({ error: 'Failed to upload prize image' }, { status: 500 })
  }
}
