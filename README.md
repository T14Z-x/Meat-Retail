# Meat/Food Retail Homepage (Next.js + TS)

This is a production‑ready scaffold for a retail homepage built with:

- Next.js 14+ (App Router) + TypeScript
- CSS Modules (no Tailwind)
- Drizzle ORM + MySQL (scaffold only, no queries used yet)
- Custom AuthContext (email/password structure; httpOnly JWT to be added later)

## Getting Started

1. Install deps (requires Node 18+):

   - npm: `npm install`
   - pnpm: `pnpm install`

2. Copy env file and set values as needed:

   `cp .env.local.example .env.local`

   Note: Database is not required to view the homepage. The Drizzle config is scaffolded only.

3. Run the dev server:

   - npm: `npm run dev`
   - pnpm: `pnpm dev`

4. Open `http://localhost:3000`.

## Structure

- `app/layout.tsx` — Global layout with Header/Footer and AuthProvider.
- `app/page.tsx` — Homepage sections: Hero, Categories, Products, Value Props, Outlets, FAQ, Newsletter.
- `components/` — Header, Footer, UI primitives, cards, and composite sections.
- `styles/` — CSS Modules and design tokens (`variables.css`).
- `db/` and `drizzle.config.ts` — Drizzle scaffolding (no runtime usage yet).
- `public/` — Asset folders. A placeholder logo is provided. Drop your own images into:
  - `public/hero/hero-1.jpg`
  - `public/categories/{beef.jpg, mutton.jpg, chicken.jpg, seafood.jpg, heat-eat.jpg, deli.jpg}`
  - `public/products/sample-*.jpg`

The Hero section uses a gradient by default. Uncomment the background-image rule in `styles/hero.module.css` once you add `public/hero/hero-1.jpg`.

Cards use `next/image` within fixed‑ratio wrappers to avoid layout shift. They currently render data‑URI SVG placeholders; once you add images under `public`, pass those paths into the grids or swap the placeholders.

## Notes

- Accessibility: semantic landmarks, proper headings, focus outlines, and native `<details>` for the FAQ.
- Performance: `next/image` for images with contain fit and fixed aspect ratios.
- Payments: `lib/payments/` is a stub for future Stripe/COD integration.
- Auth: `contexts/AuthContext.tsx` is a client‑side scaffold; wire it to your API that sets an httpOnly JWT.

## TypeScript

- Strict mode is enabled in `tsconfig.json`.

## License

No copyrighted content from external sites is included. All text/images are placeholders.
