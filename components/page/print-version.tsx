import Image from "next/image"
import { PrintActions } from "@/components/page/print-actions"
import type { ResolvedSiteContent } from "@/src/types/content"

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value)
}

function PrintSheet({
  children,
  pageBreak = false,
}: {
  children: React.ReactNode
  pageBreak?: boolean
}) {
  return (
    <section
      className={`print-sheet bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] ${
        pageBreak ? "print-page-break" : ""
      }`}
    >
      {children}
    </section>
  )
}

export function PrintVersion({ content }: { content: ResolvedSiteContent }) {
  const {
    hero,
    about,
    estrutura,
    base,
    conquistas,
    saf,
    business,
    ativos,
    financialModel,
    projections,
    roadmap,
    caseStudy,
    investment,
    benefits,
    footer,
    visibleSections,
  } = content

  const showIntroSheet = visibleSections.hero || visibleSections.about_club || visibleSections.structure
  const showDevelopmentSheet =
    visibleSections.youth_development || visibleSections.saf_opportunity || visibleSections.achievements_timeline
  const showBusinessSheet =
    visibleSections.business_model || visibleSections.financial_model || visibleSections.investor_benefits
  const showAssetsSheet = visibleSections.athlete_assets || visibleSections.financial_model
  const showStrategySheet = visibleSections.roadmap || visibleSections.case_study || visibleSections.investment_offer

  return (
    <main className="min-h-screen bg-[#f3f0e7] text-slate-900" data-print-root>
      <PrintActions />

      <div className="mx-auto flex max-w-[210mm] flex-col gap-6 px-4 py-6 print:px-0 print:py-0">
        {showIntroSheet ? (
          <PrintSheet>
            <div className="relative overflow-hidden border-b border-black/10 bg-[#111111] px-8 py-12 text-white">
              {visibleSections.hero ? (
                <div className="absolute inset-0 opacity-20">
                  <Image src={hero.backgroundImage} alt={hero.backgroundAlt} fill className="object-cover" priority />
                </div>
              ) : null}

              <div className="relative z-10 max-w-3xl">
                {visibleSections.hero ? (
                  <>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#d0aa50]">
                      {hero.badge}
                    </p>
                    <h1 className="max-w-2xl text-4xl font-bold leading-tight">
                      {hero.title} <span className="text-[#d0aa50]">{hero.titleHighlight}</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">{hero.subtitle}</p>
                  </>
                ) : null}

                {visibleSections.about_club ? (
                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {about.stats.map((stat) => (
                      <div key={stat.label} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                        <p className="text-2xl font-semibold text-[#f0cf7a]">{stat.value}</p>
                        <p className="mt-1 text-sm text-white/75">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div
              className={`grid gap-8 px-8 py-8 ${
                visibleSections.about_club && visibleSections.structure ? "md:grid-cols-[1.15fr_0.85fr]" : ""
              }`}
            >
              {visibleSections.about_club ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a6a21]">{about.eyebrow}</p>
                  <h2 className="mt-2 text-2xl font-bold">{about.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{about.text}</p>

                  {visibleSections.club_identity ? (
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      {about.values.map((item) => (
                        <div key={item.title} className="rounded-2xl border border-[#e8dcc0] bg-[#faf7f0] p-4">
                          <h3 className="font-semibold text-slate-900">{item.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}

              {visibleSections.structure || visibleSections.alex_santos ? (
                <aside className="space-y-4 rounded-3xl border border-[#ead8ad] bg-[#fbf6e7] p-6">
                  {visibleSections.alex_santos ? (
                    <>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8a6a21]">
                          {about.leadershipTitle}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-slate-700">{about.leadershipText}</p>
                      </div>
                      {visibleSections.structure ? <div className="h-px bg-[#ead8ad]" /> : null}
                    </>
                  ) : null}

                  {visibleSections.structure ? (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8a6a21]">
                        Estrutura operacional
                      </p>
                      <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
                        {estrutura.items.slice(0, 3).map((item) => (
                          <li key={item.title}>
                            <span className="font-semibold text-slate-900">{item.title}:</span> {item.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </aside>
              ) : null}
            </div>
          </PrintSheet>
        ) : null}

        {showDevelopmentSheet ? (
          <PrintSheet pageBreak>
            <div className="grid gap-8 px-8 py-8">
              {visibleSections.youth_development ? (
                <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a6a21]">{base.eyebrow}</p>
                    <h2 className="mt-2 text-2xl font-bold">{base.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{base.description}</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {base.stats.map((stat) => (
                        <div key={stat.label} className="rounded-2xl border border-slate-200 p-4">
                          <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                          <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a6a21]">
                      {base.methodologyTitle}
                    </p>
                    <div className="mt-4 space-y-4">
                      {base.methodology.map((item) => (
                        <div key={item.title}>
                          <h3 className="font-semibold text-slate-900">{item.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {visibleSections.saf_opportunity || visibleSections.achievements_timeline ? (
                <div
                  className={`grid gap-6 ${
                    visibleSections.saf_opportunity && visibleSections.achievements_timeline ? "lg:grid-cols-2" : ""
                  }`}
                >
                  {visibleSections.saf_opportunity ? (
                    <div className="rounded-3xl bg-[#111111] p-6 text-white">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d0aa50]">{saf.eyebrow}</p>
                      <h3 className="mt-2 text-xl font-bold">{saf.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/75">{saf.description}</p>
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {saf.highlights.map((item) => (
                          <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-xl font-semibold text-[#f0cf7a]">{item.value}</p>
                            <p className="mt-1 text-sm text-white/70">{item.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {visibleSections.achievements_timeline ? (
                    <div className="rounded-3xl border border-[#ead8ad] bg-[#fbf6e7] p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a6a21]">
                        {conquistas.eyebrow}
                      </p>
                      <h3 className="mt-2 text-xl font-bold">{conquistas.title}</h3>
                      <div className="mt-4 space-y-4">
                        {conquistas.timeline.slice(0, 4).map((item) => (
                          <div key={`${item.year}-${item.title}`} className="border-l-2 border-[#d0aa50] pl-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a6a21]">
                              {item.year}
                            </p>
                            <p className="mt-1 font-semibold text-slate-900">{item.title}</p>
                            <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </PrintSheet>
        ) : null}

        {showBusinessSheet ? (
          <PrintSheet pageBreak>
            <div className="grid gap-8 px-8 py-8">
              {visibleSections.business_model ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a6a21]">{business.eyebrow}</p>
                  <h2 className="mt-2 text-2xl font-bold">{business.title}</h2>
                  <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">{business.description}</p>
                </div>
              ) : null}

              <div
                className={`grid gap-6 ${
                  visibleSections.business_model && (visibleSections.financial_model || visibleSections.investor_benefits)
                    ? "lg:grid-cols-[1.1fr_0.9fr]"
                    : ""
                }`}
              >
                {visibleSections.business_model ? (
                  <div className="rounded-3xl border border-slate-200 p-6">
                    <h3 className="text-lg font-semibold">{business.core.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{business.core.description}</p>
                    <div className="mt-5 grid gap-4 sm:grid-cols-3">
                      {business.core.metrics.map((metric) => (
                        <div key={metric.label} className="rounded-2xl bg-slate-50 p-4">
                          <p className="text-xl font-semibold text-slate-900">{metric.value}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 space-y-3">
                      {business.items.map((item) => (
                        <div key={item.title} className="rounded-2xl border border-slate-200 p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="font-semibold text-slate-900">{item.title}</p>
                              <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-semibold text-[#8a6a21]">{item.percentage}%</p>
                              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.highlight}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {visibleSections.financial_model || visibleSections.investor_benefits || visibleSections.business_model ? (
                  <div className="space-y-6">
                    {visibleSections.financial_model ? (
                      <div className="rounded-3xl border border-[#ead8ad] bg-[#fbf6e7] p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8a6a21]">
                          {financialModel.section.eyebrow}
                        </p>
                        <h3 className="mt-2 text-xl font-bold">{financialModel.section.title}</h3>
                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          <div className="rounded-2xl bg-white p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Receita 2026</p>
                            <p className="mt-2 text-xl font-semibold text-slate-900">
                              {formatCurrency(financialModel.kpis.projectedRevenue2026)}
                            </p>
                          </div>
                          <div className="rounded-2xl bg-white p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Aporte 2026</p>
                            <p className="mt-2 text-xl font-semibold text-slate-900">
                              {formatCurrency(financialModel.kpis.approvedCapital2026)}
                            </p>
                          </div>
                          <div className="rounded-2xl bg-white p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Cota</p>
                            <p className="mt-2 text-xl font-semibold text-slate-900">
                              {financialModel.kpis.investmentSharePercent}%
                            </p>
                          </div>
                          <div className="rounded-2xl bg-white p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Valor por cota</p>
                            <p className="mt-2 text-xl font-semibold text-slate-900">
                              {formatCurrency(financialModel.kpis.investmentShareValue)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {visibleSections.business_model ? (
                      <div className="rounded-3xl bg-[#111111] p-6 text-white">
                        <p className="text-sm uppercase tracking-[0.24em] text-[#d0aa50]">
                          {business.annualRevenueLabel}
                        </p>
                        <p className="mt-3 text-4xl font-bold">{business.annualRevenueValue}</p>
                        <p className="mt-3 text-sm leading-7 text-white/75">{business.annualRevenueDescription}</p>
                      </div>
                    ) : null}

                    {visibleSections.investor_benefits ? (
                      <div className="rounded-3xl border border-[#ead8ad] bg-[#fbf6e7] p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8a6a21]">
                          {benefits.eyebrow}
                        </p>
                        <h3 className="mt-2 text-xl font-bold">{benefits.title}</h3>
                        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                          {benefits.items.map((item) => (
                            <li key={item.title}>
                              <span className="font-semibold text-slate-900">{item.title}:</span> {item.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </PrintSheet>
        ) : null}

        {showAssetsSheet ? (
          <PrintSheet pageBreak>
            <div className="grid gap-8 px-8 py-8">
              {visibleSections.athlete_assets ? (
                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a6a21]">{ativos.eyebrow}</p>
                    <h2 className="mt-2 text-2xl font-bold">{ativos.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{ativos.description}</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {ativos.totals.map((item) => (
                        <div key={item.label} className="rounded-2xl border border-slate-200 p-4">
                          <p className="text-2xl font-semibold text-slate-900">{item.value}</p>
                          <p className="mt-1 text-sm text-slate-500">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8a6a21]">
                      Atletas monitorados
                    </p>
                    <div className="mt-4 space-y-3">
                      {ativos.athletes.slice(0, 5).map((athlete) => (
                        <div key={athlete.name} className="rounded-2xl bg-white p-4 shadow-sm">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="font-semibold text-slate-900">{athlete.name}</p>
                              <p className="text-sm text-slate-500">
                                {athlete.position} | {athlete.currentClub}
                              </p>
                            </div>
                            <div className="text-right text-sm">
                              <p className="font-semibold text-slate-900">{athlete.value}</p>
                              <p className="text-slate-500">
                                {athlete.age}
                                {ativos.ageSuffix}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-xs leading-5 text-slate-500">{ativos.note}</p>
                  </div>
                </div>
              ) : null}

              {visibleSections.financial_model ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a6a21]">
                    {projections.eyebrow}
                  </p>
                  <h3 className="mt-2 text-xl font-bold">{projections.title}</h3>
                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    {projections.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-2xl border border-slate-200 p-4">
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{metric.label}</p>
                        <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
                        <p className="mt-1 text-sm text-[#8a6a21]">{metric.change}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
                    <table className="w-full border-collapse text-left text-sm">
                      <thead className="bg-slate-900 text-white">
                        <tr>
                          <th className="px-4 py-3 font-medium">Ano</th>
                          <th className="px-4 py-3 font-medium">Receita</th>
                          <th className="px-4 py-3 font-medium">Crescimento</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projections.items.map((item) => (
                          <tr key={item.year} className="border-t border-slate-200">
                            <td className="px-4 py-3 font-medium text-slate-900">{item.year}</td>
                            <td className="px-4 py-3 text-slate-600">{formatCurrency(item.revenue)}</td>
                            <td className="px-4 py-3 text-slate-600">
                              {item.growth === null ? "Base" : `${item.growth}%`}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </div>
          </PrintSheet>
        ) : null}

        {showStrategySheet ? (
          <PrintSheet pageBreak>
            <div className="grid gap-8 px-8 py-8">
              {visibleSections.roadmap || visibleSections.case_study ? (
                <div
                  className={`grid gap-6 ${
                    visibleSections.roadmap && visibleSections.case_study ? "lg:grid-cols-[1fr_1fr]" : ""
                  }`}
                >
                  {visibleSections.roadmap ? (
                    <div className="rounded-3xl border border-slate-200 p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a6a21]">
                        {roadmap.eyebrow}
                      </p>
                      <h2 className="mt-2 text-2xl font-bold">{roadmap.title}</h2>
                      <p className="mt-4 text-sm leading-7 text-slate-600">{roadmap.description}</p>
                      <div className="mt-5 space-y-4">
                        {roadmap.phases.map((phase) => (
                          <div key={phase.period} className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a6a21]">
                              {phase.period}
                            </p>
                            <h3 className="mt-1 font-semibold text-slate-900">{phase.title}</h3>
                            <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-600">
                              {phase.goals.map((goal) => (
                                <li key={goal}>• {goal}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {visibleSections.case_study ? (
                    <div className="rounded-3xl border border-[#ead8ad] bg-[#fbf6e7] p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a6a21]">
                        {caseStudy.eyebrow}
                      </p>
                      <h2 className="mt-2 text-2xl font-bold">{caseStudy.title}</h2>
                      <p className="mt-4 text-sm leading-7 text-slate-600">{caseStudy.description}</p>
                      <div className="mt-5 space-y-3">
                        {caseStudy.analysisParagraphs.map((paragraph, index) => (
                          <p key={index} className="text-sm leading-7 text-slate-700">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <div className="mt-5 grid gap-4 sm:grid-cols-3">
                        {caseStudy.stats.map((stat) => (
                          <div key={stat.label} className="rounded-2xl bg-white p-4">
                            <p className="text-lg font-semibold text-slate-900">{stat.value}</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
                            <p className="mt-2 text-xs text-[#8a6a21]">{stat.year}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {visibleSections.investment_offer ? (
                <div className="rounded-3xl bg-[#111111] p-6 text-white">
                  <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d0aa50]">
                        {investment.eyebrow}
                      </p>
                      <h2 className="mt-2 text-2xl font-bold">{investment.title}</h2>
                      <p className="mt-4 text-sm leading-7 text-white/75">{investment.description}</p>
                      <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        {investment.highlights.map((item) => (
                          <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-2xl font-semibold text-[#f0cf7a]">{item.value}</p>
                            <p className="mt-1 text-sm text-white/70">{item.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-3xl bg-white p-5 text-slate-900">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a6a21]">
                        Tese de investimento
                      </p>
                      <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                        {investment.tiers.map((tier) => (
                          <div
                            key={tier.name}
                            className={`rounded-2xl border p-4 ${
                              tier.highlight ? "border-[#d0aa50] bg-[#fbf6e7]" : "border-slate-200"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <p className="font-semibold text-slate-900">{tier.name}</p>
                              <p className="text-sm text-slate-500">{tier.equity}</p>
                            </div>
                            <p className="mt-2 text-lg font-semibold text-[#8a6a21]">{tier.investment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <footer className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">Galo Maringá SAF</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{footer.brandDescription}</p>
                  </div>
                  <div className="text-sm leading-7 text-slate-600">
                    {footer.contact.addressLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                    <p>{footer.contact.phone}</p>
                    <p>{footer.contact.email}</p>
                  </div>
                </div>
              </footer>
            </div>
          </PrintSheet>
        ) : null}
      </div>
    </main>
  )
}
