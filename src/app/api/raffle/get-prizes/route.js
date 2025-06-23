// /api/raffle/get-prizes/route.js
import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const now = new Date().toISOString()

    const { data: raffles, error: raffleErr } = await supabaseAdmin
      .from('raffles')
      .select('id, title, start_time, end_time')
      .lte('start_time', now)
      .gte('end_time', now)
      .order('start_time', { ascending: true })

    if (raffleErr) {
      return NextResponse.json({ error: raffleErr.message }, { status: 500 })
    }

    const raffleIds = raffles.map(r => r.id)
    if (!raffleIds.length) return NextResponse.json({ raffles: [] })

    const { data: prizes, error: prizeErr } = await supabaseAdmin
      .from('raffle_prizes')
      .select('id, raffle_id, name, description, image_url, size, color, metadata')
      .in('raffle_id', raffleIds)

    if (prizeErr) {
      return NextResponse.json({ error: prizeErr.message }, { status: 500 })
    }

    const grouped = raffles.map(r => ({
      ...r,
      prizes: prizes.filter(p => p.raffle_id === r.id),
    }))

    return NextResponse.json({ raffles: grouped })
  } catch (err) {
    console.error('🔥 get-prizes error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
