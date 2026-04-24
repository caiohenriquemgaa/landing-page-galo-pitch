"use client"

import { useState, useTransition, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Loader2, LockKeyhole } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getSupabaseConfigError } from "@/src/lib/supabase/config"
import { createClient } from "@/src/lib/supabase/client"

export function AdminLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage(null)

    startTransition(async () => {
      try {
        const configError = getSupabaseConfigError()
        if (configError) {
          setErrorMessage(configError)
          return
        }

        const supabase = createClient()
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          const readableMessage =
            error.message === "Invalid path specified in request URL"
              ? "Configuração do Supabase inválida no deploy. Use NEXT_PUBLIC_SUPABASE_URL sem /rest/v1 e faça novo deploy."
              : error.message === "Invalid API key"
                ? "Chave pública do Supabase inválida no deploy. Copie novamente a anon public key do mesmo projeto no Supabase, atualize NEXT_PUBLIC_SUPABASE_ANON_KEY na Vercel em Production e gere um novo deploy."
                : error.message

          setErrorMessage(readableMessage)
          return
        }

        router.push("/admin")
        router.refresh()
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Erro inesperado ao acessar o Supabase.")
      }
    })
  }

  return (
    <Card className="w-full max-w-md p-8">
      <div className="mb-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <LockKeyhole className="h-7 w-7 text-primary" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-foreground">Acesso administrativo</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Entre com seu usuário do Supabase Auth para editar o conteúdo institucional da landing.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            E-mail
          </label>
          <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Senha
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        {errorMessage ? (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-foreground">
            {errorMessage}
          </div>
        ) : null}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Entrar
        </Button>
      </form>
    </Card>
  )
}
