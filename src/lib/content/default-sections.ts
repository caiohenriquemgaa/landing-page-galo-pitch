import { financialModel } from "@/src/content/financialModel"
import { siteContent } from "@/src/content/siteContent"
import type { ResolvedSiteContent, SectionKey, SectionVisibility, SiteSections } from "@/src/types/content"

export const defaultSiteSections: SiteSections = {
  site_settings: {
    meta: siteContent.meta,
    header: {
      ...siteContent.header,
      printButtonLabel: "Versão para impressão",
    },
    footer: {
      brandDescription: siteContent.footer.brandDescription,
      tagline: siteContent.footer.tagline,
      socialLinks: siteContent.footer.socialLinks,
      quickLinksTitle: siteContent.footer.quickLinksTitle,
      quickLinks: siteContent.footer.quickLinks,
      investorsTitle: siteContent.footer.investorsTitle,
      investorLinks: siteContent.footer.investorLinks,
      copyright: siteContent.footer.copyright,
      legalLinks: siteContent.footer.legalLinks,
      riskNote: siteContent.footer.riskNote,
    },
  },
  hero: siteContent.hero,
  about_club: {
    eyebrow: siteContent.about.eyebrow,
    title: siteContent.about.title,
    text: siteContent.about.text,
    stats: siteContent.about.stats,
  },
  club_identity: {
    title: "Identidade do Projeto",
    description: "Pilares institucionais que orientam a construção de valor do Galo Maringá.",
    items: siteContent.about.values,
  },
  alex_santos: {
    ...siteContent.alexSantos,
    role: "Liderança estratégica e desenvolvimento esportivo",
    leadershipTitle: siteContent.about.leadershipTitle,
    leadershipText: siteContent.about.leadershipText,
  },
  structure: siteContent.estrutura,
  youth_development: siteContent.base,
  achievements_timeline: siteContent.conquistas,
  saf_opportunity: siteContent.saf,
  business_model: siteContent.business,
  athlete_assets: siteContent.ativos,
  financial_model: financialModel,
  roadmap: siteContent.roadmap,
  case_study: siteContent.caseStudy,
  investment_offer: siteContent.investment,
  investor_benefits: siteContent.benefits,
  final_cta: siteContent.cta,
  contact: {
    contactTitle: siteContent.footer.contactTitle,
    contact: siteContent.footer.contact,
  },
}

export const defaultSectionKeys = Object.keys(defaultSiteSections) as SectionKey[]

export const defaultSectionVisibility = Object.fromEntries(
  defaultSectionKeys.map((key) => [key, true]),
) as SectionVisibility

export function resolveSiteContent(
  sections: SiteSections,
  visibility: SectionVisibility = defaultSectionVisibility,
): ResolvedSiteContent {
  const {
    site_settings,
    hero,
    about_club,
    club_identity,
    alex_santos,
    structure,
    youth_development,
    achievements_timeline,
    saf_opportunity,
    business_model,
    athlete_assets,
    financial_model,
    roadmap,
    case_study,
    investment_offer,
    investor_benefits,
    final_cta,
    contact,
  } = sections

  return {
    visibleSections: visibility,
    meta: site_settings.meta,
    header: site_settings.header,
    hero,
    about: {
      eyebrow: about_club.eyebrow,
      title: about_club.title,
      text: about_club.text,
      leadershipTitle: alex_santos.leadershipTitle,
      leadershipText: alex_santos.leadershipText,
      stats: about_club.stats,
      values: club_identity.items,
    },
    alexSantos: alex_santos,
    estrutura: structure,
    base: youth_development,
    conquistas: achievements_timeline,
    saf: saf_opportunity,
    business: business_model,
    ativos: athlete_assets,
    financialModel: financial_model,
    projections: financial_model.growthProjection,
    roadmap,
    caseStudy: case_study,
    investment: investment_offer,
    benefits: investor_benefits,
    cta: final_cta,
    footer: {
      ...site_settings.footer,
      contactTitle: contact.contactTitle,
      contact: contact.contact,
    },
  }
}
