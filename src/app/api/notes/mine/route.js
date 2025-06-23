import { getSession } from '@auth0/nextjs-auth0/edge'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getSession() // ← ✅ no req
  const user = session?.user

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabaseAdmin
    .from('notes')
    .select('*')
    .eq('user_id', user.sub)

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
  }

  return NextResponse.json({ notes: data })
}
