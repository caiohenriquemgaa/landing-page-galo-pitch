import { Card } from "@/components/ui/card"
import type { FinancialModelSection } from "@/src/types/content"

type RevenueBreakdownProps = {
  projectedRevenue: number
  revenueSources: FinancialModelSection["revenueSources"]
  formatCurrency: (value: number) => string
}

const sourceColors = [
  "bg-primary",
  "bg-primary/85",
  "bg-primary/70",
  "bg-primary/55",
  "bg-primary/35",
] as const

export function RevenueBreakdown({
  projectedRevenue,
  revenueSources,
  formatCurrency,
}: RevenueBreakdownProps) {
  return (
    <Card className="border-border/80 bg-card/90 p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">Fontes de receita</p>
          <h3 className="mt-3 text-2xl font-bold text-foreground">Composição de monetização do projeto</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            A operação combina receitas recorrentes com upside ligado à valorização esportiva. O desenho abaixo usa a
            previsão de arrecadação de 2026 como referência para comunicar a lógica econômica do clube.
          </p>
        </div>
        <div className="min-w-[220px] rounded-3xl border border-primary/15 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">Base de referência 2026</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{formatCurrency(projectedRevenue)}</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            A distribuição pode evoluir conforme o ganho de tração esportiva e comercial.
          </p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-full bg-muted">
        <div className="flex h-4 w-full">
          {revenueSources.map((source, index) => (
            <div
              key={source.name}
              className={sourceColors[index]}
              style={{ width: `${source.value}%` }}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {revenueSources.map((source, index) => {
          const estimatedValue = (projectedRevenue * source.value) / 100

          return (
            <div
              key={source.name}
              className="rounded-2xl border border-border/80 bg-secondary/50 p-5"
            >
              <div className="flex items-center gap-3">
                <span className={`h-3 w-3 rounded-full ${sourceColors[index]}`} />
                <p className="text-sm font-semibold text-foreground">{source.name}</p>
              </div>
              <p className="mt-4 text-2xl font-bold text-foreground">{source.value}%</p>
              <p className="mt-1 text-sm text-primary">{formatCurrency(estimatedValue)}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{source.description}</p>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
