import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { getSession } from '@auth0/nextjs-auth0/edge'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const session = await getSession(req)
  const user = session?.user

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('user_roles')
    .select('email, is_approved, date_assigned')
    .order('date_assigned', { ascending: false })

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }

  return NextResponse.json({ users: data })
}
