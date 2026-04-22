import { Landmark, PiggyBank, Percent, Wallet } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { FinancialModelSection } from "@/src/types/content"

type FinancialKpiCardsProps = {
  kpis: FinancialModelSection["kpis"]
  formatCurrency: (value: number) => string
}

export function FinancialKpiCards({ kpis, formatCurrency }: FinancialKpiCardsProps) {
  const items = [
    {
      label: "Previsão de arrecadação 2026",
      value: formatCurrency(kpis.projectedRevenue2026),
      description: "Base estimada de receitas operacionais para o primeiro ciclo da nova fase.",
      icon: Landmark,
    },
    {
      label: "Aporte total aprovado 2026",
      value: formatCurrency(kpis.approvedCapital2026),
      description: "Capital planejado para acelerar estrutura, operação esportiva e expansão comercial.",
      icon: PiggyBank,
    },
    {
      label: "Cota de investimento",
      value: `${kpis.investmentSharePercent}%`,
      description: "Participação proposta para investidores que desejam entrar no projeto de forma direta.",
      icon: Percent,
    },
    {
      label: "Valor por cota",
      value: formatCurrency(kpis.investmentShareValue),
      description: "Ticket de entrada pensado para ampliar acesso ao projeto com clareza societária.",
      icon: Wallet,
    },
  ] as const

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon

        return (
          <Card
            key={item.label}
            className="overflow-hidden border-primary/15 bg-gradient-to-br from-card via-card to-primary/5 p-0"
          >
            <div className="flex h-full flex-col justify-between gap-5 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="mt-3 text-2xl font-bold text-foreground md:text-3xl">{item.value}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
