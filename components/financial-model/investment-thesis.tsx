import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import type { AlexSantosSection, FinancialModelSection } from "@/src/types/content"

type InvestmentThesisProps = {
  investmentThesis: FinancialModelSection["investmentThesis"]
  alexSantos: AlexSantosSection
}

export function InvestmentThesis({ investmentThesis, alexSantos }: InvestmentThesisProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <Card className="border-primary/20 bg-gradient-to-br from-[#171717] via-[#101010] to-[#1c1709] p-8 text-white">
        <Badge className="w-fit bg-primary text-primary-foreground">{investmentThesis.eyebrow}</Badge>
        <h3 className="mt-5 max-w-2xl text-3xl font-bold leading-tight">{investmentThesis.title}</h3>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/75">{investmentThesis.description}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {investmentThesis.pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold text-white">{pillar.title}</p>
              <p className="mt-3 text-sm leading-6 text-white/70">{pillar.description}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-border/80 bg-card p-8">
        <div className="flex items-start gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-primary/15 bg-primary/5 flex-shrink-0">
            <Image src={alexSantos.photo} alt={alexSantos.photoAlt} fill className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">Liderança estratégica</p>
            <h4 className="mt-3 text-2xl font-bold text-foreground">{alexSantos.name}</h4>
            <p className="mt-1 text-sm text-primary">{alexSantos.role}</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">{alexSantos.description}</p>
        <div className="mt-6 space-y-3">
          {alexSantos.highlights.map((highlight) => (
            <div key={highlight} className="rounded-2xl border border-border/80 bg-secondary/40 p-4">
              <p className="text-sm leading-6 text-foreground/85">{highlight}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-primary/15 bg-primary/5 p-5">
          <p className="text-sm leading-7 text-foreground/90">{investmentThesis.leadershipNote}</p>
        </div>
      </Card>
    </div>
  )
}
