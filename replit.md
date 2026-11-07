# Manal Mutairi Portfolio

A responsive personal portfolio for Manal Mutairi, featuring her education, professional interests, editable skills and experience details, and contact information.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/manal-portfolio run dev` — run the portfolio website
- `pnpm --filter @workspace/manal-portfolio run typecheck` — check the portfolio TypeScript
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Portfolio: React + Vite
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/manal-portfolio/src/content.ts` — editable profile, education, skills, interests, experience, and social links
- `artifacts/manal-portfolio/src/App.tsx` — page structure and interactions
- `artifacts/manal-portfolio/src/index.css` — colors, typography, motion, and responsive styles

## Architecture decisions

- The portfolio is frontend-only; the contact form validates fields and opens a prefilled email draft rather than claiming to send mail.
- Skills, training details, and social destinations not provided by Manal remain clearly editable examples; do not present them as confirmed claims.

## Product

The site introduces Manal, highlights her Kuwait University Education degree and stated interests, and provides responsive navigation, theme switching, editable profile content, and email contact.

## User preferences

Keep unprovided skills, work history, and profile URLs as clearly marked placeholders rather than inventing personal details.

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
