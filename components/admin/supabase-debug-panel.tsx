"use client"

import { AlertTriangle, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { getSupabaseConfigError, getSupabasePublishableKey, getSupabaseUrl } from "@/src/lib/supabase/config"

type JwtPayload = {
  iss?: string
  ref?: string
  role?: string
  iat?: number
  exp?: number
}

function decodeJwtPayload(token: string): JwtPayload | null {
  const payload = token.split(".")[1]
  if (!payload) return null

  try {
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/")
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`)
        .join(""),
    )

    return JSON.parse(json) as JwtPayload
  } catch {
    return null
  }
}

function getProjectRefFromUrl(value: string) {
  try {
    return new URL(value).hostname.split(".")[0]
  } catch {
    return null
  }
}

function formatUnixDate(value: number | undefined) {
  if (!value) return "Nao informado"
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value * 1000))
}

export function SupabaseDebugPanel() {
  const configError = getSupabaseConfigError()
  const url = configError ? null : getSupabaseUrl()
  const key = configError ? null : getSupabasePublishableKey()
  const payload = key ? decodeJwtPayload(key) : null
  const projectRefFromUrl = url ? getProjectRefFromUrl(url) : null
  const keyMatchesProject = Boolean(projectRefFromUrl && payload?.ref === projectRefFromUrl)
  const keyLooksLikeAnon = payload?.role === "anon"

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Diagnostico Supabase</p>
        <h1 className="mt-4 text-3xl font-bold">Configuracao publica usada no navegador</h1>
        <p className="mt-3 text-muted-foreground">
          Esta pagina nao mostra a chave completa. Ela apenas decodifica dados publicos da chave para confirmar se o
          deploy esta apontando para o mesmo projeto Supabase.
        </p>

        <Card className="mt-8 space-y-4 p-6">
          <DebugRow label="Erro de configuracao" value={configError ?? "Nenhum"} />
          <DebugRow label="Supabase URL" value={url ?? "Nao configurada"} />
          <DebugRow label="Projeto esperado pela URL" value={projectRefFromUrl ?? "Nao identificado"} />
          <DebugRow label="Tamanho da chave publica" value={key ? `${key.length} caracteres` : "Nao configurada"} />
          <DebugRow label="Issuer da chave" value={payload?.iss ?? "Nao identificado"} />
          <DebugRow label="Ref dentro da chave" value={payload?.ref ?? "Nao identificado"} />
          <DebugRow label="Role dentro da chave" value={payload?.role ?? "Nao identificado"} />
          <DebugRow label="Emitida em" value={formatUnixDate(payload?.iat)} />
          <DebugRow label="Expira em" value={formatUnixDate(payload?.exp)} />
        </Card>

        <Card className="mt-6 space-y-4 p-6">
          <StatusLine
            ok={keyMatchesProject}
            text={
              keyMatchesProject
                ? "A chave pertence ao mesmo projeto da URL."
                : "A chave nao pertence ao mesmo projeto da URL ou nao pode ser decodificada."
            }
          />
          <StatusLine
            ok={keyLooksLikeAnon}
            text={
              keyLooksLikeAnon
                ? "A chave tem role anon, correta para NEXT_PUBLIC_SUPABASE_ANON_KEY."
                : "A chave nao parece ser anon. Copie a anon public key do Supabase."
            }
          />
        </Card>
      </div>
    </main>
  )
}

function DebugRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 border-b border-border pb-3 last:border-b-0 last:pb-0 sm:grid-cols-[220px_1fr]">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="break-all text-sm font-medium">{value}</span>
    </div>
  )
}

function StatusLine({ ok, text }: { ok: boolean; text: string }) {
  const Icon = ok ? CheckCircle2 : AlertTriangle

  return (
    <div className="flex gap-3 rounded-2xl border border-border bg-card p-4">
      <Icon className={ok ? "mt-0.5 h-5 w-5 text-emerald-500" : "mt-0.5 h-5 w-5 text-destructive"} />
      <p className="text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  )
}
