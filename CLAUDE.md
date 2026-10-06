@AGENTS.md

# CLAUDE.md — Iate Clube Brasileiro (ICB) · Site

Contexto persistente do projeto. Leia antes de qualquer implementação.

## Organização no computador
- `C:\ICB\site`   → **este projeto** — frontend Next.js · repo GitHub `icb-website-nextjs`
- `C:\ICB\studio` → Sanity Studio (painel de conteúdo) · repo GitHub `icb-studio`
- `C:\Iate Clube Brasileiro` → projeto **ANTIGO** (Vite/React), arquivado — **não usar**

## Stack
- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** (configurado em `src/app/globals.css` via `@theme`)
- **Sanity CMS** — projectId `m7k49mce`, dataset `production`, `useCdn: false`, leitura pública (sem token no frontend)
- Animações: **framer-motion** · Ícones: **lucide-react**
- Deploy: **Vercel** — auto-deploy a cada `push` na branch `main`

## Fontes
- Títulos: **Spectral** · Corpo: **Instrument Sans** — carregadas via `next/font` em `layout.tsx`
- As variáveis `--font-display`/`--font-body` ficam em `:root` no `globals.css`.
  ⚠️ Dentro de `@theme` o Tailwind não emite a variável em runtime → a fonte cai no fallback (Georgia/system-ui). Manter em `:root`.

## Roteamento
App Router padrão (arquivos em `src/app`). **Não** é hash routing (isso era o projeto Vite antigo).

## Sanity — funções em `src/lib/sanity.ts`
`getNoticias`, `getEventos`, `getEvento`, `getRegatas`, `getInstalacoes`, `getDocumentos`, `getSocio`, etc.
Conteúdo precisa estar **Publicado** no Studio para aparecer nas queries.

## Convenções de código
- Cores das seções alternam **branco ↔ `var(--color-surface)` (#F5F5F5)** — sem duas iguais coladas
- Tokens: RED `#B22222`, NAVY `#0A1628`, INK `#16202E`
- ISR: páginas de conteúdo usam `export const revalidate = 60`
- Imagens: usar `next/image`; flyers/infográficos com `object-contain` (sem crop)
- Breadcrumb: componente `Breadcrumb` (texto escuro sobre fundo claro)

## Fluxo de trabalho
1. Editar código
2. `npx next build` para validar (não quebrar o deploy)
3. `commit` + `push` na `main` → a Vercel publica sozinha em minutos

## Studio (conteúdo) — `C:\ICB\studio`
- Repo separado `icb-studio`. Rodar local: `npm run dev` lá dentro.
- Publicar Studio: `npx sanity deploy` dentro de `C:\ICB\studio`.
- O `.env` do Studio contém o **token do Sanity** — **NUNCA commitar** (já está no `.gitignore`).

## Domínio (nameservers na Kinghost; só os registros abaixo apontam para a Vercel)
- Produção: **https://icb.org.br** (DNS migrado em 24/07/2026).
- `A` do domínio raiz (`@`) → **`76.76.21.21`** (IP estável/legado da Vercel).
  ⚠️ Em 06/10/2026 o IP anterior `216.198.79.1` (recomendado pela Vercel na migração)
  **parou de responder** e derrubou o site; trocado para `76.76.21.21`, que a Vercel
  suporta permanentemente. Se cair de novo, confirmar o IP atual no painel da Vercel
  (Settings → Domains → View DNS configuration) antes de trocar.
- `AAAA` (IPv6) removido — conflitava.
- `www.icb.org.br` → CNAME `97e6edcbd67496ee.vercel-dns-017.com`, redirect 308 para o apex.
- `regatas.icb.org.br` → CNAME para a Vercel; redirect (next.config) para
  `mariners-compass-icb.vercel.app/regatas` (portal de regatas, projeto de terceiro).
- `icb-website-nextjs.vercel.app` segue como endereço alternativo.
- ⚠️ **Não mexer** na Kinghost em: `MX`, `TXT` (SPF/DKIM/DMARC) e `mail/imap/pop/smtp/webmail`
  — e-mail do clube depende deles.
- CORS no Sanity **não é necessário**: todas as consultas são feitas no servidor (Server Components).

## Avisos importantes
- **E-mail Kinghost**: NÃO cancelar até a migração de DNS concluída (o e-mail `icb.org.br` roda lá).
- **Auditoria pendente** (aprovada, não aplicada): unificar domínio em sitemap/robots/canonical; OG image atualizada; sitemap incluir eventos; headers de segurança; `next/image` nas imagens de notícias/eventos.
