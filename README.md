# AquaFeed Lab

Production-quality Next.js application for fish feed daily ration planning and Pearson square feed formulation.

## Architecture

- `app/` contains Next.js App Router pages for landing, daily feeding, formulation, ingredients, and history.
- `components/` contains reusable navigation, result actions, and shadcn-style UI primitives.
- `lib/calculations.ts` contains pure TypeScript calculation functions for feeding ration and Pearson square formulation.
- `lib/ingredients.ts`, `lib/types.ts`, and `lib/storage.ts` provide default data, shared types, and localStorage persistence.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm run start
```

## Deployment

Deploy to Vercel or any Node-compatible host. Set the build command to `npm run build` and start command to `npm run start`.
