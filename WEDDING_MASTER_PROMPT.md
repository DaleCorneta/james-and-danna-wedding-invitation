# CODEX MASTER PROMPT — THE INVITATION, UNVEILED

**Project:** Christian James Caguioa & Dana Cheyenne Cornita — Cinematic Wedding Invitation  
**Wedding:** Saturday, February 6, 2027, 4:00 PM  
**Venue:** Seaside Sunset Beach Resort, Caba, La Union, Philippines  
**Approved direction:** Balanced cinematic romance + warm coastal elegance  
**Signature opening:** Champagne silk curtains  
**Primary experience:** Mobile-first; the phone experience should be at least as beautiful and deliberate as desktop  
**Workflow:** One approved scene at a time. **Do not proceed to Scene 02 without my explicit approval.**

---

## 0. Your role and non-negotiable operating rules

Act as a senior creative developer, React/TypeScript architect, mobile interaction designer, and art director building an extraordinary wedding invitation website. It must feel like a scroll-directed luxury fashion campaign, romantic short film, or cinematic advertisement—not a generic wedding template, typical landing page, vertically stacked cards, or literal slide deck.

The visitor directs the film through natural scrolling; each scene transforms into the next via meaningful visual relationships (silk becomes photography, photography becomes paper, calligraphy becomes a ring, reflected gold becomes sunlight, paper becomes an envelope, and the envelope gives way to a seaside sunset).

**Do not generate any images or AI artwork.** I will explicitly request image generation if needed. The couple's high-resolution photographs will be provided later. Use clearly designated non-person placeholders until they arrive. Do not pretend photos of unrelated couples are the actual couple. Visual treatments built from CSS/SVG/3D geometry, licensed textures, and effects are acceptable, but don't create illustrative image assets without permission.

**Do not build all scenes.** Start by inspecting the existing repo, documenting the plan, then implement **Scene 01 only**. Run validations, summarize your changes, provide exact local testing instructions, and **STOP** for approval. Do not move on automatically, even if the first scene looks complete.

Do not delete or overwrite existing project work without reviewing it. Do not replace the starter with a new Vite project if an existing project exists. Never claim a command, test, screenshot, visual audit, plugin installation, or deployment succeeded unless you actually performed and verified it.

Use only free-to-use tools and packages unless I explicitly approve an exception. Before adding packages, check what the project already has and confirm current licensing/compatibility. Code must be focused, readable, accessible, well-tested where needed, and not overengineered.

## 1. First action: verify the existing repository

1. Confirm the actual current working directory and Git root. Examine `git status`, directory structure, `package.json`, lockfile, Vite config, Tailwind setup, React Router setup (if installed), TS config, entry points, current public assets, existing GSAP setup, existing source files, and available scripts.
2. **Important:** In an earlier attempt, running `npm install` from a parent folder failed because that folder had no `package.json`. Do not assume the shell is in the app root. Locate the actual package root before invoking npm. A repository can contain a nested app. Report its correct path.
3. Identify package versions (React, Vite, Tailwind, GSAP, TypeScript, React Router, etc.). Keep working parts intact and reuse sensible code. If the current project is JavaScript, report that; prefer strict TypeScript for new work where compatible without a destructive conversion. Avoid custom `@` import aliases; use clear relative imports unless the repo already has a justified convention.
4. Check for pre-existing changes and old-project content. Report proposed cleanup before any destructive action. Do not accidentally remove assets that may be useful.
5. Confirm which photo/reference assets are truly available in the filesystem. The five original invitation images were attached to the planning conversation but might not be available in your coding environment; never assume they are in the repo. Use the canonical text below. If visual references are missing, note that as a limitation; do not block Scene 01 development.
6. Do **not** perform a major dependency upgrade merely to implement the first scene.

After verification, create/update the following small documentation files in the repo (adapt locations to existing conventions):

- `docs/PROJECT_PLAN.md`: approved vision, all 11 scenes, desktop/mobile direction, dependencies and asset strategy.
- `docs/PROGRESS.md`: current scene, completed tasks, verification status, known issues, blockers, next requested approval. Keep updated each session.
- `docs/SCENE_SPECS.md`: per-scene composition, intended transition, mobile changes, assets, acceptance criteria.
- `docs/ASSET_REGISTER.md`: source URL, creator, download date when known, license/usage constraints, attribution requirements, original file, optimized variants, and actual usage.
- `AGENTS.md`: concise project-specific Codex instructions, including STOP gates and mobile standards; preserve existing useful rules if present.

Do not inflate documentation with repetitive prose. If these files exist, integrate carefully rather than overwriting them.

## 2. Ponytail: integrate with the coding workflow, not the website

Use [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) to encourage careful repository inspection, reuse, minimal necessary code, and concise context. It is an **agent plugin/skill**, not a React runtime library; do not add it to `package.json`.

The repository currently documents these Codex CLI commands:

```bash
codex plugin marketplace add DietrichGebert/ponytail
codex plugin add ponytail@ponytail
```

The official instructions then say to run Codex, review/trust the two hooks using `/hooks`, and start a new thread. **Only execute or propose these instructions if the Codex installation supports this syntax; if not, report the limitation and use its `AGENTS.md`/skill guidance as appropriate. Never claim it was installed unless verified.** The user must review/trust any lifecycle hooks.

Ponytail is meant to save unnecessary code and context, **never** cut validation, accessibility, content accuracy, testing, security, or essential responsive behavior. Prefer small readable components over premature abstractions. Treat reported token-saving benchmarks as claims, not a performance guarantee.

## 3. Canonical content and content safeguards

The invitation images are the source of truth for spelling and details. Treat the following as a planning transcription requiring final visual verification against the originals before production release. Never invent missing or contradictory facts.

- **Full names:** Christian James Caguioa and Dana Cheyenne Cornita.
- **Short presentation names:** Christian & Dana; Dana & CJ is also seen on the invitation cover. Use the couple's full names in meaningful/accessible event detail areas.
- **Event:** Wedding, Saturday, **February 6, 2027**, at **4:00 PM** (Asia/Manila local time).
- **Venue:** **Seaside Sunset Beach Resort, Caba, La Union, Philippines.** Verify the correct official property/map pin before constructing a directions URL or displaying its street address. Do not invent coordinates.
- **RSVP:** Reply on or before **December 6, 2026**.
- **Reserved seats:** Physical invitation shows **1 reserved seat** as an example. Do not assume all website visitors are entitled to one seat, and do not offer a plus-one by default. Guest-specific seat allocation requires a deliberate method if personalization is later implemented.
- **Plus-one:** Strictly no plus-one beyond seats specifically reserved.
- **Gift guide:** Their prayers, love, laughter, and company are most valued; if guests choose to give a gift, a monetary gift is preferred to help the couple begin their journey. Keep wording kind and non-demanding.
- **Dress code:** Light, elegant, comfortable **semi-formal attire suitable for an outdoor seaside celebration**. Shades: **beige, pastel yellow, khaki**. Guests are kindly asked to refrain from wearing **white** that might resemble the bride's attire.
- **Adults-only:** **18+** celebration, with exceptions for **immediate family members only**.
- **After-party:** After the reception, music, dancing, and celebration continue. Do not invent a starting time or a different location.
- **No backend:** Frontend-only project; RSVP collection method must be chosen later (e.g., external form, email, messaging service). Never present a fake working form or claim that submitted responses are saved.

### Wedding parents

- **Parents of the groom:** Rolando Caguioa and Marilyn Caguioa.
- **Parents of the bride:** Donny Cornita and Wilmie Cornita.

### Best men

1. Ryan Christopher Caguioa
2. Chris Michael Caguioa
3. Eliseo Canela Torres

### Maids of honor

1. Meryll Daeme Cornita
2. Zennith May Tonga
3. Danarie Woon

### Groomsmen

1. John Rey Valdez
2. John Ryan Canilang
3. Deontrae Bradley
4. Liam Aiden Cornita
5. Christian Dale Corneta
6. Garu Andrei Sung-Ag
7. Mohammad Hares Mohammad Salman (appears split across two lines in the original; verify that it represents one full name)

### Bridesmaids

1. Rachel Cornita
2. Sahara Collin Ronquillo
3. Kalehla Casey Sung-Ag
4. Camille Jade Corneta
5. Mhicee Shih-Montivilla
6. Rose Ann Aplacador
7. Lean Claire Alban
8. Guada Morales
9. Kristina Lyn Caguioa

### Flower ladies

1. *Lola Amariles Sung-Ag (leading asterisk appears on original; confirm whether it carries meaning)
2. Lola Rebecca Oamil
3. Sheynne Nicole Ronquillo
4. Wijen Adrienne Sung-Ag

### Principal sponsors

Preserve honorifics and the source ordering. Full list:

1. Mayor William N. Mamba & Mrs. Judith Mamba
2. Mr. Jimmy Delgado & Mrs. Maria Delgado
3. Mr. Dionisio Caguioa & Mrs. Gio Caguioa
4. Mr. Paul Pham & Mrs. Redelyn Pham
5. Mr. Nelson Delgado & Mrs. Maria Theresa Delgado
6. Mr. Flor Maranon & Mrs. Ana Maranon
7. Mr. Mario Darmanin & Mrs. Evangeline Darmanin
8. Mr. Wilfredo Pajayat & Mrs. Nanette Pajayat
9. Mr. Rodolfo Castro Jr. & Mrs. Carol Castro
10. Mr. Rey Orfiano & Mrs. Ma Cristina Orfiano
11. Mr. Ramil Mena & Mrs. Adelina Mena
12. Mr. Ryan Mena & Mrs. Renalyn Mena
13. Mr. Rizaldy Rentigrado & Mrs. Emely Rentigrado
14. Mr. Resty Orfiano & Mrs. Donna Orfiano
15. Mr. Reymar Orfiano & Mrs. April Orfiano
16. Mr. Francis Tabadero & Mrs. Josephine Tabadero
17. Mr. Alexander Abeya Jr. & Mrs. Rose Marie Abeya
18. Mr. John Velasco & Pilar Velasco
19. Mr. Alex Bait-It & Mrs. Josefina Bait-It
20. Mr. John Palmer & Mrs. Pamela Palmer
21. Mr. Eric Devoe & Mrs. Dana Devoe
22. Mr. Michael Stead & Mrs. Renee Stead
23. Mr. Raymond Mena
24. Mrs. Ellen Cornita
25. Mrs. Angie Reposar
26. Mrs. Mary Ann Atos
27. Ms. Jane Bangloy
28. Ms. Jacqueline Ciriaco
29. Ms. Merilyn Fermin
30. Mr. & Mrs. Fernando Cardante
31. Mr. & Mrs. Freddie Catubay
32. Mr. & Mrs. Anecito Egonia
33. Mr. & Mrs. Tomas Casano II

Build a **centralized, typed `weddingContent`/configuration model** for dates, venue, captions, names, role groupings, RSVP copy and policy information so all scenes read from the same source. Do not scatter wedding details as repeated literal strings throughout components. Treat the above as draft transcription pending final proofread with original images.

## 4. Visual direction: one continuous transformation

Art direction title: **“The Invitation, Unveiled.”** Tone: romantic, luxurious, cinematic, personal, sophisticated, warm, coastal, artistic. The colors and materials draw from the original printed invitation: ivory/sage paper, pale butter yellow, cream, muted beige, warm khaki, champagne gold, very dark charcoal, subtle ink-black typography, soft white florals.

Suggested *starting* design tokens—tune against originals:

| Token | Hex | Use |
|---|---|---|
| Film charcoal | `#26211D` | Dramatic first scene / monochrome overlays |
| Midnight ink | `#18252B` | Refined type and shadows |
| Ivory sage | `#EBEFCE` | Botanical paper backdrop |
| Paper cream | `#F4F0D8` | Main light backgrounds |
| Pastel yellow | `#F1E99B` | Floral / fabric accent |
| Champagne | `#C99C64` | Curtain highlights / metallic accents |
| Warm khaki | `#BAA97D` | Grounded neutral / attire palette |
| Soft beige | `#D5B69B` | Transition fabric / paper |

Fonts: test **Italianno** or **Allura** for couple calligraphy; **Cormorant Garamond** for elegant editorial type; optional **Cinzel** only if necessary for ceremonial headings. Load responsibly from Google Fonts or self-host where license permits. Keep readability and avoid too many font families or weights.

**No generic hero sections, stock website-template card grids, generic hearts/particle effects, excessive glassmorphism, random floating icons, cheap parallax, or overused wedding clip art.** Design background layers specifically for each scene: silk folds, theatrical light, monochrome photography, tactile handmade paper, botanical framing, gold reflections, golden-hour coastal atmospheric effects, and delicate stationery.

Animations should feel like deliberate camera choreography: tasteful fade-in/out, masks, perspective, controlled parallax, camera pushes, light movement, spatial composition. Favor subtle detail over constant activity. One hero motion per scene. Every transition must visually connect to the adjacent scene, not simply cut or fade to an unrelated section.

## 5. Approved 11-scene storyboard (DO NOT implement beyond Scene 01 yet)

| Act | Scene | Composition | Scroll-directed handoff |
|---|---|---|---|
| I | **01 — The Unveiling** | Dark theater; dimensional champagne silk curtains; soft golden spotlight; small “The Wedding of” and couple names; invitation date; scroll cue | Center seam parts; light opens; first couple photo frame is revealed |
| I | **02 — A Moment in Time** | Large monochrome couple photography, cinematic editorial typography, gentle crop/push | Photo texture turns into tactile handmade paper |
| I | **03 — Written in the Stars** | Flowing names, thin calligraphy, paper texture and white/pale-yellow botanical elements | Decorative ampersand morphs conceptually into gold ring |
| II | **04 — Forever Begins** | 3D wedding ring; large date and time typography; warm light | Ring glint becomes sunrise/golden flare |
| II | **05 — Where We Say I Do** | Actual venue/coastal photographs, horizon, site name, directions | Coastal breeze reveals/lifts invitation paper |
| III | **06 — With Our Families** | Parents and principal sponsors on elegant unfolding printed-paper composition | Paper unfolds into floral scene |
| III | **07 — Standing Beside Us** | Entourage: best men, maids of honor, groomsmen, bridesmaids, flower ladies; editorial florals | Flowers transition toward flowing fabric |
| III | **08 — The Wedding Palette** | Soft beige/pastel-yellow/khaki silk or linen swatches; semi-formal dress guidance | Fabric folds expose wedding notes |
| III | **09 — A Few Loving Notes** | Adults-only details, limited seats/no plus-one, gift guide, after-party | Paper folds into sealed RSVP envelope |
| IV | **10 — An Invitation to Respond** | Dimensional envelope, RSVP deadline, reserved-seat explanation and future response action | Invitation dissolves into golden sunset |
| IV | **11 — Until We Meet** | Sunset coastal closing, final words, couple names, February 6 date; optional replay/chapters | Restful closing composition |

Detailed names (including the extensive sponsors and entourage) should be comfortably accessible as structured panels or readable lists, not forced into rapid unreadable animation. In the eventual complete site, provide always-reachable **RSVP / Venue / Wedding Details** shortcuts even before viewers finish all 11 scenes. The cinematic experience and practical guest information are complementary, not mutually exclusive.

## 6. Mobile-first cinematic direction — extremely important

**Mobile is the principal audience, not an afterthought or a reduced desktop layout.** Aim to make portrait phone viewing especially intimate and beautiful, like an interactive vertical fashion film. Adapt compositions and motion to the device—not just CSS scaling. Specifically:

1. Design and validate first at **360×800, 375×812, 390×844 and 430×932**, then at **768px tablet**, and desktop around **1280–1440px**. Include narrow 320px fallback where feasible; inspect landscape and short viewport cases.
2. **Scene 01 on mobile:** Full-height portrait champagne curtains with a realistic vertical central seam, carefully framed inscription and scroll cue; the curtains draw outward when the visitor swipes up. Keep the central reveal readable and not obscured by fabric. Desktop may use more lateral stage depth and wider light spill. Mobile pacing may be faster and its camera framing closer.
3. Natural vertical finger scrolling must remain responsive, reversible, and feel native. Never trap the user in a mandatory swipe carousel, prevent default scrolling globally, or depend on wheel-only or hover-only interactions. Scrolling backward should elegantly reverse scene progress.
4. Use `svh`/`dvh` units and appropriate safe-area insets for notches, home bars and browser chrome. Account for iOS Safari address-bar expansion and Chrome Android viewport resize. Test real touch behavior where devices are available; otherwise explicitly report emulator-only testing.
5. Avoid huge pinned segments and endless scroll distances on small screens. Give short, intentional mobile pin ranges; if pinning causes jitter or scroll fatigue, use a simpler crossfade/perspective transition. Do not force smooth-scrolling libraries without testing. Prefer native scrolling first.
6. Provide purposeful reduced visual complexity on lower-powered devices: CSS/2.5D fallback for 3D, lower texture resolution/DPR, avoid heavy post-processing and constant full-page WebGL rendering. Prefer one managed canvas when actually required. Pause invisible work; honor `prefers-reduced-motion` with a coherent near-static experience.
7. Make all controls comfortably tappable (roughly **44×44 CSS px minimum**) and keep body text comfortably legible (**normally 16px+**). Avoid placing long name lists inside tiny animated typography. Long sponsor lists must be easy to scroll and never clip horizontally.
8. Distinguish touch gestures from scene transforms; no accidental zoom or horizontal overflow. Test opening and closing overlays, focus handling, orientation changes and browser back behavior.
9. Performance targets are **aspirational and must be measured**: good Core Web Vitals (LCP ≤2.5s, CLS ≤0.1, INP ≤200ms on representative connections/devices); responsive input during animations; maintain smooth frame rate on ordinary midrange Android/iPhone hardware. Do not claim target achievement without measuring; report any tradeoffs.
10. Avoid autoplay audio. If audio is considered later, require explicit user action, visible mute control, a graceful silent experience and accessible controls. **No audio implementation is requested for Scene 01.**
11. The final result should be *better on mobile through bespoke composition*, not compromised. Portrait-based focal framing, carefully spaced typography, seamless touch-controlled curtain movement, tactile layer transitions and subtle, high-quality lighting are top priorities.

## 7. React / GSAP / 3D architecture

- Reuse the existing React + Vite + Tailwind project and installed GSAP packages. Don't reinstall what is present.
- Build each approved scene as a self-contained semantic React component with separate styling and animation setup. Maintain central shared content, assets, reusable transition helpers and tokens.
- Prefer strict TypeScript when already available or suitable without risky migration; avoid `any`, broad global mutable state, duplicated scene data, and premature abstraction.
- Use **GSAP ScrollTrigger** for scroll-scrubbed/pinned timelines, **`@gsap/react` `useGSAP()`** or correctly scoped context with complete cleanup on React re-renders and unmount, and `gsap.matchMedia()` for mobile/desktop differences where appropriate.
- Keep component effects cleaned up. Avoid duplicate ScrollTriggers in React Strict Mode, layout jumps on images/fonts loading, and unnecessary React state updates on each animation frame. Coordinate shared transition elements only when needed.
- CSS transforms and opacity should be the default animation properties where possible; minimize expensive layout thrashing. Use filters/shadows judiciously and avoid excessive GPU layers.
- **Three.js / React Three Fiber / Drei are approved for later genuinely 3D scenes** such as rings and select fabric/floral details. They do not need to be installed just for Scene 01 if a lightweight fabric solution works. Inspect React compatibility: stable R3F v9 is paired with React 19; verify before installing. Do not adopt alpha versions by default.
- Asset sources: prioritize **own photos**, verified venue images with permission, CC0 Poly Haven/Sketchfab models with confirmed per-asset licenses, other properly licensed sources, and free photographic assets from Pexels or Unsplash under their stated conditions. **Noncommercial usage is not a blanket copyright exemption.** Record source/license and do not ship an asset of uncertain rights. Treat inspiration images as inspiration only, not automatically licensed media.
- Load assets intelligently: responsive image sizes, AVIF/WebP where appropriate, poster/static fallback, lazy loading for later scenes, preloading only for critical first-scene content. Avoid loading every large texture at startup.
- The site is **frontend-only**, with no API, database, authentication or payment functionality. Do not add a backend.
- React Router is optional for a one-page continuous narrative; reuse it if already installed, but do not invent unnecessary routes.
- Prefer small readable folders/components aligned with the existing repository. Example **only if consistent with what exists:**

```text
src/
  app/                    # app shell if needed
  assets/                 # imported small assets
  components/             # reusable UI primitives
  content/weddingContent.ts
  hooks/                  # focused reusable hooks
  lib/                    # GSAP setup / utilities
  scenes/
    Scene01Unveiling/
      Scene01Unveiling.tsx
      scene01.css          # only if needed beyond Tailwind
  styles/                 # design tokens / global styles
public/
  images/                 # optimized approved photographs
  models/                 # approved GLB/GLTF assets later
  textures/               # approved material textures
  references/             # optional user-supplied source references, not auto-shipped

docs/
  PROJECT_PLAN.md
  PROGRESS.md
  SCENE_SPECS.md
  ASSET_REGISTER.md
AGENTS.md
```

Use existing naming/style conventions. No new alias configuration just to follow the example. Avoid huge files and repetitive components.

## 8. Scene 01 detailed implementation specification — your only build target now

**Scene title:** The Unveiling  
**Feeling:** Intimate, luxurious, understated, welcoming, atmospheric, cinematic  
**Key material:** Champagne silk against film-charcoal darkness  
**First visible words:** “THE WEDDING OF”, “Christian & Dana”, “FEBRUARY 06, 2027”, and a refined “SCROLL TO UNVEIL” cue. The full formal names remain in the wedding content configuration and accessible information.

### Visual composition

- Viewport-filling dark stage. Two champagne silk curtain surfaces meet at a slightly irregular central seam, with distinct soft folds and directional highlights. The composition must suggest fabric volume and weight.
- Subtle central amber/ivory spotlight with controlled falloff, barely visible atmosphere, and warm specular detail. Avoid fake neon glows.
- Refined ceremonial typography. Names should be the emotional center, not buried in decorative flourishes.
- Under the curtain, create **a graceful placeholder reveal stage for the future couple photo**: a well-designed matte/frame/neutral cinematic field, labeled as awaiting user photography rather than an unrelated couple stock photo. This allows the curtain interaction to be validated without Scene 02.
- Background must look art-directed, not a single flat gradient. Use a few purposeful layers: stage shadow, fabric folds, small grain/texture if licensed or CSS-driven, radial illumination and restrained vignette.

### Scroll timeline concept (adjust after actual visual testing)

- **0–15%:** Establish mood; curtain subtly responds to initial movement; prompt softens.
- **15–70%:** Curtains progressively part from their central seam; folds shift with perspective and weight; central light spills onto the reveal plane.
- **70–100%:** Curtain panels move beyond the focal area, the reveal placeholder becomes visible, and lighting settles. At this boundary **stop**: do not animate the couple's actual Scene 02 content yet.
- Scrolling backward reverses the exact motion without popping, flashing, losing styles or rebuilding the timeline.
- Timing and distances must be calibrated separately for mobile and desktop, emphasizing natural touch feel. The user must never be stuck waiting through a slow non-interactive film.

### Implementation choice

Start with the least complex credible solution: layered CSS fabric imagery/textures, shaped surfaces and perspective transforms controlled through GSAP. Add custom geometry or a small 3D element only if the 2.5D treatment fails to meet the brief, and explain the tradeoff before increasing bundle cost. It should have visually believable folds and parallax, not look like two flat rectangles sliding sideways.

### Mobile-specific finish

- Portrait compositions designed intentionally for 360–430px width; curtain edges should clear the central name and reveal area.
- Use a generous central focal window as the fabric separates; headline remains readable throughout the transition.
- The scroll cue is unobtrusive but apparent. Respect browser chrome, dynamic viewport changes, tap targets and safe areas.
- Optimize texture resolution, shadows and transforms; avoid janky large filter operations.
- Provide no-JS/reduced-motion fallback: invitation names and a static, legible composition remain accessible.

### Acceptance tests before requesting approval

1. `npm install` only at verified package root and only when necessary; use the repo's existing package manager/lockfile convention.
2. Run available lint, typecheck, tests and production build scripts; provide actual command/results and distinguish missing scripts from failed ones.
3. Use a responsive inspection workflow to verify 360, 375, 390, 430, 768 and desktop widths. Check no horizontal scroll, accidental clipping, text overlap or missing curtain edges.
4. Scroll down and back up repeatedly; check that all animation states reverse cleanly and that there are no leaks, duplicate triggers, visible jumps, or broken pin spacers.
5. Test or simulate `prefers-reduced-motion`. Check keyboard/screen-reader access to the essential invitation text.
6. Audit network assets and loading behavior. Don't claim physical mobile test results if only desktop emulation was available.
7. Provide an exact launch command and a short description of what to look for on mobile and desktop. Include screenshots only if actual tooling is available and screenshots can be captured; never fabricate evidence.
8. Update `docs/PROGRESS.md` with implementation and test results. Set **Scene 01: Awaiting user approval** and **Scenes 02–11: Not started**.

## 9. Review, approval and resume protocol

At the end of each approved development stage, your reply must contain:

- **Completed:** What changed, concise list of files (with paths), key visual/technical choices.
- **Tested:** Commands, observed results, tested viewport sizes/browsers, and limitations.
- **Preview:** Exact project-root path and `npm run dev` equivalent, verified as available.
- **Known issues / pending assets:** Especially couple photos, venue photos, and license questions.
- **Status:** Current scene and clear stop point.
- **Question to owner:** “Do you approve Scene 01, or would you like revisions?”

When I say **“Revise Scene 01”**, change only Scene 01 and necessary shared primitives. When I say **“Approve Scene 01, proceed to Scene 02”**, first record approval and then implement Scene 02, repeating this process. Acknowledgment, encouragement or casual conversation is **not** scene approval; approval must be explicit.

If a task/session pauses, use `docs/PROGRESS.md` as the reliable checkpoint. On resumption: read `AGENTS.md`, `docs/PROJECT_PLAN.md`, `docs/SCENE_SPECS.md`, `docs/PROGRESS.md`, check `git status`, then continue only the currently approved scene. Do not claim background or asynchronous work.

## 10. Immediate task for this Codex session

**Audit the existing repo, document the project, and build Scene 01 — The Unveiling, with mobile as the primary benchmark.** Preserve the existing starter, use its actual package root, verify dependencies, set up Ponytail only if supported/authorized, and do not install unnecessary 3D packages yet. Make the champagne-silk curtain transition look exceptional and fluid, not generic. Validate mobile and desktop. Summarize the work and STOP for my explicit approval. **Do not implement Scenes 02–11, do not invent couple photos, do not generate images, and do not implement RSVP functionality yet.**

---

### Official documentation to consult only when useful

- Ponytail: https://github.com/DietrichGebert/ponytail
- Ponytail installation: https://github.com/DietrichGebert/ponytail/blob/main/INSTALL.md
- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- GSAP React hook: https://gsap.com/resources/React/
- React Three Fiber: https://r3f.docs.pmnd.rs/
- Google Fonts: https://fonts.google.com/
- Poly Haven models: https://polyhaven.com/models
- Pexels license: https://www.pexels.com/license/
- Unsplash license: https://unsplash.com/license
