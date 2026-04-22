"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { UserCheck, Tv, Handshake, Ticket } from "lucide-react"
import { useSiteContent } from "@/src/lib/content/content-provider"

export function ModeloNegocio() {
  const { business } = useSiteContent()
  const streamIcons = [UserCheck, Tv, Handshake, Ticket]

  return (
    <section id="modelo" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {business.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            {business.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {business.description}
          </p>
        </motion.div>

        {/* Core Business Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <Card className="p-8 bg-primary/10 border-primary/30">
            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground mb-4">
                {business.core.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {business.core.description}
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {business.core.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Revenue Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {business.items.map((stream, index) => {
            const Icon = streamIcons[index]

            return (
            <motion.div
              key={stream.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`p-6 h-full transition-colors ${
                stream.isCore 
                  ? "bg-primary/5 border-primary/30 hover:border-primary" 
                  : "bg-card border-border hover:border-primary/50"
              }`}>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{stream.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{stream.description}</p>
                
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{stream.percentage}%</span>
                    <span className="text-primary font-semibold">{stream.highlight}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stream.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
            )
          })}
        </div>

        {/* Total Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="p-8 bg-card border-border text-center">
            <p className="text-muted-foreground mb-2">{business.annualRevenueLabel}</p>
            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{business.annualRevenueValue}</p>
            <p className="text-muted-foreground text-sm">
              {business.annualRevenueDescription}
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
