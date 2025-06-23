import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Body:
 * {
 *   id: "raffle-uuid",          // REQUIRED
 *   r_title,
 *   r_description,
 *   r_start,                   // ISO string
 *   r_end,                     // ISO string
 *   prizes: [                  // at least 1
 *     { id?, name, description, quantity?, image_url?, size?, color?, metadata? }
 *   ]
 * }
 */
export async function POST(req) {
  try {
    const body = await req.json()
    const { id, r_title, r_description, r_start, r_end, prizes } = body

    if (!id || !r_title || !r_start || !r_end || !Array.isArray(prizes) || prizes.length === 0) {
      return NextResponse.json({ error: 'Missing raffle id or details' }, { status: 400 })
    }


/* ---------- 1. update raffle main row ---------- */
const { error: raffleErr } = await supabaseAdmin
  .from('raffles')
  .update({
    title:       r_title,
    description: r_description,
    prize:       prizes[0]?.name ?? null, // keep main prize in sync
    start_time:  r_start,
    end_time:    r_end,
    /* no updated_at here — trigger fills it in */
  })
  .eq('id', id);

if (raffleErr) {
  return NextResponse.json(
    { error: 'Failed to update raffle: ' + raffleErr.message },
    { status: 500 },
  );
}



    /* ---------- 2. replace prizes (simplest) ---------- */
    // delete existing
    const { error: delErr } = await supabaseAdmin
      .from('raffle_prizes')
      .delete()
      .eq('raffle_id', id)

    if (delErr) {
      return NextResponse.json(
        { error: 'Failed to clear old prizes: ' + delErr.message },
        { status: 500 },
      )
    }

    // insert new set
    const formatted = prizes.map((p) => ({
      id:          crypto.randomUUID(),   
      raffle_id:   id,
      name:        p.name,
      description: p.description || '',
      quantity:    p.quantity || 1,
      image_url:   p.image_url || null,
      size:        p.size || null,
      color:       p.color || null,
      metadata:    p.metadata || {},
      created_at:  new Date().toISOString(),
    }))

    const { error: prizeErr } = await supabaseAdmin
      .from('raffle_prizes')
      .insert(formatted)

    if (prizeErr) {
      return NextResponse.json(
        { error: 'Failed to insert prizes: ' + prizeErr.message },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { error: 'Server error: ' + err.message },
      { status: 500 },
    )
  }
}
