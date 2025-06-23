import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Body: { raffle_id: "uuid" }
 */
export async function DELETE(req) {
  try {
    const { raffle_id } = await req.json()

    if (!raffle_id) {
      return NextResponse.json({ error: 'Missing raffle_id' }, { status: 400 })
    }

    /* ---- 1) remove entries (if you track them) ---- */
    const { error: entriesErr } = await supabaseAdmin
      .from('raffle_entries')
      .delete()
      .eq('raffle_id', raffle_id)

    if (entriesErr) {
      return NextResponse.json(
        { error: 'Failed to delete raffle entries: ' + entriesErr.message },
        { status: 500 },
      )
    }

    /* ---- 2) remove prizes ---- */
    const { error: prizeErr } = await supabaseAdmin
      .from('raffle_prizes')
      .delete()
      .eq('raffle_id', raffle_id)

    if (prizeErr) {
      return NextResponse.json(
        { error: 'Failed to delete raffle prizes: ' + prizeErr.message },
        { status: 500 },
      )
    }

    /* ---- 3) remove the raffle itself ---- */
    const { error: raffleErr } = await supabaseAdmin
      .from('raffles')
      .delete()
      .eq('id', raffle_id)

    if (raffleErr) {
      return NextResponse.json(
        { error: 'Failed to delete raffle: ' + raffleErr.message },
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
