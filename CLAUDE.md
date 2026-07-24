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

## Domínio
- Produção: **https://icb.org.br** (DNS migrado em 24/07/2026).
- Os nameservers continuam na **Kinghost** — lá foi trocado só o `A` do domínio raiz
  para `216.198.79.1` (Vercel) e removido o `AAAA` (IPv6) que conflitava.
- `icb-website-nextjs.vercel.app` segue funcionando como endereço alternativo.
- ⚠️ **Não mexer** na Kinghost em: `MX`, `TXT` (SPF/DKIM/DMARC), `mail/imap/pop/smtp/webmail`
  e `regatas.icb.org.br` — e-mail do clube e portal de inscrições dependem deles.
- `www.icb.org.br` ainda aponta para a Kinghost (site antigo) — pendente redirecionar para o principal.
- CORS no Sanity **não é necessário**: todas as consultas são feitas no servidor (Server Components).

## Avisos importantes
- **E-mail Kinghost**: NÃO cancelar até a migração de DNS concluída (o e-mail `icb.org.br` roda lá).
- **Auditoria pendente** (aprovada, não aplicada): unificar domínio em sitemap/robots/canonical; OG image atualizada; sitemap incluir eventos; headers de segurança; `next/image` nas imagens de notícias/eventos.
