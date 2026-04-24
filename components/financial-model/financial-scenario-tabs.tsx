"use client"

import { BarChart3, Trophy, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { FinancialModelSection } from "@/src/types/content"

type FinancialScenarioTabsProps = {
  scenarios: FinancialModelSection["scenarios"]
  formatCurrency: (value: number) => string
}

const scenarioKeys: Array<keyof FinancialModelSection["scenarios"]> = ["conservative", "moderate", "aggressive"]

export function FinancialScenarioTabs({
  scenarios,
  formatCurrency,
}: FinancialScenarioTabsProps) {
  return (
    <Card className="border-border/80 bg-card p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">Cenários</p>
          <h3 className="mt-2 text-2xl font-bold text-foreground">Possíveis trajetórias de evolução</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            A estrutura abaixo foi desenhada para fácil atualização futura e traduz três leituras estratégicas para o
            investidor acompanhar o potencial de crescimento.
          </p>
        </div>
      </div>

      <Tabs defaultValue="moderate" className="mt-8 gap-6">
        <TabsList className="grid h-auto w-full grid-cols-1 gap-2 rounded-2xl bg-secondary p-2 md:grid-cols-3">
          {scenarioKeys.map((key) => (
            <TabsTrigger
              key={key}
              value={key}
              className="rounded-xl px-4 py-3 text-sm data-[state=active]:bg-background"
            >
              {scenarios[key].label}
            </TabsTrigger>
          ))}
        </TabsList>

        {scenarioKeys.map((key) => {
          const scenario = scenarios[key]

          return (
            <TabsContent key={key} value={key}>
              <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-3xl border border-primary/15 bg-primary/5 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">{scenario.label}</p>
                  <p className="mt-4 text-base leading-7 text-foreground/90">{scenario.summary}</p>
                  <div className="mt-6 space-y-3">
                    {scenario.highlights.map((highlight) => (
                      <div key={highlight} className="rounded-2xl border border-primary/15 bg-background/70 p-4">
                        <p className="text-sm text-muted-foreground">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <div className="min-w-0 rounded-3xl border border-border/80 bg-secondary/40 p-6">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <p className="mt-4 text-sm text-muted-foreground">Receita anual</p>
                    <p className="mt-2 break-words text-[clamp(1.9rem,3vw,3rem)] font-bold leading-tight text-foreground">
                      {formatCurrency(scenario.annualRevenue)}
                    </p>
                  </div>
                  <div className="min-w-0 rounded-3xl border border-border/80 bg-secondary/40 p-6">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <p className="mt-4 text-sm text-muted-foreground">Valorização do projeto</p>
                    <p className="mt-2 break-words text-[clamp(1.9rem,3vw,3rem)] font-bold leading-tight text-foreground">
                      {formatCurrency(scenario.projectValuation)}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-border/80 bg-secondary/40 p-6 md:col-span-2 xl:col-span-3">
                    <Trophy className="h-5 w-5 text-primary" />
                    <p className="mt-4 text-sm text-muted-foreground">Potencial de expansão esportiva</p>
                    <p className="mt-2 text-base leading-7 text-foreground/90">{scenario.sportsExpansion}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          )
        })}
      </Tabs>
    </Card>
  )
}
