# SEO and Analytics audit — 2026-10-15

## Confirmed root cause

The published homepage made **zero Google tag requests** in a clean Chrome session. `MarketingAnalytics.tsx` classified `/` as a demo, returned `null` and set `ga-disable-G-KQ37ND6FP7` to true. Homepage visitors therefore could not appear in this property's Realtime report through the installed tag.

The homepage now loads the existing tag `G-KQ37ND6FP7` using Next Script `afterInteractive`. The initial config sends the pageview; no extra manual pageview was added. The downloaded public tag configuration has history-based enhanced measurement enabled, so adding manual route events would risk duplicates. Initial page location excludes query strings; advertising signals are disabled and user_data is explicitly empty.

The embedded demo's pointer/focus/input/submit interactions disable collection before form use. That flag stays set during review, reset and language changes on the same route. The standalone `/cleaning/demo` and `/demos/shinex` routes remain excluded from loading the tag. This deliberately measures the marketing visit rather than treating sample submissions as real leads. Existing conversion tracking exclusions are unchanged.

## SEO

- Published homepage returns 200 with one H1, English language/direction, title, description and index/follow metadata.
- Published apex domain `https://estanza.dev/` redirects 308 to `https://www.estanza.dev/`, but the canonical, sitemap and robots sitemap URL previously used the apex.
- Added tested origin normalisation so known Estanza domains resolve to `https://www.estanza.dev`; other preview/custom origins are preserved.
- robots and sitemap work. No unsupported claim of confirmed Google indexing or ranking is made.
- The old homepage social image marketed automotive-only services and automatic confirmation. Added a code-rendered 1200×630 PNG at `/share` using the existing Estanza logo, forest green identity and current booking-request positioning. Homepage Open Graph and Twitter metadata now use it; the old image URL still works.
- No public indexing was enabled for private customer demos.

## Verification

- Browser comparison: published homepage zero tag loads; local homepage one tag load and a GA4 `page_view` request addressed to `G-KQ37ND6FP7`.
- Test uses the actual downloaded public Google tag JavaScript. Collection endpoints are intercepted with 204 responses **before reaching Google**, so the test does not pollute production statistics. This proves client emission, not ingestion into the user's private Analytics property.
- No collection after embedded demo interaction or language switching. Fresh standalone demo visits make no external requests.
- Canonical, robots, sitemap, shared-image response and no browser errors verified locally.
- `npm run lint`, `npx tsc --noEmit`, `npm test` (6 test files), `npm run build`.

## Outstanding account/deployment checks

1. The supplied dashboard identifies account `409514381` and property `556077175`. These numeric IDs do **not** identify its web Measurement ID. Confirm Admin → Data streams → the Estanza web stream shows `G-KQ37ND6FP7`. Do not replace it with the numeric property ID.
2. The private Analytics dashboard requires the user's login. Account filters, stream association, actual ingestion and Search Console indexing cannot be verified from the repository/public tag alone.
3. Public tag configuration also enables automatic user-provided-data detection and form measurement. Review these settings in Google tag / Enhanced measurement and disable them for this demonstration site if they are not intentionally needed. The code stops collection before embedded demo use; it does not change account settings remotely.
4. Deploy these reviewed changes through the normal workflow before expecting the published homepage to send visits. Nothing was deployed or committed during this task.
5. After deployment, use an ordinary browser without a tracking blocker, verify the web stream ID, open the homepage without entering the demo, then check Realtime. Browser blockers and account filters can still suppress visits independently of this fix.

Official references:
- https://developers.google.com/analytics/devguides/collection/ga4/views
- https://support.google.com/analytics/answer/9539598?hl=en
- https://support.google.com/analytics/answer/9216061?hl=en
