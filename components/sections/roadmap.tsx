"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Target, Rocket, Star } from "lucide-react"
import { useSiteContent } from "@/src/lib/content/content-provider"

export function Roadmap() {
  const { roadmap } = useSiteContent()
  const phaseIcons = [Target, Rocket, Star]
  const phaseColors = ["bg-primary", "bg-primary/70", "bg-primary/50"]

  return (
    <section id="roadmap" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {roadmap.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            {roadmap.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {roadmap.description}
          </p>
        </motion.div>

        {/* Timeline Horizontal */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0" />

          <div className="grid lg:grid-cols-3 gap-8">
            {roadmap.phases.map((phase, index) => {
              const Icon = phaseIcons[index]
              const color = phaseColors[index]

              return (
              <motion.div
                key={phase.period}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Circle Marker */}
                <div className="hidden lg:flex absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background border-4 border-primary items-center justify-center z-10">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>

                <Card className="p-8 bg-card border-border hover:border-primary/50 transition-colors h-full mt-6 lg:mt-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <span className="text-primary text-sm font-medium">{phase.period}</span>
                      <h3 className="text-xl font-bold text-foreground">{phase.title}</h3>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {phase.goals.map((goal, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Card className="p-6 bg-primary/5 border-primary/20 inline-block">
            <p className="text-muted-foreground text-sm">{roadmap.note}</p>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
