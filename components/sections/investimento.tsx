"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Check, Shield, Clock, Percent, FileText } from "lucide-react"
import { useSiteContent } from "@/src/lib/content/content-provider"

export function Investimento() {
  const { investment } = useSiteContent()
  const highlightIcons = [Percent, Shield, Clock, FileText]

  return (
    <section id="investimento" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {investment.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            {investment.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {investment.description}
          </p>
        </motion.div>

        {/* Investment Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <Card className="p-8 bg-primary/5 border-primary/20">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              {investment.highlights.map((item, index) => {
                const Icon = highlightIcons[index]

                return (
                  <div key={item.label} className="flex flex-col items-center">
                    <Icon className="w-8 h-8 text-primary mb-2" />
                    <div className="text-2xl font-bold text-foreground">{item.value}</div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                  </div>
                )
              })}
            </div>
          </Card>
        </motion.div>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {investment.tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  {investment.featuredTierLabel}
                </div>
              )}
              <Card className={`p-8 h-full ${
                tier.highlight 
                  ? "bg-primary/10 border-primary" 
                  : "bg-card border-border"
              }`}>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{tier.name}</h3>
                  <div className="text-3xl font-bold text-primary mb-1">{tier.investment}</div>
                  <div className="text-sm text-muted-foreground">{tier.equity} {investment.equitySuffix}</div>
                </div>

                <ul className="space-y-3">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            {investment.disclaimer}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
