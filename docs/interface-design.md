# Estanza interface direction

## Existing product and boundaries
Estanza is an Arabic-first, bilingual service for automotive centres. The main journey is understanding the booking product, trying its demo or live client examples, comparing packages, and contacting Estanza on WhatsApp. The home preview supports service, day, time, customer, message preview, and booking-log views. Showcase links lead to independently branded centre pages. Those pages have their own pricing, vehicle selection, schedules, maps, galleries, and WhatsApp serializers. Existing translations and uncommitted changes are part of the starting point.

This redesign covers Estanza's home, shared navigation/footer, project showcase, and legal-page presentation. Client brands retain their independent identities and booking logic. No routing, persistence, integrations, or architecture migration is needed.

## Art direction: the booking desk
The memorable surface is a usable booking request alongside close automotive photography. Avoid miniature device chrome and decorative dashboard metrics. Present client work as case studies; problems as short service-oriented rows; pricing as a clear two-option comparison.

Palette: chalk #f6f7f4; paper #ffffff; forest #153b32; ink #182c25; sage #e5ebe3; secondary text #53635a. Borders #ccd5cc. Green signals action and selection; no decorative gradients.

Type: existing self-hosted Cairo via next/font, with 400 body and 700/800 headings. Display 40–68px (Arabic relaxed line height), section headings 30–44px, subheads 20–24px, body 16–18px, supporting labels 13–14px. No tracked Arabic or uppercase eyebrows.

Layout: 1200px content boundary, 24–48px gutters, 4/8px spacing rhythm, 80–112px sections on desktop and 56–64px on mobile. Content aligns to the reading direction. Controls use 6px corners; the preview uses 12px corners; content does not require a card.

Home structure:
```
[Brand                    Navigation / language / contact]
[Large product promise                  Description / CTA]
[Automotive photograph    |     Interactive booking desk ]
[Setup timing             |     App / subscription facts ]
[Actual client case studies, unequal columns             ]
[Problem statement        |     Three practical rows     ]
[Three sequential steps across one sage surface          ]
[Launch package           |     Custom requirements      ]
[FAQ introduction         |     Native disclosure list   ]
[Contact invitation                      WhatsApp action ]
[Brand / contact / legal                                 ]
```

On mobile the introduction, preview and supporting content stack in reading order; photo becomes a shallow context image. All booking controls remain visible and at least 44px high. Preview sections use native radio groups and explicit view buttons; keyboard focus moves to the resulting preview heading on submit.

## Review against brief
Rejected the first skill search's motion-driven/futuristic suggestion: it serves automotive entertainment better than local workshop operators. A narrower search supported functional hierarchy and progressive disclosure. Avoid a generic hero-plus-three-cards layout by making the working product surface and actual case studies primary. Keep Estanza's recognisable green and Cairo rather than introducing unrelated trend palettes or decorative typefaces.

## Implementation principles
Scoped CSS module shared by Estanza components, semantic tokens, logical CSS properties for RTL/LTR, native forms and details, clear focus/hover/pressed states, no looping motion. Keep static data outside render, derive selections from IDs, and remove the homepage's GSAP dependency. Use next/image with reserved dimensions and responsive sizes.
