import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    const body = await req.json()
    const { r_title, r_description, r_prize, r_start, r_end, prizes } = body

    if (!r_title || !r_start || !r_end || !Array.isArray(prizes) || prizes.length === 0) {
      return NextResponse.json({ error: 'Missing raffle details or prizes' }, { status: 400 })
    }

    const raffle_id = crypto.randomUUID()

    // STEP 1: Create the raffle
    const { error: raffleError } = await supabaseAdmin
      .from('raffles')
      .insert([
        {
          id: raffle_id,
          title: r_title,
          description: r_description,
          prize: r_prize,
          start_time: r_start,
          end_time: r_end,
          created_at: new Date().toISOString(),
        },
      ])

    if (raffleError) {
      return NextResponse.json({ error: 'Failed to create raffle: ' + raffleError.message }, { status: 500 })
    }

    // STEP 2: Create prizes
    const formattedPrizes = prizes.map((p) => ({
      id: crypto.randomUUID(),
      name: p.name,
      description: p.description,
      quantity: p.quantity || 1,
      image_url: p.image_url || null,
      size: p.size || null,
      color: p.color || null,
      metadata: p.metadata || {},
      raffle_id,
      created_at: new Date().toISOString(),
    }))

    const { error: prizeError } = await supabaseAdmin
      .from('raffle_prizes')
      .insert(formattedPrizes)

    if (prizeError) {
      return NextResponse.json({ error: 'Failed to add prizes: ' + prizeError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, raffle_id })
  } catch (err) {
    return NextResponse.json({ error: 'Server error: ' + err.message }, { status: 500 })
  }
}
