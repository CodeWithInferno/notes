import { supabaseAdmin } from '@/lib/supabase-admin'
import { getSession } from '@auth0/nextjs-auth0/edge'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const session = await getSession(req)
  const user = session?.user

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabaseAdmin
    .from('notes')
    .select('*')
    .eq('user_id', user.sub) // match by Auth0 ID

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
  }

  return NextResponse.json({ notes: data })
}
