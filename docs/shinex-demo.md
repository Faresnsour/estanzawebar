# SHINEX customer demonstration

Route: `/demos/shinex` (direct access, no login, not linked prominently from Estanza).

## Approved reference and assets

- Visual reference: `Downloads/Shinex premium car care booking mockup.png`.
- Original logo: `Downloads/Woblo/instagram.image.574234817_17843853213609230_1304718579164868644_n.Woblo.jpg`, copied unchanged to `public/shinex/logo.jpg`. Its purple background is retained.
- Vehicle and interior illustrations are original inline SVGs, without manufacturer marks. No photographs, generated imagery or page-image substitution.
- Cairo, existing Lucide utility icons, CSS Modules and scoped purple design tokens. Main marketing content remains server-rendered.

## Scope and data

Approved package: interior deep clean + exterior wash with German SONAX products. Prices: standard car 29 JOD; 5-seat SUV 39 JOD; 7-seat SUV 49 JOD. Hero price remains 29 for a standard car. Request summary and message derive prices from the same mapping.

Four stages: vehicle → preferred date/period → sample contact details → review. The final action prepares an in-page WhatsApp message preview. It does not send, open WhatsApp, confirm an appointment or create a production record. Repeated final actions are ignored. Previous stages can be edited without losing details; reset clears the state. There is no persistence beyond mounted React state. Reloading clears personal details. Optional clipboard access occurs only when the visitor presses Copy; a manual-copy fallback is provided.

Commercial contact links are separate from the demo: `tel:0782987733`, `https://wa.me/962782987733` and `https://www.instagram.com/shinex863/`. No address, hours, duration, capacity or availability has been inferred.

Analytics and conversion listeners exclude this route, including before client navigation. No database, form API, messaging integration or new dependency was added for SHINEX.

## Locale

The existing locale cookie continues to represent an explicit preference. With no valid preference, this route defaults to Arabic; the rest of Estanza continues to default to English. `src/proxy.ts` supplies the route default to server rendering, so the document has the correct `lang` and `dir` immediately. `LocaleProvider` also resolves the default per pathname for client navigation without persisting it as a preference. Explicit choices are remembered by the existing switch. All copy is in the existing Arabic/English catalogues. State is not keyed by locale.

Dates are generated/validated against `Asia/Amman`; date formatting is timezone-explicit. A preferred period is morning, midday or evening, never a claim of available capacity. Past or malformed dates are rejected again at final review in case the page crosses midnight.

## Components and motion

Existing [Base UI](https://base-ui.com/react/overview/quick-start) foundation (MIT): RadioGroup/Radio for vehicle and period choices; Field for labels, input state and inline errors; Accordion for FAQs; Collapsible for the mobile summary; DirectionProvider for RTL behaviour. No second component foundation or paid component was introduced.

Existing [GSAP React integration](https://gsap.com/resources/React/) handles brief step and price transitions. `useGSAP`, scoped contexts, `matchMedia` and ResizeObserver cleanup prevent lingering animations. Step height is measured then restored to auto to avoid jumps and clipping after resizing or validation. Reduced motion disables the transitions. No additional animation engine was added.

## Verification

- `npm run lint`, `npx tsc --noEmit`, `npm test` (including domain tests for prices, message contents, dates, phone formats, back/edit, double preparation and reset).
- `npm run build`: production build includes `/demos/shinex` and Proxy.
- Chrome checks: 360, 390, 768 and 1440px in Arabic and English; no horizontal overflow or untranslated keys; all three vehicle prices through the complete journey; inline errors/focus; Arabic-digit numbers; edit/back; locale continuity; preview; reset; refresh; collapsible and FAQ keyboard controls; reduced motion.
- Browser instrumentation recorded no external HTTP requests or console/page errors from the demo and no localStorage/sessionStorage data. Contact destinations were inspected, not opened.
- Existing homepage, cleaning, previous automotive demos and legal routes returned 200. The retained homepage Select, mobile Dialog and complete booking flow also passed browser checks. The homepage remains independent of SHINEX.
- Final focused checks passed for the desktop summary submit button through every stage, keyboard radio selection, and clipboard text matching the request preview. The clipboard-denied manual-copy fallback was also observed.
- Screenshots: `/tmp/shinex-review/`, including each language/width and completed request previews.
