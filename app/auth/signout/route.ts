import { revalidatePath } from "next/cache"
import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/src/lib/supabase/server"
import { isSupabaseConfigured } from "@/src/lib/supabase/config"

export async function POST(request: NextRequest) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient()
    await supabase.auth.signOut()
  }

  revalidatePath("/", "layout")

  return NextResponse.redirect(new URL("/admin/login", request.url), {
    status: 302,
  })
}
