import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { getSession } from '@auth0/nextjs-auth0/edge'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  // 👇 force evaluation before getSession() uses it
  await cookies()

  const session = await getSession(req)
  const user = session?.user

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const auth0_id = user.sub
  const email = user.email

  const { data: existing, error: checkErr } = await supabaseAdmin
    .from('user_roles')
    .select('auth0_id')
    .eq('auth0_id', auth0_id)
    .single()

  if (!existing) {
    const { error: insertErr } = await supabaseAdmin
      .from('user_roles')
      .insert([{
        auth0_id,
        email,
        role: 'student',
        is_approved: false
      }])

    if (insertErr) {
      console.error('[Insert Error]', insertErr)
      return NextResponse.json({ error: 'Insert failed' }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
}
