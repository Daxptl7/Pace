# PACE · Phase 1

A responsive sportswear storefront foundation built with original PACE branding. Inspired by the navigation and minimalist design patterns of [Nike India](https://www.nike.in/). This is an **unofficial educational/portfolio project**, not affiliated with or endorsed by Nike or Jordan Brand.

Phase 1 stops at the frontend foundation. The root page is an intentional placeholder using the same template as other undeveloped routes. There is no completed homepage, product catalog, authentication, checkout, backend, or payment flow.

## Run locally

Requirements: Node.js **22.13+ on the Node 22 line**, or a current supported Node 24/26 release, and npm 10+.

```sh
cd /Users/daxpatel/Desktop/Nike
npm ci
npm run dev
```

Open **http://127.0.0.1:5173**. The root directory is the monorepo root (the equivalent of `nike-clone/` in the brief); no extra nested repository is needed.

```sh
npm run typecheck
npm run lint
npm test
npm run format:check
npm run build
npm run preview
```

The production preview defaults to **http://127.0.0.1:4173**. To use another development port: `npm run dev -- --port 5174 --strictPort`.

## Structure

```text
Nike/
├── frontend/
│   ├── public/
│   │   ├── icons/pace.svg
│   │   └── images/
│   ├── src/
│   │   ├── app/                   # Providers, BrowserRouter, entry point
│   │   ├── assets/                # Asset provenance and licensing policy
│   │   ├── components/
│   │   │   ├── common/            # Brand, error boundary, route effects/loading
│   │   │   ├── layout/            # Shared shell, headers, announcement, footer
│   │   │   ├── navigation/        # Desktop mega menu and mobile navigation
│   │   │   ├── product/           # Presentation-only product card/carousel
│   │   │   └── ui/                # Shared accessible UI primitives
│   │   ├── data/                  # Typed navigation and footer configuration
│   │   ├── features/              # Reserved for subsequent feature modules
│   │   ├── hooks/                 # Responsive media-query subscription
│   │   ├── pages/                 # Reusable placeholder and intentional 404
│   │   ├── services/              # Axios and shared QueryClient
│   │   ├── store/                 # Zustand menu, cart, wishlist; unit tests
│   │   ├── styles/                # Tailwind and global design tokens
│   │   ├── types/                 # Product, navigation and cart contracts
│   │   └── utils/                 # Formatting utilities and tests
│   ├── .env.example
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── tsconfig*.json
│   └── vite.config.ts
├── backend/README.md              # Reserved; excluded from npm workspaces for now
├── docs/validation/               # Recorded browser and production reports
├── .gitignore
├── .prettierrc.json
├── package-lock.json              # Authoritative workspace lockfile
├── package.json
└── VALIDATION.md
```

## Implemented foundation

- React 19, Vite, strict TypeScript, `@/*` path aliases, npm workspaces, ESLint flat configuration, Prettier, and Vitest.
- Shared palette: `#111111`, `#ffffff`, `#f5f5f5`, `#e5e5e5`, `#757575`, and `#333333` hover. Fluid `clamp()` typography, a base 8px layout rhythm, and system sans-serif fonts.
- Slim utility navigation; sticky main navigation; active route indicators; five configurable desktop mega menus; dimming backdrop; stable hover boundaries; keyboard disclosure buttons, Arrow Down and Escape behavior.
- Mobile drawer with nested native disclosure sections, focus containment, Escape/backdrop dismissal, focus restoration, scroll locking, and automatic closure on route or breakpoint changes.
- Desktop search and a mobile search modal submit URL-encoded search terms to the placeholder `/search?q=…` route. No product-search API is called.
- Configurable announcement strip with optional manual carousel controls. No automatic content rotation.
- Multi-column footer, intentional information/help placeholders for every link, social information links, and a region disclosure. Social controls do not claim real PACE social accounts.
- `Button`, `ButtonLink`, `IconButton`, `Input`, `SearchInput`, `Container`, `SectionHeading`, `Modal`, `Drawer`, `Dropdown`, `Skeleton`, `Breadcrumb`, `ProductCard`, and `ProductCarousel` components.
- Native modal dialogs supply focus containment and make the rest of the document inert; ordinary navigation uses links and disclosures rather than ARIA application menus.
- Lazy route modules, route loading skeletons, a global error boundary, route titles, scroll reset, a skip link, and focus transfer to the main region after navigation.
- Shared TanStack Query client and an environment-configured Axios client, ready for later phases without any premature requests.
- Typed cart and wishlist stores, initially empty, with versioned local-storage persistence. Only clearing/hydration are provided; adding products, pricing, checkout, and wishlist interaction await the catalog phase.
- Restrained Motion transitions and CSS animations honoring `prefers-reduced-motion`.
- Original CSS running-track artwork and an original SVG PACE mark. No external asset requests or copied brand assets.

## Routes

All of the following load inside the same shared layout:

```text
/
/men                    /women                 /kids
/jordan                 /new-arrivals          /shoes
/clothing               /accessories           /sports/:sport
/category/:slug         /product/:slug         /search
/wishlist               /cart                  /auth
/account                /checkout              /help
```

`/help/:topic` and `/info/:topic` intentionally host footer/legal/support placeholders. Unrecognized routes render the 404 page. Authentication, account, payment, and checkout routes clearly remain placeholders; no personal or payment information is collected.

**Production hosting must rewrite non-asset requests to `frontend/dist/index.html`** so direct BrowserRouter deep links work. Vite dev and preview already provide this fallback. Set static hosting output to `frontend/dist`; this phase does not deploy a site or configure a hosting provider.

## Dependencies

Runtime: `react`, `react-dom`, `react-router-dom`, `zustand`, `@tanstack/react-query`, `motion`, `lucide-react`, `axios`, `react-hook-form`, `zod`.

Development: `vite`, `@vitejs/plugin-react`, `typescript`, `tailwindcss`, `@tailwindcss/vite`, `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`, `@types/react`, `@types/react-dom`, `@types/node`, `vitest`, and root-level `prettier`. Exact resolved versions are recorded in `package-lock.json`.

React Hook Form and Zod are installed for later forms; this phase does not invent an authentication form just to use them. Backend dependencies, Docker, and a permanent Playwright test framework are deferred as requested.

## Configuration

Copy `frontend/.env.example` to `frontend/.env` only when a backend is available:

```dotenv
VITE_API_URL=http://localhost:3000/api
```

`VITE_*` values are public browser configuration. Do not put credentials in them. No environment file is required for Phase 1.

## Validation

`npm test` covers navigation overlay exclusivity/reset, empty store initialization, persisted cart/wishlist hydration and clearing, and INR/route-title formatting. The browser verification results for this implementation are recorded in [VALIDATION.md](./VALIDATION.md).

Known boundaries: browser verification is local Chromium only; other engines and real touch devices remain unverified. Product components are reusable presentation primitives and are not mounted into a catalog or homepage. All information/legal text is placeholder content, not a production policy. Browser-local state has no server synchronization. No backend is started by any command. Git is initialized; no commits or remote publication are created in this phase.
