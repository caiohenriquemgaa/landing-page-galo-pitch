import { redirect } from "next/navigation"
import { AdminLoginForm } from "@/components/admin/admin-login-form"
import { isSupabaseConfigured } from "@/src/lib/supabase/config"
import { createClient } from "@/src/lib/supabase/server"

export default async function AdminLoginPage() {
  if (!isSupabaseConfigured()) {
    redirect("/admin")
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/admin")
  }

  return (
    <main className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:grid lg:grid-cols-[0.95fr_0.65fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Painel administrativo</p>
          <h1 className="mt-4 text-4xl font-bold text-foreground">Edite a narrativa do investidor sem tocar no código</h1>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            O conteúdo da landing pública e da versão para impressão passa a ser centralizado no Supabase. A partir
            daqui você altera títulos, textos, métricas, listas e números do modelo financeiro pelo painel.
          </p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <AdminLoginForm />
        </div>
      </div>
    </main>
  )
}
