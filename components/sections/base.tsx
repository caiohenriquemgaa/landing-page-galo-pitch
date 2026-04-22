"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Users, DollarSign, TrendingUp, Target, GraduationCap, BarChart3 } from "lucide-react"
import { useSiteContent } from "@/src/lib/content/content-provider"

export function Base() {
  const { base } = useSiteContent()
  const statIcons = [Users, GraduationCap, DollarSign, TrendingUp]
  const methodologyIcons = [Target, GraduationCap, BarChart3]

  return (
    <section id="base" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {base.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            {base.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            {base.description}
          </p>
        </motion.div>

        {/* Key Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {base.stats.map((stat, index) => {
            const Icon = statIcons[index]

            return (
            <Card key={stat.label} className="p-6 bg-primary/5 border-primary/20 text-center">
              <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
            )
          })}
        </motion.div>

        {/* Two Columns: Image + Categories */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
              <Image
                src={base.image}
                alt={base.imageAlt}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {base.imageCaption}
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 bg-card border-border">
              <h4 className="text-lg font-semibold text-foreground mb-6">{base.categoriesTitle}</h4>
              <div className="space-y-4">
                {base.categories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-secondary rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <div>
                        <span className="font-semibold text-foreground">{category.name}</span>
                        <p className="text-xs text-muted-foreground">{category.focus}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-primary">{category.players}</span>
                      <p className="text-xs text-muted-foreground">{base.playersLabel}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Methodology */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            {base.methodologyTitle}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {base.methodology.map((item, index) => {
              const Icon = methodologyIcons[index]

              return (
              <Card key={item.title} className="p-6 bg-card border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </Card>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
