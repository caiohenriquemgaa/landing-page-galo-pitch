"use client"

import { motion } from "framer-motion"
import { Area, AreaChart, CartesianGrid, Line, XAxis, YAxis } from "recharts"
import { TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useSiteContent } from "@/src/lib/content/content-provider"

function formatMillions(value: number) {
  return `R$ ${value.toFixed(1).replace(".", ",")}M`
}

export function Projecoes() {
  const { projections } = useSiteContent()

  return (
    <section id="projecoes" className="bg-secondary py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-primary">
            {projections.eyebrow}
          </span>
          <h2 className="mb-6 text-balance text-3xl font-bold text-foreground md:text-5xl">{projections.title}</h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">{projections.description}</p>
        </motion.div>

        <div className="mb-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {projections.metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="h-full min-w-0 border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="mt-3 break-words text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-tight text-foreground">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm font-medium text-primary">{metric.change}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="border-border bg-card p-8">
            <div className="mb-8 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">{projections.chartTitle}</h3>
            </div>

            <ChartContainer
              className="h-[340px] w-full"
              config={{
                revenue: {
                  label: "Receita",
                  color: "hsl(var(--chart-1))",
                },
                growth: {
                  label: "Crescimento",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <AreaChart data={projections.items} margin={{ left: 8, right: 8, top: 12, bottom: 0 }}>
                <defs>
                  <linearGradient id="projectionRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.42} />
                    <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="year" tickLine={false} axisLine={false} />
                <YAxis
                  yAxisId="revenue"
                  tickLine={false}
                  axisLine={false}
                  width={72}
                  tickFormatter={(value) => `R$ ${value}M`}
                />
                <YAxis
                  yAxisId="growth"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  width={52}
                  tickFormatter={(value) => `${value}%`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, name, item) => {
                        if (name === "revenue") {
                          return (
                            <div className="flex min-w-[10rem] items-center justify-between gap-4">
                              <span className="text-muted-foreground">Receita</span>
                              <span className="font-semibold text-foreground">
                                {formatMillions(Number(value))}
                              </span>
                            </div>
                          )
                        }

                        return (
                          <div className="flex min-w-[10rem] items-center justify-between gap-4">
                            <span className="text-muted-foreground">Crescimento</span>
                            <span className="font-semibold text-foreground">
                              {item.payload.growth === null ? "Base" : `${value}%`}
                            </span>
                          </div>
                        )
                      }}
                      labelFormatter={(label) => `Ano ${label}`}
                    />
                  }
                />
                <Area
                  yAxisId="revenue"
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={3}
                  fill="url(#projectionRevenue)"
                  activeDot={{ r: 6 }}
                />
                <Line
                  yAxisId="growth"
                  type="monotone"
                  dataKey="growth"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  connectNulls={false}
                />
              </AreaChart>
            </ChartContainer>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-primary/20 bg-primary/5 p-6">
            <h4 className="mb-4 text-lg font-semibold text-foreground">{projections.assumptionsTitle}</h4>
            <div className="grid gap-3 md:grid-cols-2">
              {projections.assumptions.map((assumption, index) => (
                <div key={`${assumption}-${index}`} className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">{assumption}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
