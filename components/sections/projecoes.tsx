"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { TrendingUp, ArrowUpRight } from "lucide-react"
import { useSiteContent } from "@/src/lib/content/content-provider"

export function Projecoes() {
  const { projections } = useSiteContent()
  const maxRevenue = Math.max(...projections.items.map((item) => item.revenue))

  return (
    <section id="projecoes" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {projections.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            {projections.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {projections.description}
          </p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {projections.metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-card border-border text-center">
                <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">{metric.value}</p>
                <div className="flex items-center justify-center gap-1 text-primary">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="p-8 bg-card border-border">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">{projections.chartTitle}</h3>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end justify-between gap-4 h-64">
              {projections.items.map((item, index) => (
                <div key={item.year} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="w-full bg-primary/80 rounded-t-lg relative min-h-[20px]"
                  >
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-semibold text-primary whitespace-nowrap">
                      R$ {item.revenue}M
                    </span>
                  </motion.div>
                  <div className="text-center">
                    <span className="text-sm font-medium text-foreground">{item.year}</span>
                    {item.growth && (
                      <span className="block text-xs text-primary">+{item.growth}%</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Assumptions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="p-6 bg-primary/5 border-primary/20">
            <h4 className="text-lg font-semibold text-foreground mb-4">{projections.assumptionsTitle}</h4>
            <div className="grid md:grid-cols-2 gap-3">
              {projections.assumptions.map((assumption, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
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
