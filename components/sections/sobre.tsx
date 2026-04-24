"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Target, Eye, Award } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useSiteContent } from "@/src/lib/content/content-provider"

export function Sobre() {
  const { about, alexSantos, visibleSections } = useSiteContent()
  const valueIcons = [Target, Eye, Award]

  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {about.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            {about.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {about.text}
          </p>
        </motion.div>

        {/* Leadership Highlight */}
        {visibleSections.alex_santos ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mb-16 max-w-4xl"
          >
            <Card className="border-primary/20 bg-primary/5 p-8">
              <div className="flex flex-col items-center gap-6 md:flex-row">
                <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-3xl border border-primary/20 bg-primary/10">
                  <Image
                    src={alexSantos.photo}
                    alt={alexSantos.photoAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="mb-2 text-xl font-bold text-foreground">{about.leadershipTitle}</h3>
                  <p className="mb-2 text-sm font-medium text-primary">
                    {alexSantos.name} · {alexSantos.role}
                  </p>
                  <p className="leading-relaxed text-muted-foreground">{about.leadershipText}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : null}

        {/* History Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {about.stats.map((stat, index) => (
            <div key={index} className="text-center p-6 border border-border rounded-lg bg-card">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Mission, Vision, Values */}
        {visibleSections.club_identity ? (
        <div className="grid gap-6 md:grid-cols-3">
          {about.values.map((item, index) => {
            const Icon = valueIcons[index]

            return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-8 h-full bg-card border-border hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </Card>
            </motion.div>
            )
          })}
        </div>
        ) : null}
      </div>
    </section>
  )
}
