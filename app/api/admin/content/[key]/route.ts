import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import { sectionExists, updateSection } from "@/src/lib/content/site-content"
import { isSupabaseConfigured } from "@/src/lib/supabase/config"
import { createClient } from "@/src/lib/supabase/server"
import type { JsonValue, SectionKey } from "@/src/types/content"

type RouteContext = {
  params: Promise<{
    key: string
  }>
}

export async function PUT(request: Request, { params }: RouteContext) {
  const { key } = await params

  if (!sectionExists(key)) {
    return NextResponse.json({ error: "Seção inválida." }, { status: 400 })
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase não configurado." }, { status: 503 })
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 })
  }

  const body = (await request.json()) as {
    valueJson: JsonValue
    isPublished: boolean
  }

  const data = await updateSection(key as SectionKey, body.valueJson, body.isPublished)

  revalidatePath("/")
  revalidatePath("/print")
  revalidatePath("/admin")

  return NextResponse.json({
    key,
    valueJson: body.valueJson,
    isPublished: body.isPublished,
    updatedAt: data.updated_at,
    createdAt: data.created_at,
  })
}
