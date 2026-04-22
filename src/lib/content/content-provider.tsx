"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { ResolvedSiteContent } from "@/src/types/content"

const SiteContentContext = createContext<ResolvedSiteContent | null>(null)

export function SiteContentProvider({
  children,
  content,
}: {
  children: ReactNode
  content: ResolvedSiteContent
}) {
  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>
}

export function useSiteContent() {
  const context = useContext(SiteContentContext)

  if (!context) {
    throw new Error("useSiteContent deve ser usado dentro de SiteContentProvider")
  }

  return context
}
