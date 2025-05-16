import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { getSession } from '@auth0/nextjs-auth0/edge'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const session = await getSession(req)
  const user = session?.user

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const email = body.email

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const normalizedEmail = email.trim().toLowerCase()

  // Check if the user exists (case-insensitive)
  const { data: existing, error: checkErr } = await supabaseAdmin
    .from('user_roles')
    .select('id')
    .ilike('email', normalizedEmail)
    .single()

  if (existing) {
    // Update approval status
    const { error: updateErr } = await supabaseAdmin
      .from('user_roles')
      .update({ is_approved: true })
      .ilike('email', normalizedEmail)

    if (updateErr) {
      console.error('Update error:', updateErr)
      return NextResponse.json({ error: 'Update failed' }, { status: 500 })
    }

    return NextResponse.json({ status: 'updated' })
  } else {
    // Insert new approved user
    const { error: insertErr } = await supabaseAdmin
      .from('user_roles')
      .insert([
        {
          email: normalizedEmail,
          role: 'student',
          is_approved: true,
        },
      ])

    if (insertErr) {
      console.error('Insert error:', insertErr)
      return NextResponse.json({ error: 'Insert failed' }, { status: 500 })
    }

    return NextResponse.json({ status: 'inserted' })
  }
}
