The site uses one set of pages and components for Arabic and English.

- `ar.json` preserves the original copy. `en.json` contains authored English copy with the same keys, grouped by page or UI area.
- `useI18n()` provides `locale`, `direction`, `t` and `setLocale`. Components commonly alias `t` to `tr` to avoid collisions with existing theme variables.
- `source(key)` supplies stable Arabic labels to the existing service data and content engine. Translate these labels at the point of display with `t(value)`. Service IDs, prices and form state remain independent of language.
- Dynamic messages use `t(key, [value1, value2])`. The catalogs must contain the same numbered interpolation values in both languages.
- `LocaleProvider` switches the UI immediately, sets the HTML language and direction, and stores a one-year preference cookie. `router.refresh()` updates server metadata and server-generated date labels without reloading the document.
- `getLocale()` reads that cookie for server rendering. Arabic is the default. Pages with localized metadata render per request; existing URLs and canonical links are retained.
- Dates use the selected locale while keeping the centre's time zone and booking rules unchanged.
- Portfolio previews use actual screenshots from each system: the original `.webp` in Arabic and the matching `-en.webp` in English.

Add finished copy to both catalogs and use `t(key)` in the UI. Keep customer-entered data intact. Run `npm test`, `npm run lint`, and the production build after changes. The localization tests check catalog completeness, interpolation values, stable service data and unconnected Arabic UI strings.
