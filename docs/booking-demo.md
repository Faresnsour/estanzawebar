# Estanza booking landing page

The homepage now follows the supplied October 12 visual reference: dark green hero with a light booking form, a working booking demonstration, an asymmetric customisation section, setup scope, FAQ and a dark contact/footer area. `booking-site.module.css` scopes the new presentation to the homepage. Existing cleaning, automotive, legal and showcase routes retain their components and functionality.

The logo is the existing `public/logotube2.png` image, displayed intact. Cairo, the current locale provider, WhatsApp number, email and social links are reused. English remains the neutral default, and the existing language cookie remains authoritative. All new copy uses the `bookingSite.*` catalog keys. Homepage and default metadata describe the general booking offer.

## Demo boundaries

- `booking-landing.tsx` owns one reducer state shared by the hero and the main experience. Switching language refreshes translations without remounting it.
- Dates are the next seven days calculated from today's Amman date; all four sample times explicitly use Amman time. Date labels use `Intl`, rather than independent weekday strings. Current dates and inputs are revalidated before every transition.
- The state machine separates selection, details, review and recording. Actions carry the originating step to prevent queued clicks from advancing twice. Once recorded, a request is immutable until reset.
- The result is **awaiting team confirmation**, never a confirmed appointment. There is no real availability calendar, slot locking, account, messaging integration or backend submission.
- Names and phone numbers are kept only in component memory. No storage, URL parameters, external request or database operation contains them. Leaving or reloading the page clears the state. The language cookie does not contain demo data.
- Homepage marketing visits load Analytics after hydration. Collection is disabled before interaction with either embedded booking area and remains disabled for that page visit, including review/reset/language changes. Booking fields are never passed to tracking. Standalone cleaning and SHINEX demos remain excluded entirely. Commercial contact links remain explicit WhatsApp links, separate from the demo forms. See `seo-analytics-audit.md` for the 2026-10-15 verification and account-side checks.
- Existing homepage anchors (`#how-it-works`, `#pricing`, `#faq`, `#work`, `#contact`) are retained alongside the new navigation anchors.

The reference's three desktop columns collapse to a step indicator over two columns on tablet, then a single active step with a native summary disclosure on mobile. The completed request is shown directly on mobile. Native controls, visible focus states, inline errors and reduced-motion handling support keyboard and touch use.

## Verification

`npm test` includes date rollover, validation, retained edits, review requirements, duplicate submission, reset and stale-date checks in `tests/booking-request-demo.test.mjs`. Existing translation, cleaning demo and automotive booking tests are retained. Browser verification should cover both languages at 360, 390, 768, 1280 and 1440 pixels, including selection transfer from the hero, back/edit, language switching, keyboard disclosures and a network/storage audit.
