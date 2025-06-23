import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req) {
  const formData = await req.formData()
  const file = formData.get('file')
  const filename = `${Date.now()}-${file.name}`

  const { data, error } = await supabaseAdmin.storage
    .from('raffle-prizes')
    .upload(filename, file, { cacheControl: '3600', upsert: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const publicUrl = supabaseAdmin.storage
    .from('raffle-prizes')
    .getPublicUrl(filename).data.publicUrl

  return NextResponse.json({ url: publicUrl })
}


