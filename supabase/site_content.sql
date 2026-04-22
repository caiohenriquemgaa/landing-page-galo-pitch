create extension if not exists pgcrypto;

create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value_json jsonb not null default '{}'::jsonb,
  is_published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_site_content_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists trg_site_content_updated_at on public.site_content;
create trigger trg_site_content_updated_at
before update on public.site_content
for each row
execute function public.set_site_content_updated_at();

alter table public.site_content enable row level security;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-assets', 'site-assets', true, 5242880, array['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'])
on conflict (id) do nothing;

drop policy if exists "Public can read published site content" on public.site_content;
create policy "Public can read published site content"
on public.site_content
for select
to anon, authenticated
using (is_published = true or auth.role() = 'authenticated');

drop policy if exists "Authenticated users can insert site content" on public.site_content;
create policy "Authenticated users can insert site content"
on public.site_content
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated users can update site content" on public.site_content;
create policy "Authenticated users can update site content"
on public.site_content
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Public can read site asset objects" on storage.objects;
create policy "Public can read site asset objects"
on storage.objects
for select
to public
using (bucket_id = 'site-assets');

drop policy if exists "Authenticated users can upload site asset objects" on storage.objects;
create policy "Authenticated users can upload site asset objects"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'site-assets');

drop policy if exists "Authenticated users can update site asset objects" on storage.objects;
create policy "Authenticated users can update site asset objects"
on storage.objects
for update
to authenticated
using (bucket_id = 'site-assets')
with check (bucket_id = 'site-assets');

drop policy if exists "Authenticated users can delete site asset objects" on storage.objects;
create policy "Authenticated users can delete site asset objects"
on storage.objects
for delete
to authenticated
using (bucket_id = 'site-assets');

insert into public.site_content (key, value_json, is_published)
values
  (
    'site_settings',
    '{
      "meta": {
        "title": "Galo Maringá SAF | Invista no futuro da formação de talentos",
        "description": "Landing page institucional do Galo Maringá SAF para investidores, com foco em formação de atletas, governança SAF e potencial de valorização."
      },
      "header": {
        "brand": { "primary": "GALO", "highlight": "MARINGÁ" },
        "navLinks": [
          { "label": "Sobre", "href": "#sobre" },
          { "label": "Estrutura", "href": "#estrutura" },
          { "label": "Base", "href": "#base" },
          { "label": "SAF", "href": "#saf" },
          { "label": "Financeiro", "href": "#financeiro" },
          { "label": "Investimento", "href": "#investimento" }
        ],
        "cta": "Quero Investir",
        "mobileMenuAriaLabel": "Alternar menu",
        "printButtonLabel": "Baixar PDF"
      },
      "footer": {
        "brandDescription": "Projeto institucional voltado à formação de atletas, geração de ativos esportivos e construção de valor de longo prazo.",
        "tagline": "Uma plataforma SAF com visão de longo prazo para investidores que buscam exposição a um clube formador.",
        "socialLinks": [
          { "label": "Instagram", "href": "https://instagram.com/galomaringa" },
          { "label": "LinkedIn", "href": "https://linkedin.com/company/galo-maringa" }
        ],
        "quickLinksTitle": "Seções",
        "quickLinks": [
          { "label": "Sobre", "href": "#sobre" },
          { "label": "Modelo Financeiro", "href": "#financeiro" },
          { "label": "Oferta", "href": "#investimento" }
        ],
        "investorsTitle": "Investidores",
        "investorLinks": [
          { "label": "Estrutura SAF", "href": "#saf" },
          { "label": "Ativos esportivos", "href": "#ativos" },
          { "label": "Versão para impressão", "href": "/print" }
        ],
        "copyright": "© 2026 Galo Maringá SAF. Todos os direitos reservados.",
        "legalLinks": [
          { "label": "Privacidade", "href": "#" },
          { "label": "Termos", "href": "#" }
        ],
        "riskNote": "Material informativo para fins de apresentação institucional. Informações sujeitas a atualização conforme evolução do projeto."
      }
    }'::jsonb,
    true
  ),
  (
    'hero',
    '{
      "badge": "Sociedade Anônima do Futebol",
      "title": "Formando talentos,",
      "titleHighlight": "construindo valor",
      "subtitle": "O Galo Maringá estrutura uma plataforma de formação de atletas com visão de longo prazo, governança SAF e potencial de valorização esportiva e financeira.",
      "primaryCta": "Conheça o projeto",
      "secondaryCta": "Oportunidade de investimento",
      "backgroundImage": "/images/hero-stadium.jpg",
      "backgroundAlt": "Estádio Willie Davids - Galo Maringá",
      "scrollAriaLabel": "Rolar para baixo"
    }'::jsonb,
    true
  ),
  (
    'about_club',
    '{
      "eyebrow": "Institucional",
      "title": "Um projeto de clube formador com visão de longo prazo",
      "text": "O Galo Maringá nasce como uma operação esportiva e institucional voltada à formação, desenvolvimento e valorização de talentos. A proposta combina método, governança e estratégia para construir um ativo esportivo sustentável e escalável.",
      "stats": [
        { "value": "2010", "label": "Fundação" },
        { "value": "15", "label": "Anos de operação" },
        { "value": "140+", "label": "Atletas em formação" },
        { "value": "35", "label": "Atletas profissionalizados" }
      ]
    }'::jsonb,
    true
  ),
  (
    'club_identity',
    '{
      "title": "Identidade do clube",
      "description": "Pilares que orientam a tese do projeto.",
      "items": [
        {
          "title": "Missão",
          "description": "Desenvolver atletas de alto rendimento com metodologia profissional e geração sustentável de valor."
        },
        {
          "title": "Visão",
          "description": "Consolidar o Galo Maringá como referência nacional em clube formador com governança e capacidade de expansão."
        },
        {
          "title": "Diferencial",
          "description": "Gestão conectada ao campo e ao mercado, com liderança experiente e foco em ativos esportivos."
        }
      ]
    }'::jsonb,
    true
  ),
  (
    'alex_santos',
    '{
      "name": "Alex Santos",
      "role": "Liderança estratégica e desenvolvimento esportivo",
      "photo": "/placeholder-user.jpg",
      "photoAlt": "Retrato de Alex Santos",
      "leadershipTitle": "Liderança com experiência internacional",
      "leadershipText": "Alex Santos representa a credibilidade esportiva do projeto e atua como figura central na leitura de mercado, formação de talentos e construção da identidade competitiva do clube.",
      "description": "Ex-atleta profissional com carreira internacional e passagem pela seleção japonesa, Alex Santos lidera a estruturação esportiva e estratégica do Galo Maringá.",
      "highlights": [
        "Experiência internacional em ambiente de alto rendimento",
        "Leitura de mercado aplicada à valorização de atletas",
        "Capacidade de conectar visão esportiva e posicionamento institucional"
      ]
    }'::jsonb,
    true
  ),
  (
    'structure',
    '{
      "eyebrow": "Infraestrutura",
      "title": "Ativos físicos que sustentam a operação",
      "description": "A estrutura do clube suporta formação, competição e expansão institucional, funcionando como base tangível da tese de investimento.",
      "items": [
        {
          "title": "Centro de treinamento",
          "description": "Estrutura dedicada ao desenvolvimento técnico, físico e comportamental de atletas, com ambiente pensado para ganho de performance e consistência metodológica.",
          "image": "/images/training-center.jpg",
          "imageAlt": "Centro de treinamento do Galo Maringá",
          "features": ["3 campos oficiais", "Academia de alto rendimento", "Departamento médico", "Alojamentos para 80 atletas"]
        },
        {
          "title": "Estádio Willie Davids",
          "description": "Ativo importante para exposição esportiva, matchday e conexão institucional com a cidade de Maringá e a região.",
          "image": "/images/willie-davids.jpg",
          "imageAlt": "Estádio Willie Davids",
          "features": ["Capacidade para 20 mil pessoas", "Estrutura de mídia", "Localização central", "Ambiente para ativações comerciais"]
        }
      ]
    }'::jsonb,
    true
  ),
  (
    'youth_development',
    '{
      "eyebrow": "Principal ativo",
      "title": "Centro de formação de atletas",
      "description": "A base é o centro da tese do Galo Maringá. É onde o projeto transforma investimento em desenvolvimento, exposição e ativos esportivos com potencial de valorização.",
      "stats": [
        { "value": "143", "label": "Atletas em formação" },
        { "value": "35", "label": "Profissionalizados" },
        { "value": "R$ 12M", "label": "Valor gerado em vendas" },
        { "value": "8", "label": "Atletas na Série A" }
      ],
      "image": "/images/youth-academy.jpg",
      "imageAlt": "Centro de formação do Galo Maringá",
      "imageCaption": "A operação de base integra captação, metodologia, acompanhamento multidisciplinar e preparação para mercado.",
      "categoriesTitle": "Estrutura por categoria",
      "categories": [
        { "name": "Sub-11", "players": 25, "focus": "Fundamentos técnicos" },
        { "name": "Sub-13", "players": 28, "focus": "Desenvolvimento tático" },
        { "name": "Sub-15", "players": 30, "focus": "Competição e maturação" },
        { "name": "Sub-17", "players": 32, "focus": "Preparação profissional" },
        { "name": "Sub-20", "players": 28, "focus": "Transição ao profissional" }
      ],
      "playersLabel": "atletas",
      "methodologyTitle": "Metodologia de desenvolvimento",
      "methodology": [
        { "title": "Captação estruturada", "description": "Processo de scouting e avaliação para identificar talentos com aderência ao projeto." },
        { "title": "Formação integral", "description": "Desenvolvimento técnico, tático, físico e comportamental com acompanhamento contínuo." },
        { "title": "Valorização de ativos", "description": "Gestão de carreira e retenção de valor com foco em monetização sustentável." }
      ]
    }'::jsonb,
    true
  ),
  (
    'achievements_timeline',
    '{
      "eyebrow": "Histórico",
      "title": "Trajetória de construção institucional",
      "description": "O Galo Maringá construiu um histórico de evolução que sustenta a nova fase de profissionalização e captação.",
      "timeline": [
        { "year": "2010", "title": "Fundação", "description": "Nascimento do Galo Maringá Futebol Clube." },
        { "year": "2018", "title": "Título estadual", "description": "Conquista relevante para afirmação competitiva do projeto." },
        { "year": "2022", "title": "Projeção nacional", "description": "Maior visibilidade esportiva e institucional em competições." },
        { "year": "2025", "title": "Nova fase SAF", "description": "Estruturação para investidores e fortalecimento da governança." }
      ]
    }'::jsonb,
    true
  ),
  (
    'saf_opportunity',
    '{
      "eyebrow": "Marco regulatório",
      "title": "Uma operação alinhada ao modelo SAF",
      "description": "A estrutura SAF amplia segurança jurídica, disciplina de governança e capacidade de captação para crescimento do clube.",
      "highlights": [
        { "value": "Lei 14.193", "label": "Base legal da SAF" },
        { "value": "30+", "label": "Clubes convertidos" },
        { "value": "R$ 8Bi+", "label": "Capital no modelo" }
      ],
      "benefits": [
        { "title": "Segurança jurídica", "description": "Estrutura regulatória mais clara para investimento e governança." },
        { "title": "Gestão empresarial", "description": "Processos e metas alinhados à lógica corporativa." },
        { "title": "Captação estruturada", "description": "Ambiente mais profissional para relacionamento com investidores." },
        { "title": "Transparência", "description": "Maior disciplina de prestação de contas e governança." },
        { "title": "Escalabilidade", "description": "Base institucional para crescimento de receita e ativos." },
        { "title": "Alinhamento societário", "description": "Participação conectada ao desenvolvimento de valor do projeto." }
      ]
    }'::jsonb,
    true
  ),
  (
    'business_model',
    '{
      "eyebrow": "Estratégia financeira",
      "title": "Modelo de negócio",
      "description": "O clube combina formação de atletas como eixo central de valor com receitas recorrentes que sustentam a operação e ampliam o potencial de crescimento.",
      "core": {
        "title": "Foco principal: desenvolvimento e venda de atletas",
        "description": "A principal alavanca de valor do projeto está em formar talentos, gerar exposição competitiva e capturar liquidez em transferências e retenções futuras.",
        "metrics": [
          { "value": "R$ 350K", "label": "Custo médio por atleta/ano" },
          { "value": "R$ 2.5M", "label": "Valor médio de venda" },
          { "value": "7x", "label": "Múltiplo de retorno" }
        ]
      },
      "items": [
        { "title": "Negociação de atletas", "percentage": 45, "description": "Motor principal de valor e upside financeiro.", "highlight": "R$ 3.2M/ano", "isCore": true },
        { "title": "Direitos de transmissão", "percentage": 25, "description": "Receita ligada à exposição competitiva.", "highlight": "R$ 1.8M/ano", "isCore": false },
        { "title": "Patrocínios e parcerias", "percentage": 18, "description": "Acordos comerciais regionais e institucionais.", "highlight": "R$ 1.3M/ano", "isCore": false },
        { "title": "Receitas de matchday", "percentage": 12, "description": "Bilheteria, consumo e experiências em dias de jogo.", "highlight": "R$ 0.9M/ano", "isCore": false }
      ],
      "annualRevenueLabel": "Receita operacional anual (2025)",
      "annualRevenueValue": "R$ 7.2 Milhões",
      "annualRevenueDescription": "Potencial de escala com maior capacidade de formação, competitividade e monetização da marca."
    }'::jsonb,
    true
  ),
  (
    'athlete_assets',
    '{
      "eyebrow": "Portfólio de atletas",
      "title": "Ativos esportivos com valor retido",
      "description": "Atletas formados pelo Galo Maringá representam uma base concreta de geração de valor, com potencial de receitas futuras e fortalecimento da marca formadora.",
      "totals": [
        { "value": "R$ 33.5M", "label": "Valor de mercado agregado" },
        { "value": "8", "label": "Atletas em clubes Série A/B" },
        { "value": "15%", "label": "Média de direitos retidos" },
        { "value": "R$ 5M", "label": "Valor patrimonial estimado" }
      ],
      "athletes": [
        { "name": "Lucas Mendes", "position": "Atacante", "currentClub": "Athletico-PR", "age": 22, "value": "R$ 8M", "retained": "15%" },
        { "name": "Gabriel Santos", "position": "Meia", "currentClub": "Coritiba", "age": 21, "value": "R$ 5M", "retained": "12%" },
        { "name": "Pedro Henrique", "position": "Zagueiro", "currentClub": "Internacional", "age": 23, "value": "R$ 6M", "retained": "10%" }
      ],
      "marketValueLabel": "Valor de mercado",
      "ageSuffix": "anos",
      "retainedSuffix": "retido",
      "note": "Valores ilustrativos para apresentação institucional, passíveis de atualização conforme evolução dos atletas e contratos."
    }'::jsonb,
    true
  ),
  (
    'financial_model',
    '{
      "section": {
        "id": "financeiro",
        "eyebrow": "Estrutura Financeira do Projeto",
        "title": "Modelo Financeiro",
        "description": "Leitura executiva do racional econômico do projeto, incluindo receita, necessidade de capital, cenários e tese de valorização."
      },
      "kpis": {
        "projectedRevenue2026": 1000000,
        "approvedCapital2026": 3000000,
        "investmentSharePercent": 1,
        "investmentShareValue": 50000
      },
      "revenueSources": [
        { "name": "Direitos de transmissão", "value": 20, "description": "Cotas ligadas à exposição competitiva." },
        { "name": "Patrocínios e comerciais", "value": 30, "description": "Ativações de marca e parcerias institucionais." },
        { "name": "Matchday", "value": 15, "description": "Receita de bilheteria, hospitalidade e consumo." },
        { "name": "Transferência de atletas", "value": 25, "description": "Venda e retenção de valor em atletas formados." },
        { "name": "Receitas diversas", "value": 10, "description": "Licenciamento, eventos e frentes complementares." }
      ],
      "capitalStructure": {
        "title": "Receita inicial, capital de aceleração e construção de valor",
        "description": "A base projetada de receita mostra monetização inicial. O aporte aprovado acelera execução esportiva, estrutura e capacidade comercial.",
        "longTermValueDriver": "A formação e venda de atletas é o principal motor de valorização de longo prazo do projeto.",
        "notes": [
          "A receita projetada demonstra capacidade operacional inicial.",
          "O capital aprovado acelera infraestrutura, competitividade e ambiente de formação.",
          "O ganho de novas receitas depende de evolução esportiva, fortalecimento de marca e monetização dos ativos."
        ]
      },
      "growthProjection": {
        "eyebrow": "Perspectivas Financeiras",
        "title": "Projeções de Crescimento",
        "description": "Cenário-base de crescimento suportado por expansão da base, fortalecimento comercial e valorização de ativos esportivos.",
        "metrics": [
          { "label": "Receita 2028 (Projetada)", "value": "R$ 28M", "change": "+289%" },
          { "label": "EBITDA Esperado 2028", "value": "R$ 8.4M", "change": "30% margem" },
          { "label": "Valuation Estimado", "value": "R$ 80M", "change": "2028" },
          { "label": "TIR Projetada", "value": "28%", "change": "em 5 anos" }
        ],
        "chartTitle": "Projeção de Receita Operacional (R$ milhões)",
        "items": [
          { "year": "2025", "revenue": 7.2, "growth": null },
          { "year": "2026", "revenue": 12.5, "growth": 74 },
          { "year": "2027", "revenue": 18.0, "growth": 44 },
          { "year": "2028", "revenue": 28.0, "growth": 56 },
          { "year": "2030", "revenue": 45.0, "growth": 61 }
        ],
        "assumptionsTitle": "Premissas do cenário-base",
        "assumptions": [
          "Venda média de 4 a 6 atletas por ano ao mercado profissional",
          "Retenção de participação econômica em vendas secundárias",
          "Evolução competitiva com aumento de exposição institucional",
          "Crescimento progressivo de receitas comerciais"
        ]
      },
      "scenarios": {
        "conservative": {
          "label": "Conservador",
          "annualRevenue": 2400000,
          "projectValuation": 12000000,
          "sportsExpansion": "Consolidação operacional e evolução gradual da base.",
          "summary": "Cenário de crescimento disciplinado com menor risco e monetização progressiva.",
          "highlights": ["Maior previsibilidade de caixa", "Execução mais seletiva", "Crescimento institucional consistente"]
        },
        "moderate": {
          "label": "Moderado",
          "annualRevenue": 4800000,
          "projectValuation": 22000000,
          "sportsExpansion": "Expansão equilibrada entre base, marca e operação competitiva.",
          "summary": "Cenário-base para investidores, combinando performance esportiva e escala comercial.",
          "highlights": ["Pipeline mais recorrente de talentos", "Receita comercial mais robusta", "Projeto mais atrativo a parceiros"]
        },
        "aggressive": {
          "label": "Agressivo",
          "annualRevenue": 8500000,
          "projectValuation": 38000000,
          "sportsExpansion": "Maior exposição nacional, liquidez de ativos e expansão mais acelerada.",
          "summary": "Cenário com ganho esportivo acima da base e valorização institucional mais intensa.",
          "highlights": ["Salto de valuation", "Exposição competitiva ampliada", "Maior captura de upside"]
        }
      },
      "investmentThesis": {
        "eyebrow": "Tese de investimento",
        "title": "Um clube formador com ativos esportivos escaláveis",
        "description": "O Galo Maringá combina formação, disciplina de gestão e fortalecimento institucional para construir valor de longo prazo.",
        "pillars": [
          { "title": "Clube formador como eixo central", "description": "A principal criação de valor vem da formação e valorização de talentos." },
          { "title": "Upside esportivo e financeiro", "description": "A receita combina recorrência operacional com capturas extraordinárias de mercado." },
          { "title": "Marca regional com espaço de expansão", "description": "O projeto pode crescer em alcance comercial, reputação e ativação territorial." },
          { "title": "Governança SAF", "description": "A estrutura societária fortalece transparência, execução e alinhamento com investidores." }
        ],
        "leadershipNote": "Sob liderança estratégica de Alex Santos, o projeto articula visão esportiva, mercado e credibilidade institucional."
      }
    }'::jsonb,
    true
  ),
  (
    'roadmap',
    '{
      "eyebrow": "Planejamento estratégico",
      "title": "Plano de crescimento 2025-2035",
      "description": "Roadmap em fases para consolidar estrutura, escalar formação e ampliar o valor institucional do projeto.",
      "phases": [
        {
          "period": "2025 - 2027",
          "title": "Consolidação",
          "goals": ["Estruturar a SAF", "Ampliar capacidade da base", "Fortalecer a governança", "Criar ambiente para monetização recorrente"]
        },
        {
          "period": "2028 - 2030",
          "title": "Expansão",
          "goals": ["Elevar exposição esportiva", "Firmar novas parcerias", "Expandir valor comercial", "Escalar pipeline de atletas"]
        },
        {
          "period": "2031 - 2035",
          "title": "Maturidade",
          "goals": ["Consolidar o posicionamento formador", "Ampliar a presença nacional", "Aumentar valuation", "Criar ciclo sustentável de ativos"]
        }
      ],
      "note": "Planejamento sujeito a ajustes conforme oportunidades de mercado e desempenho esportivo."
    }'::jsonb,
    true
  ),
  (
    'case_study',
    '{
      "eyebrow": "Referência de mercado",
      "title": "Case RB Bragantino",
      "description": "Exemplo de como investimento estruturado e gestão profissional podem transformar um projeto esportivo em uma operação de valor.",
      "analysisTitle": "Análise do caso",
      "analysisParagraphs": [
        "O exemplo demonstra o efeito de estrutura, governança, visão de longo prazo e inteligência de mercado sobre o desempenho esportivo e patrimonial.",
        "Para o investidor, o aprendizado central está na combinação de disciplina operacional com capacidade de construir ativos esportivos valiosos."
      ],
      "stats": [
        { "label": "Investimento inicial", "value": "R$ 45M", "year": "2019" },
        { "label": "Valuation atual", "value": "R$ 1.2Bi", "year": "2024" },
        { "label": "Divisão", "value": "Série A", "year": "Em 3 anos" },
        { "label": "Base de fãs", "value": "2M+", "year": "Crescimento 13x" }
      ],
      "resultsTitle": "Resultados em 5 anos",
      "results": [
        "Acesso à Série A em curto prazo",
        "Fortalecimento institucional e comercial",
        "Valorização esportiva e patrimonial",
        "Maior relevância nacional"
      ],
      "comparisonLabel": "Leitura para o Galo Maringá:",
      "comparisonText": "com escala e contexto diferentes, o racional de gestão profissional, formação e valorização institucional segue sendo uma referência útil."
    }'::jsonb,
    true
  ),
  (
    'investment_offer',
    '{
      "eyebrow": "Oportunidade",
      "title": "Oferta de investimento",
      "description": "Estrutura pensada para investidores que desejam exposição a um projeto de clube formador com narrativa institucional clara e potencial de valorização.",
      "highlights": [
        { "value": "1%", "label": "Cota inicial" },
        { "value": "R$ 50 mil", "label": "Valor por cota" },
        { "value": "2026", "label": "Janela de estruturação" },
        { "value": "SAF", "label": "Veículo societário" }
      ],
      "tiers": [
        { "name": "Cota inicial", "investment": "R$ 50.000", "equity": "1%", "highlight": true, "benefits": ["Entrada no projeto", "Acesso a materiais institucionais", "Acompanhamento da evolução do case"] },
        { "name": "Participação ampliada", "investment": "R$ 150.000", "equity": "3%", "highlight": false, "benefits": ["Maior exposição ao projeto", "Relacionamento institucional ampliado", "Participação em encontros estratégicos"] },
        { "name": "Investidor âncora", "investment": "R$ 500.000", "equity": "10%", "highlight": false, "benefits": ["Posicionamento estratégico", "Maior proximidade com a liderança", "Participação relevante na tese de crescimento"] }
      ],
      "featuredTierLabel": "Mais acessível",
      "equitySuffix": "de participação",
      "disclaimer": "Estrutura ilustrativa para apresentação institucional. A formalização societária e regulatória deve ser conduzida em instrumento definitivo."
    }'::jsonb,
    true
  ),
  (
    'investor_benefits',
    '{
      "eyebrow": "Benefícios",
      "title": "Por que esta tese é relevante para o investidor",
      "description": "A combinação entre formação, credibilidade esportiva e governança cria uma plataforma institucional com potencial de crescimento.",
      "items": [
        { "title": "Exposição a um clube formador", "description": "Participação em um projeto com eixo estratégico claro de valorização de talentos." },
        { "title": "Ganho institucional", "description": "Conexão com uma narrativa de impacto regional e construção de marca." },
        { "title": "Governança SAF", "description": "Estrutura mais profissional para acompanhar execução e evolução do projeto." },
        { "title": "Potencial de upside", "description": "Receitas recorrentes somadas ao motor de valorização de atletas." }
      ]
    }'::jsonb,
    true
  ),
  (
    'final_cta',
    '{
      "eyebrow": "Próximo passo",
      "title": "Converse com o projeto e receba o material completo",
      "description": "Abra um canal direto com a equipe do Galo Maringá SAF para aprofundar a tese, a estrutura e a oportunidade de investimento.",
      "successTitle": "Solicitação enviada",
      "successText": "Nosso time entrará em contato para compartilhar os próximos materiais.",
      "successSubtext": "Obrigado pelo interesse no projeto Galo Maringá SAF.",
      "form": {
        "nameLabel": "Nome",
        "namePlaceholder": "Seu nome completo",
        "emailLabel": "E-mail",
        "emailPlaceholder": "voce@empresa.com",
        "phoneLabel": "Telefone",
        "phonePlaceholder": "(44) 99999-9999",
        "investmentLabel": "Faixa de interesse",
        "investmentPlaceholder": "Selecione uma faixa",
        "investmentOptions": [
          { "value": "50k", "label": "R$ 50 mil" },
          { "value": "150k", "label": "R$ 150 mil" },
          { "value": "500k", "label": "R$ 500 mil ou mais" }
        ],
        "submitLabel": "Quero receber mais informações",
        "meetingLabel": "Agendar conversa",
        "privacyNote": "Ao enviar, você concorda com o contato institucional sobre a oportunidade apresentada."
      }
    }'::jsonb,
    true
  ),
  (
    'contact',
    '{
      "contactTitle": "Contato",
      "contact": {
        "addressLines": ["Maringá, Paraná", "Brasil"],
        "phone": "+55 (44) 99999-9999",
        "email": "investidores@galomaringa.com.br"
      }
    }'::jsonb,
    true
  )
on conflict (key) do update
set
  value_json = excluded.value_json,
  is_published = excluded.is_published,
  updated_at = timezone('utc', now());
