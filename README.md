# Landing Page Galo Pitch

Landing page institucional em Next.js para apresentação do Galo Maringa SAF, com conteudo gerenciavel via Supabase.

## Deploy na Vercel

Configure as variaveis de ambiente abaixo no projeto da Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

O projeto usa Next.js 16 e requer Node.js 20.9 ou superior.

## Supabase

Execute o script `supabase/site_content.sql` no SQL Editor do Supabase para criar a tabela `site_content`, as politicas RLS, o bucket `site-assets` e o conteudo inicial.
