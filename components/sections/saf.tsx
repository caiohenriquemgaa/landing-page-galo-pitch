"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Shield, Scale, TrendingUp, Building2, FileCheck, Users } from "lucide-react"
import { useSiteContent } from "@/src/lib/content/content-provider"

export function SAF() {
  const { saf } = useSiteContent()
  const benefitIcons = [Shield, Scale, TrendingUp, Building2, FileCheck, Users]

  return (
    <section id="saf" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {saf.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            {saf.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {saf.description}
          </p>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card className="p-8 bg-primary/5 border-primary/20">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {saf.highlights.map((item) => (
                <div key={item.label}>
                  <div className="text-4xl font-bold text-primary mb-2">{item.value}</div>
                  <div className="text-muted-foreground text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {saf.benefits.map((benefit, index) => {
            const Icon = benefitIcons[index]

            return (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full bg-card border-border hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
              </Card>
            </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
