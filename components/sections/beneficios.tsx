"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { 
  Crown, 
  Users, 
  FileText, 
  Ticket, 
  Shield, 
  TrendingUp, 
  Bell, 
  Star 
} from "lucide-react"
import { useSiteContent } from "@/src/lib/content/content-provider"

export function Beneficios() {
  const { benefits } = useSiteContent()
  const benefitIcons = [FileText, Users, Shield, TrendingUp, Ticket, Bell, Crown, Star]

  return (
    <section id="beneficios" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {benefits.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            {benefits.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {benefits.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.items.map((benefit, index) => {
            const Icon = benefitIcons[index]

            return (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="p-6 h-full bg-card border-border hover:border-primary/50 transition-colors text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-primary" />
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
