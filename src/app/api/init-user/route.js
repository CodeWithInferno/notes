import { getSession } from '@auth0/nextjs-auth0/edge'
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getSession() // ← ✅ no req
  const user = session?.user

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Do your Supabase logic here
  const { data, error } = await supabaseAdmin
    .from('user_roles')
    .select('auth0_id, email, role, is_approved')
    .eq('auth0_id', user.sub)

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch user role' }, { status: 500 })
  }

  return NextResponse.json({ user: data?.[0] || null })
}
