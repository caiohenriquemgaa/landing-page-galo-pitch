"use client"

import { motion } from "framer-motion"
import { CapitalStructure } from "@/components/financial-model/capital-structure"
import { FinancialKpiCards } from "@/components/financial-model/financial-kpi-cards"
import { FinancialScenarioTabs } from "@/components/financial-model/financial-scenario-tabs"
import { InvestmentThesis } from "@/components/financial-model/investment-thesis"
import { RevenueBreakdown } from "@/components/financial-model/revenue-breakdown"
import { useSiteContent } from "@/src/lib/content/content-provider"

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function ModeloFinanceiro() {
  const { financialModel, alexSantos } = useSiteContent()
  const { section, kpis, revenueSources, capitalStructure, scenarios, investmentThesis } = financialModel

  return (
    <section id={section.id} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {section.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            {section.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{section.description}</p>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <FinancialKpiCards kpis={kpis} formatCurrency={formatCurrency} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <RevenueBreakdown
              projectedRevenue={kpis.projectedRevenue2026}
              revenueSources={revenueSources}
              formatCurrency={formatCurrency}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CapitalStructure
              kpis={kpis}
              capitalStructure={capitalStructure}
              formatCurrency={formatCurrency}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <FinancialScenarioTabs scenarios={scenarios} formatCurrency={formatCurrency} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <InvestmentThesis
              investmentThesis={investmentThesis}
              alexSantos={alexSantos}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
