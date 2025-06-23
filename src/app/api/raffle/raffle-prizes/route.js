import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function POST(req) {
  const supabase = createClient()
  const body = await req.json()

  const { name, description, raffle_id } = body

  const { data, error } = await supabase
    .from("raffle_prizes")
    .insert([{ name, description, raffle_id }])
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ prize: data[0] })
}

export async function GET(req) {
  const supabase = createClient()
  const { searchParams } = new URL(req.url)
  const raffle_id = searchParams.get("raffle_id")

  const { data, error } = await supabase
    .from("raffle_prizes")
    .select("*")
    .eq("raffle_id", raffle_id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ prizes: data })
}

export async function DELETE(req) {
  const supabase = createClient()
  const body = await req.json()

  const { id } = body

  const { error } = await supabase
    .from("raffle_prizes")
    .delete()
    .eq("id", id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
