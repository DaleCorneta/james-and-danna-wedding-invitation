# James & Dana

A frontend-only wedding invitation starter built with React, TypeScript, Vite, Tailwind CSS, GSAP, and React Router.

## Start

Use Node.js 24 LTS. Run these commands from the folder containing `package.json`.

```sh
npm install
npm run dev
```

## Scripts

- `npm run dev` — start the local development server.
- `npm run build` — type-check and create a production build.
- `npm run preview` — preview the production build locally.
- `npm run lint` — run ESLint.
- `npm run typecheck` — check TypeScript without building.

## Source layout

```text
src/
  app/          Application-level setup, including the route tree
  layouts/      Shared page layouts
  pages/        Route-level screens
  styles/       Global styles and Tailwind entry point
  main.tsx      Browser entry point
```

Keep route screens in `pages/`, reusable site-wide UI in `components/`, and wedding-specific content grouped by feature when those features are introduced. GSAP animations should be scoped to their component and reverted during cleanup; the starter home page shows that pattern and respects reduced-motion preferences.

For static hosting, serve `dist/` and configure the host to fall back to `index.html` for routes so that direct visits and refreshes reach React Router.
