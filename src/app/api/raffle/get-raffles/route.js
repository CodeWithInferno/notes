import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Fetch all raffles
    const { data: raffles, error } = await supabaseAdmin
      .from('raffles')
      .select('id, title, prize, start_time, end_time, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('🎯 Error fetching raffles:', error.message)
      return NextResponse.json({ error: 'Failed to fetch raffles' }, { status: 500 })
    }

    // Now fetch raffle entry counts
    const { data: entries, error: entryErr } = await supabaseAdmin
      .from('raffle_entries')
      .select('raffle_id, id')

    if (entryErr) {
      console.error('⚠️ Error fetching raffle entries:', entryErr.message)
      return NextResponse.json({ error: 'Failed to fetch raffle entries' }, { status: 500 })
    }

    // Map raffle_id -> entry count
    const entryMap = {}
    entries.forEach((entry) => {
      if (!entryMap[entry.raffle_id]) entryMap[entry.raffle_id] = 0
      entryMap[entry.raffle_id]++
    })

    // Inject entry_count into each raffle
    const enrichedRaffles = raffles.map((raffle) => ({
      ...raffle,
      entry_count: entryMap[raffle.id] || 0,
    }))

    return NextResponse.json({ raffles: enrichedRaffles })
  } catch (err) {
    console.error('💥 Unexpected error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}



// // /api/raffle/get-raffles/route.ts
// import { supabaseAdmin } from '@/lib/supabase-admin'
// import { NextResponse } from 'next/server'

// export const dynamic = 'force-dynamic'

// export async function GET() {
//   const { data: raffles, error } = await supabaseAdmin
//     .from('raffles')
//     .select(`
//       *,
//       raffle_prizes (
//         id, name, description, image_url, size, color, metadata
//       ),
//       raffle_entries (
//         id
//       )
//     `)
//     .order('start_time', { ascending: false })

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 })
//   }

//   const formatted = raffles.map(r => ({
//     ...r,
//     entry_count: r.raffle_entries?.length || 0,
//     prizes: r.raffle_prizes || [],
//   }))

//   return NextResponse.json({ raffles: formatted })
// }
