"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ExternalLink, TrendingUp } from "lucide-react"
import { useSiteContent } from "@/src/lib/content/content-provider"

export function Ativos() {
  const { ativos } = useSiteContent()

  return (
    <section id="ativos" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {ativos.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            {ativos.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {ativos.description}
          </p>
        </motion.div>

        {/* Total Assets Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <Card className="p-8 bg-primary/5 border-primary/20">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              {ativos.totals.map((item) => (
                <div key={item.label}>
                  <div className="text-3xl font-bold text-primary mb-2">{item.value}</div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Athletes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {ativos.athletes.map((athlete, index) => (
            <motion.div
              key={athlete.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{athlete.name}</h3>
                    <p className="text-sm text-muted-foreground">{athlete.position} | {athlete.age} {ativos.ageSuffix}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">{athlete.value}</div>
                    <div className="text-xs text-muted-foreground">{ativos.marketValueLabel}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{athlete.currentClub}</span>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">{athlete.retained} {ativos.retainedSuffix}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Card className="p-6 bg-secondary border-border inline-block">
            <p className="text-muted-foreground text-sm">{ativos.note}</p>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
