"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { AdminSectionRecord, SectionKey } from "@/src/types/content"

type AdminSidebarProps = {
  sections: AdminSectionRecord[]
  selectedKey: SectionKey
  onSelect: (key: SectionKey) => void
}

export function AdminSidebar({ sections, selectedKey, onSelect }: AdminSidebarProps) {
  return (
    <aside className="border-r border-border bg-card/60">
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Conteúdo</p>
        <h2 className="mt-2 text-xl font-bold text-foreground">Painel editorial</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-89px)]">
        <div className="space-y-2 p-3">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => onSelect(section.key)}
              className={cn(
                "w-full rounded-2xl border px-4 py-3 text-left transition-colors",
                selectedKey === section.key
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-transparent bg-transparent text-muted-foreground hover:border-border hover:bg-secondary/60",
              )}
            >
              <p className="font-semibold">{section.label}</p>
              <p className="mt-1 text-xs leading-5">{section.description}</p>
            </button>
          ))}
        </div>
      </ScrollArea>
    </aside>
  )
}
