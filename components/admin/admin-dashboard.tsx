"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { LogOut, Printer } from "lucide-react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SectionEditor } from "@/components/admin/section-editor"
import { Button } from "@/components/ui/button"
import type { AdminSectionRecord, SectionKey } from "@/src/types/content"

type AdminDashboardProps = {
  initialSections: AdminSectionRecord[]
  userEmail: string
  canSave: boolean
}

export function AdminDashboard({ initialSections, userEmail, canSave }: AdminDashboardProps) {
  const [sections, setSections] = useState(initialSections)
  const [selectedKey, setSelectedKey] = useState<SectionKey>(initialSections[0]?.key ?? "hero")

  const selectedSection = useMemo(
    () => sections.find((section) => section.key === selectedKey) ?? sections[0],
    [sections, selectedKey],
  )

  function handleSaved(updatedSection: AdminSectionRecord) {
    setSections((current) =>
      current.map((section) => (section.key === updatedSection.key ? updatedSection : section)),
    )
  }

  if (!selectedSection) {
    return null
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[320px_1fr]">
      <AdminSidebar sections={sections} selectedKey={selectedKey} onSelect={setSelectedKey} />

      <main className="bg-background">
        <div className="border-b border-border px-6 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Admin Galo Maringá</p>
              <p className="mt-1 text-sm text-muted-foreground">Sessão autenticada como {userEmail}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild variant="outline">
                <Link href="/print">
                  <Printer className="mr-2 h-4 w-4" />
                  Ver /print
                </Link>
              </Button>
              <form action="/auth/signout" method="post">
                <Button type="submit" variant="outline">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <SectionEditor section={selectedSection} onSaved={handleSaved} canSave={canSave} />
        </div>
      </main>
    </div>
  )
}
