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

export type SiteContent = {
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
  }
  hero: {
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
  about: {
    eyebrow: string
    title: string
    text: string
    leadershipTitle: string
    leadershipText: string
    stats: StatItem[]
    values: FeatureItem[]
  }
  alexSantos: {
    name: string
    photo: string
    photoAlt: string
    description: string
    highlights: string[]
  }
  estrutura: {
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
  base: {
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
  conquistas: {
    eyebrow: string
    title: string
    description: string
    timeline: Array<{
      year: string
      title: string
      description: string
    }>
  }
  saf: {
    eyebrow: string
    title: string
    description: string
    highlights: StatItem[]
    benefits: FeatureItem[]
  }
  business: {
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
  ativos: {
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
  projections: {
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
  roadmap: {
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
  caseStudy: {
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
  investment: {
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
  benefits: {
    eyebrow: string
    title: string
    description: string
    items: FeatureItem[]
  }
  cta: {
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
    contactTitle: string
    contact: {
      addressLines: string[]
      phone: string
      email: string
    }
    copyright: string
    legalLinks: NavLink[]
    riskNote: string
  }
}

export const siteContent: SiteContent = {
  meta: {
    title: "Galo Maringá SAF | Invista no Futuro do Futebol Brasileiro",
    description:
      "Oportunidade de investimento no Galo Maringá - Sociedade Anônima do Futebol. Participe do crescimento de um dos clubes mais promissores do Paraná.",
  },
  header: {
    brand: {
      primary: "GALO",
      highlight: "MARINGÁ",
    },
    navLinks: [
      { label: "Sobre", href: "#sobre" },
      { label: "Estrutura", href: "#estrutura" },
      { label: "Base", href: "#base" },
      { label: "SAF", href: "#saf" },
      { label: "Financeiro", href: "#financeiro" },
      { label: "Investimento", href: "#investimento" },
    ],
    cta: "Quero Investir",
    mobileMenuAriaLabel: "Alternar menu",
  },
  hero: {
    badge: "Sociedade Anônima do Futebol",
    title: "Formando Talentos,",
    titleHighlight: "Construindo Valor",
    subtitle:
      "O Galo Maringá é um projeto estruturado de formação de atletas com gestão profissional e visão de longo prazo. Uma oportunidade de investimento no mercado de desenvolvimento de talentos do futebol brasileiro.",
    primaryCta: "Conheça o Projeto",
    secondaryCta: "Oportunidade de Investimento",
    backgroundImage: "/images/hero-stadium.jpg",
    backgroundAlt: "Estádio Willie Davids - Galo Maringá",
    scrollAriaLabel: "Rolar para baixo",
  },
  about: {
    eyebrow: "Institucional",
    title: "Um Projeto com Visão de Longo Prazo",
    text:
      "O Galo Maringá nasceu com o propósito de desenvolver talentos e construir uma operação sustentável no futebol brasileiro. Sob a liderança de Alex Santos — ex-atleta profissional com passagem pela seleção japonesa e carreira internacional — o clube estruturou um modelo focado na formação de atletas como principal ativo de geração de valor.",
    leadershipTitle: "Liderança com Experiência Internacional",
    leadershipText:
      "Alex Santos traz para o projeto sua vivência no futebol de alto nível, combinando conhecimento técnico com visão de negócio. Sua experiência internacional é fundamental para a identificação de oportunidades e o desenvolvimento da operação.",
    stats: [
      { value: "2010", label: "Fundação" },
      { value: "15", label: "Anos de Operação" },
      { value: "140+", label: "Atletas em Formação" },
      { value: "35", label: "Atletas Profissionalizados" },
    ],
    values: [
      {
        title: "Missão",
        description:
          "Desenvolver atletas de alto rendimento com metodologia profissional, gerando valor esportivo e financeiro sustentável.",
      },
      {
        title: "Visão",
        description:
          "Consolidar-se como referência nacional em formação de talentos, com operação rentável e crescimento estruturado até 2030.",
      },
      {
        title: "Diferencial",
        description:
          "Gestão liderada por Alex Santos, ex-jogador da seleção japonesa, com experiência internacional e visão estratégica do mercado.",
      },
    ],
  },
  alexSantos: {
    name: "Alex Santos",
    photo: "/placeholder-user.jpg",
    photoAlt: "Retrato de Alex Santos",
    description:
      "Ex-atleta profissional com passagem pela seleção japonesa e carreira internacional, hoje à frente da estruturação esportiva e estratégica do projeto.",
    highlights: [
      "Experiência internacional em futebol de alto nível",
      "Visão de negócio aplicada à formação de atletas",
      "Liderança no desenvolvimento da operação",
    ],
  },
  estrutura: {
    eyebrow: "Infraestrutura",
    title: "Ativos Físicos do Clube",
    description:
      "O Galo Maringá conta com infraestrutura própria que suporta a operação de formação de atletas e a disputa de competições oficiais, representando ativos tangíveis do investimento.",
    items: [
      {
        title: "Centro de Treinamento",
        description:
          "Instalações dedicadas ao desenvolvimento de atletas, com campos de treinamento profissionais, academia completa, departamento médico e alojamentos para as categorias de base. Ambiente projetado para maximizar o potencial de formação.",
        image: "/images/training-center.jpg",
        imageAlt: "Centro de treinamento do Galo Maringá",
        features: [
          "3 campos oficiais",
          "Academia de alto rendimento",
          "Departamento médico",
          "Alojamentos para 80 atletas",
        ],
      },
      {
        title: "Estádio Willie Davids",
        description:
          "Casa do Galo Maringá, com capacidade para mais de 20.000 espectadores. Estrutura completa para realização de partidas oficiais e eventos, localizado em área privilegiada da cidade de Maringá.",
        image: "/images/willie-davids.jpg",
        imageAlt: "Estádio Willie Davids",
        features: [
          "Capacidade: 20.000",
          "Iluminação profissional",
          "Estrutura completa de mídia",
          "Localização central",
        ],
      },
    ],
  },
  base: {
    eyebrow: "Principal Ativo",
    title: "Centro de Formação de Atletas",
    description:
      "A formação de atletas é o núcleo do modelo de negócio do Galo Maringá. Com metodologia própria e estrutura dedicada, desenvolvemos jogadores com potencial de valorização e negociação no mercado nacional e internacional.",
    stats: [
      { value: "143", label: "Atletas em Formação" },
      { value: "35", label: "Profissionalizados" },
      { value: "R$ 12M", label: "Valor Gerado em Vendas" },
      { value: "8", label: "Atletas na Série A" },
    ],
    image: "/images/youth-academy.jpg",
    imageAlt: "Centro de Formação - Galo Maringá",
    imageCaption:
      "O Centro de Formação conta com estrutura dedicada para o desenvolvimento de atletas em todas as categorias, com profissionais especializados em preparação física, análise de desempenho e suporte psicológico.",
    categoriesTitle: "Estrutura por Categoria",
    categories: [
      { name: "Sub-11", players: 25, focus: "Fundamentos técnicos" },
      { name: "Sub-13", players: 28, focus: "Desenvolvimento tático" },
      { name: "Sub-15", players: 30, focus: "Competição e maturação" },
      { name: "Sub-17", players: 32, focus: "Preparação profissional" },
      { name: "Sub-20", players: 28, focus: "Transição ao profissional" },
    ],
    playersLabel: "atletas",
    methodologyTitle: "Metodologia de Desenvolvimento",
    methodology: [
      {
        title: "Captação Estruturada",
        description:
          "Scouting regional com avaliações técnicas e físicas padronizadas para identificação de talentos.",
      },
      {
        title: "Formação Integral",
        description:
          "Desenvolvimento técnico, tático e comportamental com acompanhamento escolar obrigatório.",
      },
      {
        title: "Valorização de Ativos",
        description:
          "Gestão de carreira e direitos econômicos com foco na maximização do retorno por atleta.",
      },
    ],
  },
  conquistas: {
    eyebrow: "Histórico",
    title: "Trajetória do Clube",
    description:
      "Em 15 anos de história, o Galo Maringá construiu uma trajetória consistente de crescimento, conquistando espaço no cenário estadual e se preparando para os desafios nacionais.",
    timeline: [
      { year: "2010", title: "Fundação", description: "Constituição do Galo Maringá Futebol Clube" },
      { year: "2012", title: "Início Competitivo", description: "Primeira participação no Campeonato Paranaense" },
      { year: "2015", title: "Ascensão", description: "Conquista do acesso à segunda divisão estadual" },
      { year: "2018", title: "Primeiro Título", description: "Campeão da Série B do Paranaense" },
      { year: "2020", title: "Elite Estadual", description: "Estabelecimento na Série A do Paranaense" },
      { year: "2022", title: "Projeção Nacional", description: "Primeira participação na Copa do Brasil" },
      { year: "2024", title: "Profissionalização", description: "Início do processo de constituição da SAF" },
      { year: "2025", title: "Nova Fase", description: "Abertura para investidores e estruturação corporativa" },
    ],
  },
  saf: {
    eyebrow: "Marco Regulatório",
    title: "Sociedade Anônima do Futebol",
    description:
      "A Lei 14.193/2021 criou um novo modelo de organização para clubes de futebol no Brasil, permitindo a constituição de Sociedades Anônimas do Futebol (SAFs). Este marco regulatório traz segurança jurídica e governança corporativa para o setor, viabilizando investimentos estruturados e gestão profissional.",
    highlights: [
      { value: "Lei 14.193", label: "Sancionada em agosto de 2021" },
      { value: "30+", label: "Clubes já convertidos em SAF" },
      { value: "R$ 8Bi+", label: "Capital investido no modelo" },
    ],
    benefits: [
      {
        title: "Segurança Jurídica",
        description: "Estrutura legal robusta com governança corporativa e processos auditados.",
      },
      {
        title: "Regime Tributário Diferenciado",
        description: "Benefícios fiscais específicos para SAFs com alíquotas reduzidas nos primeiros anos.",
      },
      {
        title: "Captação Regulamentada",
        description: "Modelo que permite investimentos nacionais e internacionais de forma estruturada.",
      },
      {
        title: "Gestão Empresarial",
        description: "Administração profissional com foco em resultados e sustentabilidade de longo prazo.",
      },
      {
        title: "Transparência Obrigatória",
        description: "Auditoria independente e publicação de demonstrações financeiras anuais.",
      },
      {
        title: "Direitos Societários",
        description: "Participação efetiva como acionista com direito a voto e dividendos.",
      },
    ],
  },
  business: {
    eyebrow: "Estratégia Financeira",
    title: "Modelo de Negócio",
    description:
      "O Galo Maringá opera com um modelo centrado na geração de ativos através da formação de atletas, complementado por receitas recorrentes que garantem a sustentabilidade operacional.",
    core: {
      title: "Foco Principal: Desenvolvimento e Venda de Atletas",
      description:
        "Diferente de modelos tradicionais que dependem de bilheteria e patrocínios, o Galo Maringá prioriza a criação de valor através da formação de talentos. Cada atleta desenvolvido representa um ativo com potencial de valorização e liquidez no mercado de transferências.",
      metrics: [
        { value: "R$ 350K", label: "Custo médio por atleta/ano" },
        { value: "R$ 2.5M", label: "Valor médio de venda" },
        { value: "7x", label: "Múltiplo de retorno" },
      ],
    },
    items: [
      {
        title: "Negociação de Atletas",
        percentage: 45,
        description: "Principal fonte de receita: venda de direitos econômicos de jogadores formados na base.",
        highlight: "R$ 3.2M/ano",
        isCore: true,
      },
      {
        title: "Direitos de Transmissão",
        percentage: 25,
        description: "Cotas de TV e streaming das competições estaduais e nacionais.",
        highlight: "R$ 1.8M/ano",
        isCore: false,
      },
      {
        title: "Patrocínios e Parcerias",
        percentage: 18,
        description: "Acordos comerciais com empresas regionais e nacionais.",
        highlight: "R$ 1.3M/ano",
        isCore: false,
      },
      {
        title: "Receitas de Matchday",
        percentage: 12,
        description: "Bilheteria, consumo e experiências em dias de jogos oficiais.",
        highlight: "R$ 0.9M/ano",
        isCore: false,
      },
    ],
    annualRevenueLabel: "Receita Operacional Anual (2025)",
    annualRevenueValue: "R$ 7.2 Milhões",
    annualRevenueDescription:
      "Com potencial de escala através do aumento na capacidade de formação e valorização de ativos",
  },
  ativos: {
    eyebrow: "Portfólio de Atletas",
    title: "Ativos com Direitos Retidos",
    description:
      "Atletas formados no Galo Maringá que hoje atuam em clubes de expressão nacional, gerando receita através de mecanismos de solidariedade e percentuais econômicos retidos.",
    totals: [
      { value: "R$ 33.5M", label: "Valor de mercado agregado" },
      { value: "8", label: "Atletas em clubes Série A/B" },
      { value: "15%", label: "Média de direitos retidos" },
      { value: "R$ 5M", label: "Valor patrimonial estimado" },
    ],
    athletes: [
      { name: "Lucas Mendes", position: "Atacante", currentClub: "Athletico-PR", age: 22, value: "R$ 8M", retained: "15%" },
      { name: "Gabriel Santos", position: "Meia", currentClub: "Coritiba", age: 21, value: "R$ 5M", retained: "12%" },
      { name: "Pedro Henrique", position: "Zagueiro", currentClub: "Internacional", age: 23, value: "R$ 6M", retained: "10%" },
      { name: "Rafael Costa", position: "Lateral", currentClub: "Grêmio", age: 20, value: "R$ 4M", retained: "18%" },
      { name: "Bruno Silva", position: "Volante", currentClub: "Bahia", age: 22, value: "R$ 3.5M", retained: "15%" },
      { name: "Thiago Oliveira", position: "Atacante", currentClub: "Vasco", age: 19, value: "R$ 7M", retained: "20%" },
    ],
    marketValueLabel: "Valor de mercado",
    ageSuffix: "anos",
    retainedSuffix: "retido",
    note:
      "Valores de mercado baseados em plataformas especializadas. Percentuais de direitos econômicos conforme contratos vigentes.",
  },
  projections: {
    eyebrow: "Perspectivas Financeiras",
    title: "Projeções de Crescimento",
    description:
      "Cenário base de crescimento fundamentado em premissas conservadoras e alinhado com o histórico de desempenho operacional do clube.",
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
  roadmap: {
    eyebrow: "Planejamento Estratégico",
    title: "Plano de Crescimento 2025-2035",
    description:
      "Roadmap estruturado em três fases com metas claras de desenvolvimento operacional, esportivo e financeiro para os próximos dez anos.",
    phases: [
      {
        period: "2025 - 2027",
        title: "Consolidação",
        goals: [
          "Estruturação completa da SAF e governança",
          "Ampliação da capacidade para 200 atletas em formação",
          "Consolidação na Série A do Paranaense",
          "Investimento de R$ 5M no Centro de Treinamento",
          "Meta de receita: R$ 18M/ano",
        ],
      },
      {
        period: "2028 - 2030",
        title: "Expansão",
        goals: [
          "Acesso à Série D do Campeonato Brasileiro",
          "Parcerias internacionais para desenvolvimento de atletas",
          "Construção de Centro de Formação de Excelência",
          "Programa de captação internacional de talentos",
          "Meta de receita: R$ 45M/ano",
        ],
      },
      {
        period: "2031 - 2035",
        title: "Maturidade",
        goals: [
          "Estabelecimento nas Séries C/B do Brasileirão",
          "Posicionamento como referência nacional em formação",
          "Pipeline contínuo de exportação de talentos",
          "Valuation projetado: R$ 200M",
          "Meta de receita: R$ 80M/ano",
        ],
      },
    ],
    note:
      "Roadmap sujeito a ajustes conforme evolução do mercado e oportunidades identificadas pela gestão.",
  },
  caseStudy: {
    eyebrow: "Referência de Mercado",
    title: "Case RB Bragantino",
    description:
      "O modelo SAF do Red Bull Bragantino demonstra como investimento estruturado e gestão profissional podem transformar um clube de divisões inferiores em uma operação de alto valor.",
    analysisTitle: "Análise do Caso",
    analysisParagraphs: [
      "Em 2019, o grupo Red Bull adquiriu o Bragantino, então na Série B do Campeonato Brasileiro. Com investimento em infraestrutura de formação, contratações estratégicas e implementação de processos de gestão profissional, o clube alcançou resultados expressivos.",
      "O modelo combina desenvolvimento intensivo de talentos da base com gestão financeira disciplinada, resultando em valorização patrimonial significativa e sustentabilidade operacional.",
    ],
    stats: [
      { label: "Investimento Inicial", value: "R$ 45M", year: "2019" },
      { label: "Valuation Atual", value: "R$ 1.2Bi", year: "2024" },
      { label: "Divisão", value: "Série A", year: "Em 3 anos" },
      { label: "Base de Fãs", value: "2M+", year: "Crescimento 13x" },
    ],
    resultsTitle: "Resultados em 5 Anos",
    results: [
      "Acesso à Série A em apenas um ano de operação",
      "Classificação para a Libertadores em 2021",
      "Investimento de R$ 200M em infraestrutura",
      "Pipeline de exportação de atletas para Europa",
      "Multiplicação de 26x no valuation",
      "Operação sustentável e lucrativa",
    ],
    comparisonLabel: "Oportunidade análoga:",
    comparisonText:
      "O Galo Maringá apresenta condições estruturais semelhantes — base sólida de formação, infraestrutura própria e mercado em expansão — com potencial de valorização expressivo no médio prazo.",
  },
  investment: {
    eyebrow: "Oportunidade",
    title: "Estrutura de Investimento",
    description:
      "A rodada atual oferece participação societária na Galo Maringá SAF com diferentes níveis de envolvimento e benefícios para cada perfil de investidor.",
    highlights: [
      { value: "30%", label: "Disponível nesta rodada" },
      { value: "R$ 10M", label: "Valuation pré-money" },
      { value: "R$ 3M", label: "Meta da rodada" },
      { value: "5 anos", label: "Horizonte sugerido" },
    ],
    tiers: [
      {
        name: "Investidor",
        investment: "R$ 50.000",
        equity: "0.5%",
        highlight: false,
        benefits: [
          "Participação societária na SAF",
          "Relatórios financeiros trimestrais",
          "Acesso a eventos exclusivos de investidores",
          "Comunicação direta com a gestão",
        ],
      },
      {
        name: "Investidor Estratégico",
        investment: "R$ 150.000",
        equity: "1.5%",
        highlight: true,
        benefits: [
          "Participação societária na SAF",
          "Assento no Conselho Consultivo",
          "Relatórios financeiros mensais detalhados",
          "Participação em reuniões estratégicas",
          "Acesso VIP em todas as partidas",
          "Reconhecimento no memorial do clube",
        ],
      },
      {
        name: "Investidor Fundador",
        investment: "R$ 500.000",
        equity: "5%",
        highlight: false,
        benefits: [
          "Participação societária na SAF",
          "Assento no Conselho Deliberativo",
          "Participação em decisões estratégicas",
          "Prioridade em futuras rodadas de investimento",
          "Acesso completo às operações do clube",
          "Todos os benefícios anteriores",
        ],
      },
    ],
    featuredTierLabel: "Mais Procurado",
    equitySuffix: "de participação",
    disclaimer:
      "Investimento sujeito a riscos. Recomenda-se análise detalhada do material informativo e due diligence antes da tomada de decisão.",
  },
  benefits: {
    eyebrow: "Relacionamento",
    title: "Benefícios para Investidores",
    description:
      "Além do potencial de retorno financeiro, investidores do Galo Maringá SAF têm acesso a um programa estruturado de relacionamento e benefícios exclusivos.",
    items: [
      {
        title: "Relatórios Detalhados",
        description: "Acesso a informações financeiras e operacionais com frequência trimestral ou mensal.",
      },
      {
        title: "Eventos de Investidores",
        description: "Participação em encontros exclusivos para apresentação de resultados e networking.",
      },
      {
        title: "Governança Transparente",
        description: "Acesso aos processos de governança e participação conforme nível de investimento.",
      },
      {
        title: "Prioridade em Rodadas",
        description: "Direito de preferência em futuras captações e oportunidades de co-investimento.",
      },
      {
        title: "Acesso VIP",
        description: "Ingressos preferenciais e acesso a áreas exclusivas em dias de jogos oficiais.",
      },
      {
        title: "Comunicação Direta",
        description: "Canal direto com a gestão para acompanhamento do investimento.",
      },
      {
        title: "Reconhecimento",
        description: "Inclusão em materiais institucionais e memorial do clube conforme categoria.",
      },
      {
        title: "Experiências Exclusivas",
        description: "Acesso a bastidores, treinos e eventos especiais do clube.",
      },
    ],
  },
  cta: {
    eyebrow: "Próximo Passo",
    title: "Solicite o Material Completo",
    description:
      "Preencha o formulário para receber o memorando de investimento com informações detalhadas sobre a oportunidade e agendar uma conversa com nossa equipe de relações com investidores.",
    successTitle: "Solicitação Recebida",
    successText:
      "Nossa equipe de relações com investidores entrará em contato em até 48 horas úteis.",
    successSubtext: "Você receberá o memorando de investimento no e-mail informado.",
    form: {
      nameLabel: "Nome Completo",
      namePlaceholder: "Seu nome",
      emailLabel: "E-mail Corporativo",
      emailPlaceholder: "seu@email.com",
      phoneLabel: "Telefone",
      phonePlaceholder: "(00) 00000-0000",
      investmentLabel: "Faixa de Investimento Pretendida",
      investmentPlaceholder: "Selecione...",
      investmentOptions: [
        { value: "50k", label: "R$ 50.000 - R$ 100.000" },
        { value: "150k", label: "R$ 100.000 - R$ 300.000" },
        { value: "500k", label: "R$ 300.000 - R$ 500.000" },
        { value: "1m", label: "Acima de R$ 500.000" },
      ],
      submitLabel: "Solicitar Material",
      meetingLabel: "Agendar Reunião",
      privacyNote:
        "Suas informações são confidenciais e utilizadas exclusivamente para o processo de relacionamento com investidores.",
    },
  },
  footer: {
    brandDescription: "Sociedade Anônima do Futebol",
    tagline: "Formando talentos, construindo valor.",
    socialLinks: [
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
    quickLinksTitle: "Navegação",
    quickLinks: [
      { label: "Institucional", href: "#sobre" },
      { label: "Infraestrutura", href: "#estrutura" },
      { label: "Formação", href: "#base" },
      { label: "Oportunidade", href: "#investimento" },
    ],
    investorsTitle: "Investidores",
    investorLinks: [
      { label: "Marco Regulatório SAF", href: "#saf" },
      { label: "Modelo de Negócio", href: "#modelo" },
      { label: "Projeções Financeiras", href: "#projecoes" },
      { label: "Relações com Investidores", href: "#contato" },
    ],
    contactTitle: "Contato",
    contact: {
      addressLines: ["Estádio Willie Davids", "Maringá - PR, Brasil"],
      phone: "(44) 99999-9999",
      email: "ri@galomaringa.com.br",
    },
    copyright: "© 2025 Galo Maringá SAF. Todos os direitos reservados.",
    legalLinks: [
      { label: "Política de Privacidade", href: "#" },
      { label: "Termos de Uso", href: "#" },
    ],
    riskNote: "Investimento em SAF envolve riscos. Leia o material informativo antes de investir.",
  },
}
