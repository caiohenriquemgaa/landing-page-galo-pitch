"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { TrendingUp, Trophy, Users, DollarSign } from "lucide-react"
import { useSiteContent } from "@/src/lib/content/content-provider"

export function CaseSucesso() {
  const { caseStudy } = useSiteContent()
  const statIcons = [DollarSign, TrendingUp, Trophy, Users]

  return (
    <section id="case" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {caseStudy.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            {caseStudy.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {caseStudy.description}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 md:p-12 bg-card border-border">
              {/* Story */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-foreground mb-4">{caseStudy.analysisTitle}</h3>
                {caseStudy.analysisParagraphs.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className={`text-muted-foreground leading-relaxed ${index === 0 ? "mb-4" : ""}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                {caseStudy.stats.map((stat, index) => {
                  const Icon = statIcons[index]

                  return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center p-6 bg-secondary rounded-lg"
                  >
                    <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-foreground">{stat.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.year}</div>
                  </motion.div>
                  )
                })}
              </div>

              {/* Key Results */}
              <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                <h4 className="text-lg font-semibold text-foreground mb-4">{caseStudy.resultsTitle}</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {caseStudy.results.map((result, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Comparison Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <Card className="p-6 bg-primary/10 border-primary/30">
              <p className="text-foreground">
                <span className="font-semibold">{caseStudy.comparisonLabel}</span>{" "}
                {caseStudy.comparisonText}
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
