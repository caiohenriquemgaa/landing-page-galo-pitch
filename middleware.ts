import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { isSupabaseConfigured } from "@/src/lib/supabase/config"
import { updateSession } from "@/src/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.next()
  }

  return updateSession(request)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
