function getSupabaseAnonKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim()
  )
}

function isValidSupabaseUrl(value: string | undefined) {
  if (!value) return false

  try {
    const url = new URL(value)
    return url.protocol === "https:" && url.hostname.endsWith(".supabase.co")
  } catch {
    return false
  }
}

export function getSupabaseConfigError() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return "NEXT_PUBLIC_SUPABASE_URL não está configurada."
  }

  if (!isValidSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL)) {
    return "NEXT_PUBLIC_SUPABASE_URL deve ser uma URL válida do Supabase, como https://seu-projeto.supabase.co."
  }

  if (!getSupabaseAnonKey()) {
    return "NEXT_PUBLIC_SUPABASE_ANON_KEY não está configurada."
  }

  return null
}

export function isSupabaseConfigured() {
  return getSupabaseConfigError() === null
}

export function getSupabaseUrl() {
  const error = getSupabaseConfigError()
  if (error) {
    throw new Error(error)
  }

  return process.env.NEXT_PUBLIC_SUPABASE_URL!
}

export function getSupabasePublishableKey() {
  const error = getSupabaseConfigError()
  if (error) {
    throw new Error(error)
  }

  return getSupabaseAnonKey()!
}
