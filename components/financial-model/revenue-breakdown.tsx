import { Cell, Pie, PieChart } from "recharts"
import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
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
  const chartData = revenueSources.map((source, index) => ({
    ...source,
    estimatedValue: (projectedRevenue * source.value) / 100,
    fill: `var(--chart-${index + 1})`,
  }))

  const chartConfig = Object.fromEntries(
    revenueSources.map((source, index) => [
      source.name,
      {
        label: source.name,
        color: `hsl(var(--chart-${index + 1}))`,
      },
    ]),
  )

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
          <p className="mt-2 break-words text-[clamp(1.9rem,3vw,3rem)] font-bold leading-tight text-foreground">
            {formatCurrency(projectedRevenue)}
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            A distribuição pode evoluir conforme o ganho de tração esportiva e comercial.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-3xl border border-border/80 bg-secondary/30 p-4">
          <ChartContainer
            className="mx-auto aspect-square h-[300px] max-w-[300px]"
            config={chartConfig}
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value, name, item) => {
                      const payload = item.payload as (typeof chartData)[number]
                      return (
                        <div className="flex min-w-[12rem] items-center justify-between gap-4">
                          <div className="space-y-1">
                            <p className="text-foreground font-medium">{name}</p>
                            <p className="text-muted-foreground text-xs">{payload.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-foreground font-semibold">{value}%</p>
                            <p className="text-primary text-xs">{formatCurrency(payload.estimatedValue)}</p>
                          </div>
                        </div>
                      )
                    }}
                  />
                }
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={58}
                outerRadius={92}
                paddingAngle={3}
                strokeWidth={0}
              >
                {chartData.map((entry, index) => (
                  <Cell key={entry.name} fill={`hsl(var(--chart-${index + 1}))`} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>

        <div className="space-y-3">
          {revenueSources.map((source, index) => {
            const estimatedValue = (projectedRevenue * source.value) / 100

            return (
              <div key={source.name} className="rounded-2xl border border-border/80 bg-secondary/50 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className={`h-3 w-3 rounded-full ${sourceColors[index]}`} />
                      <p className="text-sm font-semibold text-foreground">{source.name}</p>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{source.description}</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-2xl font-bold text-foreground">{source.value}%</p>
                    <p className="text-sm text-primary">{formatCurrency(estimatedValue)}</p>
                  </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-2 rounded-full ${sourceColors[index]}`}
                    style={{ width: `${source.value}%` }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
