// app/api/notes/upload/route.ts
import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import prisma from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const title = formData.get("title")?.toString() || ""
    const subject = formData.get("subject")?.toString() || ""
    const subjectCode = formData.get("subjectCode")?.toString() || ""
    const professor = formData.get("professor")?.toString() || ""
    const semester = formData.get("semester")?.toString() || ""
    const userId = formData.get("userId")?.toString() || ""

    const ext = file.name.split(".").pop()
    const filePath = `${userId}/${Date.now()}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from("notes")
      .upload(filePath, file, { upsert: false })

    if (uploadError) {
      console.error("Supabase upload error:", uploadError.message)
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    const { data: publicUrlData } = supabase.storage.from("notes").getPublicUrl(filePath)

    const newNote = await prisma.note.create({
      data: {
        title,
        subject,
        subjectCode,
        professor,
        semester,
        document: publicUrlData.publicUrl,
        uploadedById: userId,
      },
    })

    return NextResponse.json({ note: newNote }, { status: 200 })
  } catch (err: any) {
    console.error("Unexpected error in upload route:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

