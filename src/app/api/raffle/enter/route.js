export async function POST(req) {
  const body = await req.json()
  const { raffle_id, note_id, user_email } = body

  if (!raffle_id || !note_id || !user_email)
    return NextResponse.json({ error: "Missing info" }, { status: 400 })

  const { error } = await supabaseAdmin
    .from('raffle_entries')
    .insert({
      id: crypto.randomUUID(),
      raffle_id,
      note_id,
      user_email,
      created_at: new Date().toISOString(),
    })

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
