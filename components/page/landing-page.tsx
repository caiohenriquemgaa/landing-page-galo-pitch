import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { Sobre } from "@/components/sections/sobre"
import { Estrutura } from "@/components/sections/estrutura"
import { Base } from "@/components/sections/base"
import { Conquistas } from "@/components/sections/conquistas"
import { SAF } from "@/components/sections/saf"
import { ModeloNegocio } from "@/components/sections/modelo-negocio"
import { ModeloFinanceiro } from "@/components/sections/modelo-financeiro"
import { Ativos } from "@/components/sections/ativos"
import { Projecoes } from "@/components/sections/projecoes"
import { Roadmap } from "@/components/sections/roadmap"
import { CaseSucesso } from "@/components/sections/case-sucesso"
import { Investimento } from "@/components/sections/investimento"
import { Beneficios } from "@/components/sections/beneficios"
import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/sections/footer"
import { SiteContentProvider } from "@/src/lib/content/content-provider"
import type { ResolvedSiteContent } from "@/src/types/content"

export function LandingPage({ content }: { content: ResolvedSiteContent }) {
  return (
    <SiteContentProvider content={content}>
      <main className="min-h-screen">
        <Header />
        <Hero />
        <Sobre />
        <Estrutura />
        <Base />
        <Conquistas />
        <SAF />
        <ModeloNegocio />
        <ModeloFinanceiro />
        <Ativos />
        <Projecoes />
        <Roadmap />
        <CaseSucesso />
        <Investimento />
        <Beneficios />
        <CTA />
        <Footer />
      </main>
    </SiteContentProvider>
  )
}
