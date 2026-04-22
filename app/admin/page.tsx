import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { Card } from "@/components/ui/card"
import { getAdminSections } from "@/src/lib/content/site-content"
import { isSupabaseConfigured } from "@/src/lib/supabase/config"
import { createClient } from "@/src/lib/supabase/server"

export default async function AdminPage() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="min-h-screen bg-background px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <Card className="p-8">
            <h1 className="text-3xl font-bold text-foreground">Supabase não configurado</h1>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Defina `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` para habilitar autenticação e
              edição real do conteúdo pelo painel administrativo.
            </p>
          </Card>
        </div>
      </main>
    )
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const sections = await getAdminSections()

  return <AdminDashboard initialSections={sections} userEmail={user.email ?? "sem e-mail"} canSave />
}
