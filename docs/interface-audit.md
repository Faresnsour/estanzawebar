# Estanza redesign audit

Reviewed the home, shared navigation/footer, showcase, privacy and terms interfaces against the current [Vercel Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md), frontend-design, ui-ux-pro-max, and vercel-react-best-practices.

## Findings fixed

- `src/components/Hero.tsx` — replaced miniature controls with native radios, labelled selects, and a labelled customer field; retained service/date/time/customer state across all preview views.
- `src/components/Hero.tsx` — added view announcements and focused the result heading after form submission; long customer text wraps within the message and log.
- `src/components/ProjectCard.tsx` — use h2 for showcase case studies and h3 beneath the home work heading, preventing a heading-level skip.
- `src/components/Navbar.tsx` — put the mobile brand navigation handler on the actual link; preserve dialog focus containment, Escape, focus restoration and scroll unlocking.
- `src/components/estanza.module.css` — visible focus, 44px or larger control targets, safe-area padding, scroll offsets and modal overscroll containment.
- `src/components/EstanzaLogo.tsx` — removed ornamental gradient/shadow treatment; mark the adjacent wordmark's icon as decorative.
- `src/app/page.tsx` and `src/components/Hero.tsx` — removed homepage scroll reveals and GSAP animations, including the endless device float.
- `eslint.config.mjs` — exclude installed `.agents` tooling from application linting; no application lint rules disabled.

## Browser verification

Chromium on localhost, both Arabic/RTL and English/LTR:

- Home widths 320, 375, 768 and 1440px: no horizontal overflow, broken images or unnamed form controls.
- Desktop and phone screenshots reviewed for typography, spacing, hierarchy and RTL ordering.
- All three services, day and time selection, message preview, sample log, and return-to-form state exercised.
- Language switching preserves selected service and customer text.
- Long customer names wrap without expanding the viewport.
- Native FAQ disclosure opens correctly.
- Mobile dialog: keyboard focus contained, Escape closes, focus returns to the trigger, body scrolling restored.
- Reduced motion: zero running homepage animations and automatic rather than smooth scrolling.
- Landscape 844×390px: no overflow.
- Computed text contrast audit: no failures on home, showcase, privacy or terms. Heading and accessible-name checks also pass. This is a targeted audit, not a full WCAG certification.
- `/showcase`, `/privacy`, `/terms`, `/demo`, `/speedcar`, `/wash33`, `/perfect`, `/autoSpa`, `/blitz`: load without client runtime errors or phone-width overflow.
- Existing WhatsApp destinations and tracking attributes retained. No live requests were submitted.

## Engineering verification

- TypeScript `--noEmit`: pass.
- ESLint: pass.
- Existing booking and bilingual catalog test suites: pass.
- Final production-server browser audit: pass for contrast, heading order, accessible names, language-state retention, keyboard focus, reduced motion and overflow.
- Default Turbopack production build and Webpack production build: pass, including type checking and all routes. The initial sandbox worker error was cached; moving the generated Turbopack cache to a temporary backup resolved it.

Client booking implementations, pricing data, translation architecture and routing are preserved. The shared design is scoped in `src/components/estanza.module.css` so it does not restyle independently branded centres.
