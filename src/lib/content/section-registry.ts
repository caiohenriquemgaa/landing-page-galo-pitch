import type { SectionKey } from "@/src/types/content"

export const sectionOrder: SectionKey[] = [
  "site_settings",
  "hero",
  "about_club",
  "club_identity",
  "alex_santos",
  "structure",
  "youth_development",
  "achievements_timeline",
  "saf_opportunity",
  "business_model",
  "athlete_assets",
  "financial_model",
  "roadmap",
  "case_study",
  "investment_offer",
  "investor_benefits",
  "final_cta",
  "contact",
]

export const sectionRegistry: Record<SectionKey, { label: string; description: string }> = {
  site_settings: {
    label: "Configurações gerais",
    description: "Marca, metadata, navegação, textos institucionais do rodapé e links auxiliares.",
  },
  hero: {
    label: "Hero",
    description: "Título principal, subtítulo, CTAs e contexto de abertura da landing.",
  },
  about_club: {
    label: "Sobre o clube",
    description: "Apresentação institucional, visão de longo prazo e indicadores iniciais do projeto.",
  },
  club_identity: {
    label: "Identidade do clube",
    description: "Missão, visão e diferenciais estratégicos do Galo Maringá.",
  },
  alex_santos: {
    label: "Alex Santos",
    description: "Posicionamento da liderança estratégica, narrativa de credibilidade e highlights.",
  },
  structure: {
    label: "Estrutura",
    description: "Ativos físicos, instalações e recursos que sustentam a operação do clube.",
  },
  youth_development: {
    label: "Formação de atletas",
    description: "Base, categorias, metodologia e eixo central de geração de valor esportivo.",
  },
  achievements_timeline: {
    label: "Linha do tempo",
    description: "Marcos históricos que demonstram evolução institucional e esportiva.",
  },
  saf_opportunity: {
    label: "Oportunidade SAF",
    description: "Tese regulatória, governança e vantagens do modelo SAF para investidores.",
  },
  business_model: {
    label: "Modelo de negócio",
    description: "Fontes de receita, foco em ativos esportivos e racional operacional.",
  },
  athlete_assets: {
    label: "Ativos de atletas",
    description: "Portfólio de atletas, valor retido e ativos com potencial de liquidez.",
  },
  financial_model: {
    label: "Modelo financeiro",
    description: "KPIs, fontes de receita, necessidade de capital, cenários e tese financeira.",
  },
  roadmap: {
    label: "Roadmap",
    description: "Planejamento estratégico, fases de crescimento e metas de evolução do projeto.",
  },
  case_study: {
    label: "Case de referência",
    description: "Exemplo comparável de transformação via gestão profissional e investimento.",
  },
  investment_offer: {
    label: "Oferta de investimento",
    description: "Condições de entrada, tiers e framing institucional da oportunidade.",
  },
  investor_benefits: {
    label: "Benefícios ao investidor",
    description: "Benefícios institucionais, societários e de relacionamento com o projeto.",
  },
  final_cta: {
    label: "CTA final",
    description: "Bloco de conversão com formulário, mensagem final e chamadas à ação.",
  },
  contact: {
    label: "Contato",
    description: "Informações de contato e dados finais exibidos na landing e no rodapé.",
  },
}
