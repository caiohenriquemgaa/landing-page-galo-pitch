export type FinancialKpis = {
  projectedRevenue2026: number
  approvedCapital2026: number
  investmentSharePercent: number
  investmentShareValue: number
}

export type RevenueSource = {
  name: string
  value: number
  description: string
}

export type FinancialScenarioKey = "conservative" | "moderate" | "aggressive"

export type FinancialScenario = {
  label: string
  annualRevenue: number
  projectValuation: number
  sportsExpansion: string
  summary: string
  highlights: string[]
}

export type FinancialModelContent = {
  section: {
    id: string
    eyebrow: string
    title: string
    description: string
  }
  kpis: FinancialKpis
  revenueSources: RevenueSource[]
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
  scenarios: Record<FinancialScenarioKey, FinancialScenario>
  investmentThesis: {
    eyebrow: string
    title: string
    description: string
    pillars: Array<{
      title: string
      description: string
    }>
    leadershipNote: string
  }
}

export const financialModel: FinancialModelContent = {
  section: {
    id: "financeiro",
    eyebrow: "Estrutura Financeira do Projeto",
    title: "Modelo Financeiro",
    description:
      "Uma leitura executiva de como o Galo Maringá estrutura receitas, necessidade de capital e potencial de valorização para sustentar um projeto de longo prazo com foco em formação de atletas.",
  },
  kpis: {
    projectedRevenue2026: 1_000_000,
    approvedCapital2026: 3_000_000,
    investmentSharePercent: 1,
    investmentShareValue: 50_000,
  },
  revenueSources: [
    {
      name: "Direitos de transmissão",
      value: 20,
      description: "Cotas e distribuições ligadas ao calendário competitivo e à visibilidade da operação.",
    },
    {
      name: "Patrocínios e comerciais",
      value: 30,
      description: "Ativações de marca, naming rights regionais e acordos com parceiros institucionais.",
    },
    {
      name: "Matchday",
      value: 15,
      description: "Bilheteria, hospitalidade, consumo e experiências em dias de jogo.",
    },
    {
      name: "Transferência de atletas",
      value: 25,
      description: "Negociação de talentos formados e retenção de participações em vendas futuras.",
    },
    {
      name: "Receitas diversas",
      value: 10,
      description: "Licenciamento, serviços, eventos e oportunidades complementares da plataforma SAF.",
    },
  ],
  capitalStructure: {
    title: "Receita inicial, capital de aceleração e construção de valor",
    description:
      "A lógica financeira para 2026 combina receita operacional projetada com capital aprovado para acelerar infraestrutura, base, operação esportiva e capacidade de geração de ativos.",
    longTermValueDriver:
      "A formação e venda de atletas é o principal motor de valorização de longo prazo, pois converte investimento em desenvolvimento técnico, exposição competitiva e ativos negociáveis no mercado.",
    notes: [
      "A receita projetada cobre parte da operação e demonstra capacidade de monetização já no curto prazo.",
      "O aporte aprovado amplia a velocidade de execução, reduz gargalos estruturais e melhora o ambiente de formação.",
      "Novas receitas tendem a crescer com evolução esportiva, fortalecimento institucional e expansão da marca regional.",
    ],
  },
  growthProjection: {
    eyebrow: "Perspectivas Financeiras",
    title: "Projeções de Crescimento",
    description:
      "Cenário-base de crescimento apoiado na ampliação da base, fortalecimento institucional e monetização progressiva dos ativos esportivos.",
    metrics: [
      { label: "Receita 2028 (Projetada)", value: "R$ 28M", change: "+289%" },
      { label: "EBITDA Esperado 2028", value: "R$ 8.4M", change: "30% margem" },
      { label: "Valuation Estimado", value: "R$ 80M", change: "2028" },
      { label: "TIR Projetada", value: "28%", change: "em 5 anos" },
    ],
    chartTitle: "Projeção de Receita Operacional (R$ milhões)",
    items: [
      { year: "2025", revenue: 7.2, growth: null },
      { year: "2026", revenue: 12.5, growth: 74 },
      { year: "2027", revenue: 18.0, growth: 44 },
      { year: "2028", revenue: 28.0, growth: 56 },
      { year: "2030", revenue: 45.0, growth: 61 },
    ],
    assumptionsTitle: "Premissas do Cenário Base",
    assumptions: [
      "Venda média de 4-6 atletas por ano ao mercado profissional",
      "Manutenção de 15% dos direitos econômicos em vendas secundárias",
      "Progressão nas divisões estaduais com aumento de cotas de TV",
      "Crescimento de 15% a.a. em receitas de patrocínio",
    ],
  },
  scenarios: {
    conservative: {
      label: "Conservador",
      annualRevenue: 2_400_000,
      projectValuation: 12_000_000,
      sportsExpansion: "Consolidação operacional, manutenção competitiva e evolução gradual da base.",
      summary:
        "Prioriza disciplina financeira e expansão mais seletiva, com crescimento sustentado por receitas recorrentes e primeiras movimentações de atletas.",
      highlights: [
        "Estrutura operacional estabilizada",
        "Maior previsibilidade de caixa",
        "Crescimento esportivo com menor risco",
      ],
    },
    moderate: {
      label: "Moderado",
      annualRevenue: 4_800_000,
      projectValuation: 22_000_000,
      sportsExpansion: "Ampliação da base, maior presença competitiva e aceleração comercial regional.",
      summary:
        "Reflete execução equilibrada entre performance esportiva, fortalecimento da marca e monetização progressiva de ativos formados.",
      highlights: [
        "Escala comercial mais robusta",
        "Pipeline recorrente de atletas",
        "Projeto mais atrativo para novos parceiros",
      ],
    },
    aggressive: {
      label: "Agressivo",
      annualRevenue: 8_500_000,
      projectValuation: 38_000_000,
      sportsExpansion: "Expansão esportiva acelerada, aumento de exposição nacional e maior liquidez dos ativos.",
      summary:
        "Considera ganho esportivo acima da base, ativação comercial intensa e capturas relevantes em transferências e valorização institucional.",
      highlights: [
        "Salto mais rápido de valuation",
        "Exposição competitiva ampliada",
        "Maior potencial de retorno sobre a plataforma",
      ],
    },
  },
  investmentThesis: {
    eyebrow: "Tese de Investimento",
    title: "Um clube formador com ativos esportivos escaláveis",
    description:
      "O Galo Maringá pode gerar valor combinando formação de talentos, disciplina de gestão e fortalecimento institucional. A operação nasce com visão de longo prazo, base de ativos esportivos e potencial concreto de expansão regional.",
    pillars: [
      {
        title: "Clube formador como tese central",
        description:
          "O principal ativo do projeto está na identificação, desenvolvimento e valorização de atletas com potencial de mercado.",
      },
      {
        title: "Receita com upside esportivo e financeiro",
        description:
          "O crescimento não depende de uma única frente: a plataforma combina receitas recorrentes com capturas extraordinárias em transferências.",
      },
      {
        title: "Marca regional com espaço de expansão",
        description:
          "O fortalecimento institucional do Galo Maringá amplia apelo comercial, alcance territorial e capacidade de atrair parceiros.",
      },
      {
        title: "Governança para construção de longo prazo",
        description:
          "A SAF permite uma estrutura mais profissional para sustentar crescimento, transparência e alinhamento com investidores.",
      },
    ],
    leadershipNote:
      "Sob liderança estratégica de Alex Santos, o projeto conecta visão esportiva, leitura de mercado e credibilidade institucional para transformar talentos em ativos de valor.",
  },
}
