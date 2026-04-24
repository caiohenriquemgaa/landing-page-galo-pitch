export type NavLink = {
  label: string
  href: string
}

export type StatItem = {
  value: string
  label: string
}

export type FeatureItem = {
  title: string
  description: string
}

export type SectionKey =
  | "site_settings"
  | "hero"
  | "about_club"
  | "club_identity"
  | "alex_santos"
  | "structure"
  | "youth_development"
  | "achievements_timeline"
  | "saf_opportunity"
  | "business_model"
  | "athlete_assets"
  | "financial_model"
  | "roadmap"
  | "case_study"
  | "investment_offer"
  | "investor_benefits"
  | "final_cta"
  | "contact"

export type JsonPrimitive = string | number | boolean | null
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[]
export type JsonObject = {
  [key: string]: JsonValue
}

export type SiteSettingsSection = {
  meta: {
    title: string
    description: string
  }
  header: {
    brand: {
      primary: string
      highlight: string
    }
    navLinks: NavLink[]
    cta: string
    mobileMenuAriaLabel: string
    printButtonLabel: string
  }
  footer: {
    brandDescription: string
    tagline: string
    socialLinks: Array<{
      label: string
      href: string
    }>
    quickLinksTitle: string
    quickLinks: NavLink[]
    investorsTitle: string
    investorLinks: NavLink[]
    copyright: string
    legalLinks: NavLink[]
    riskNote: string
  }
}

export type HeroSection = {
  badge: string
  title: string
  titleHighlight: string
  subtitle: string
  primaryCta: string
  secondaryCta: string
  backgroundImage: string
  backgroundAlt: string
  scrollAriaLabel: string
}

export type AboutClubSection = {
  eyebrow: string
  title: string
  text: string
  stats: StatItem[]
}

export type ClubIdentitySection = {
  title: string
  description: string
  items: FeatureItem[]
}

export type AlexSantosSection = {
  name: string
  role: string
  photo: string
  photoAlt: string
  leadershipTitle: string
  leadershipText: string
  description: string
  highlights: string[]
}

export type StructureSection = {
  eyebrow: string
  title: string
  description: string
  items: Array<{
    title: string
    description: string
    image: string
    imageAlt: string
    features: string[]
  }>
}

export type YouthDevelopmentSection = {
  eyebrow: string
  title: string
  description: string
  stats: StatItem[]
  image: string
  imageAlt: string
  imageCaption: string
  categoriesTitle: string
  categories: Array<{
    name: string
    players: number
    focus: string
  }>
  playersLabel: string
  methodologyTitle: string
  methodology: FeatureItem[]
}

export type AchievementsTimelineSection = {
  eyebrow: string
  title: string
  description: string
  timeline: Array<{
    year: string
    title: string
    description: string
  }>
}

export type SafOpportunitySection = {
  eyebrow: string
  title: string
  description: string
  highlights: StatItem[]
  benefits: FeatureItem[]
}

export type BusinessModelSection = {
  eyebrow: string
  title: string
  description: string
  core: {
    title: string
    description: string
    metrics: StatItem[]
  }
  items: Array<{
    title: string
    percentage: number
    description: string
    highlight: string
    isCore: boolean
  }>
  annualRevenueLabel: string
  annualRevenueValue: string
  annualRevenueDescription: string
}

export type AthleteAssetsSection = {
  eyebrow: string
  title: string
  description: string
  totals: StatItem[]
  athletes: Array<{
    name: string
    position: string
    currentClub: string
    age: number
    value: string
    retained: string
  }>
  marketValueLabel: string
  ageSuffix: string
  retainedSuffix: string
  note: string
}

export type FinancialModelSection = {
  section: {
    id: string
    eyebrow: string
    title: string
    description: string
  }
  kpis: {
    projectedRevenue2026: number
    approvedCapital2026: number
    investmentSharePercent: number
    investmentShareValue: number
  }
  revenueSources: Array<{
    name: string
    value: number
    description: string
  }>
  capitalStructure: {
    title: string
    description: string
    longTermValueDriver: string
    notes: string[]
  }
  growthProjection: {
    eyebrow: string
    title: string
    description: string
    metrics: Array<{
      label: string
      value: string
      change: string
    }>
    chartTitle: string
    items: Array<{
      year: string
      revenue: number
      growth: number | null
    }>
    assumptionsTitle: string
    assumptions: string[]
  }
  scenarios: {
    conservative: {
      label: string
      annualRevenue: number
      projectValuation: number
      sportsExpansion: string
      summary: string
      highlights: string[]
    }
    moderate: {
      label: string
      annualRevenue: number
      projectValuation: number
      sportsExpansion: string
      summary: string
      highlights: string[]
    }
    aggressive: {
      label: string
      annualRevenue: number
      projectValuation: number
      sportsExpansion: string
      summary: string
      highlights: string[]
    }
  }
  investmentThesis: {
    eyebrow: string
    title: string
    description: string
    pillars: FeatureItem[]
    leadershipNote: string
  }
}

export type RoadmapSection = {
  eyebrow: string
  title: string
  description: string
  phases: Array<{
    period: string
    title: string
    goals: string[]
  }>
  note: string
}

export type CaseStudySection = {
  eyebrow: string
  title: string
  description: string
  analysisTitle: string
  analysisParagraphs: string[]
  stats: Array<{
    label: string
    value: string
    year: string
  }>
  resultsTitle: string
  results: string[]
  comparisonLabel: string
  comparisonText: string
}

export type InvestmentOfferSection = {
  eyebrow: string
  title: string
  description: string
  highlights: StatItem[]
  tiers: Array<{
    name: string
    investment: string
    equity: string
    highlight: boolean
    benefits: string[]
  }>
  featuredTierLabel: string
  equitySuffix: string
  disclaimer: string
}

export type InvestorBenefitsSection = {
  eyebrow: string
  title: string
  description: string
  items: FeatureItem[]
}

export type FinalCtaSection = {
  eyebrow: string
  title: string
  description: string
  successTitle: string
  successText: string
  successSubtext: string
  form: {
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    phoneLabel: string
    phonePlaceholder: string
    investmentLabel: string
    investmentPlaceholder: string
    investmentOptions: Array<{
      value: string
      label: string
    }>
    submitLabel: string
    meetingLabel: string
    privacyNote: string
  }
}

export type ContactSection = {
  contactTitle: string
  contact: {
    addressLines: string[]
    phone: string
    email: string
  }
}

export type SiteSections = {
  site_settings: SiteSettingsSection
  hero: HeroSection
  about_club: AboutClubSection
  club_identity: ClubIdentitySection
  alex_santos: AlexSantosSection
  structure: StructureSection
  youth_development: YouthDevelopmentSection
  achievements_timeline: AchievementsTimelineSection
  saf_opportunity: SafOpportunitySection
  business_model: BusinessModelSection
  athlete_assets: AthleteAssetsSection
  financial_model: FinancialModelSection
  roadmap: RoadmapSection
  case_study: CaseStudySection
  investment_offer: InvestmentOfferSection
  investor_benefits: InvestorBenefitsSection
  final_cta: FinalCtaSection
  contact: ContactSection
}

export type SectionVisibility = Record<SectionKey, boolean>

export type SiteContentRow = {
  id: string
  key: SectionKey
  value_json: JsonObject
  is_published: boolean
  created_at: string
  updated_at: string
}

export type AdminSectionRecord<K extends SectionKey = SectionKey> = {
  key: K
  label: string
  description: string
  isPublished: boolean
  valueJson: SiteSections[K]
  updatedAt?: string
  createdAt?: string
}

export type ResolvedSiteContent = {
  visibleSections: SectionVisibility
  meta: SiteSettingsSection["meta"]
  header: SiteSettingsSection["header"]
  hero: HeroSection
  about: {
    eyebrow: string
    title: string
    text: string
    leadershipTitle: string
    leadershipText: string
    stats: StatItem[]
    values: FeatureItem[]
  }
  alexSantos: AlexSantosSection
  estrutura: StructureSection
  base: YouthDevelopmentSection
  conquistas: AchievementsTimelineSection
  saf: SafOpportunitySection
  business: BusinessModelSection
  ativos: AthleteAssetsSection
  financialModel: FinancialModelSection
  projections: FinancialModelSection["growthProjection"]
  roadmap: RoadmapSection
  caseStudy: CaseStudySection
  investment: InvestmentOfferSection
  benefits: InvestorBenefitsSection
  cta: FinalCtaSection
  footer: SiteSettingsSection["footer"] & ContactSection
}
