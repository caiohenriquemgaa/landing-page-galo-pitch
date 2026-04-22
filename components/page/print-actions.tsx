"use client"

import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PrintActions() {
  return (
    <div className="print:hidden sticky top-0 z-20 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[210mm] items-center justify-between gap-4 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">Versão para impressão</p>
          <p className="text-xs text-slate-500">
            Use esta rota para imprimir agora ou automatizar a geração com Playwright/Puppeteer.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="border-slate-300 text-slate-700">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => window.print()}
          >
            <Download className="mr-2 h-4 w-4" />
            Baixar PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
