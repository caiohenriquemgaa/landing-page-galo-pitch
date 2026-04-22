import { ArrowRight, BanknoteArrowDown, CircleDollarSign, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { FinancialModelSection } from "@/src/types/content"

type CapitalStructureProps = {
  kpis: FinancialModelSection["kpis"]
  capitalStructure: FinancialModelSection["capitalStructure"]
  formatCurrency: (value: number) => string
}

export function CapitalStructure({
  kpis,
  capitalStructure,
  formatCurrency,
}: CapitalStructureProps) {
  const totalOperationalCapacity = kpis.projectedRevenue2026 + kpis.approvedCapital2026
  const growthRunway = kpis.approvedCapital2026 - kpis.projectedRevenue2026

  const highlights = [
    {
      label: "Receita projetada",
      value: formatCurrency(kpis.projectedRevenue2026),
      icon: CircleDollarSign,
      description: "Monetização operacional prevista para 2026.",
    },
    {
      label: "Capital necessário",
      value: formatCurrency(kpis.approvedCapital2026),
      icon: BanknoteArrowDown,
      description: "Aporte aprovado para acelerar a estrutura do projeto.",
    },
    {
      label: "Capacidade total de execução",
      value: formatCurrency(totalOperationalCapacity),
      icon: TrendingUp,
      description: "Escala potencial combinando operação e capital de crescimento.",
    },
  ] as const

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <Card className="border-primary/15 bg-gradient-to-br from-card to-primary/5 p-8">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">Necessidade de capital</p>
        <h3 className="mt-3 text-2xl font-bold text-foreground">{capitalStructure.title}</h3>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">{capitalStructure.description}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon

            return (
              <div key={item.label} className="rounded-2xl border border-border/80 bg-card/80 p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <p className="mt-4 text-2xl font-bold text-foreground">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-8 rounded-3xl border border-primary/20 bg-background/60 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Espaço imediato para crescimento</p>
              <p className="mt-2 text-3xl font-bold text-primary">{formatCurrency(growthRunway)}</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <ArrowRight className="h-4 w-4 text-primary" />
              Receita atual + capital de aceleração + novos ciclos de monetização
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-foreground/85">{capitalStructure.longTermValueDriver}</p>
        </div>
      </Card>

      <Card className="border-border/80 bg-card p-8">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">Leitura executiva</p>
        <div className="mt-5 space-y-4">
          {capitalStructure.notes.map((note) => (
            <div key={note} className="rounded-2xl border border-border/80 bg-secondary/40 p-5">
              <p className="text-sm leading-7 text-muted-foreground">{note}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
