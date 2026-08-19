# Design — Liays Inc

A locked design system for this site. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

Established by the homepage redesign (2026-08-16) and extended across all pages.

## Genre

**Editorial**, tone **workmanlike**. Grounded and plainspoken — a working studio
selling to plumbers, clinics, and restaurants, not a luxury agency. Credibility
over flourish. The page should read as if a person wrote it and stands behind
the prices.

## Macrostructure family

Pages within a family share the family's shape; they vary only in component
archetypes.

- **Marketing pages** — Split Studio. Every major block divides the screen: claim
  on one side, proof on the other, direction alternating down the page.
  (`/`, `/services`, `/notion-training`, `/pricing`)
- **Content pages** — Long Document. Continuous prose, inline heads, no marketing
  scaffolding. (`/about`)
- **Index pages** — Portfolio Grid. The work is the product; cards are the page.
  (`/work`)
- **Form pages** — Split Diptych. Form one half, reassurance the other.
  (`/contact`)

## Theme

Values are hex because that is what ships today. Converting to OKLCH is a
rebrand-time task — it makes tints and shades predictable to generate.

- `--color-ink`            `#12160f`  warm near-black, olive cast — never `#000`
- `--color-ink-soft`       `#1b2118`  raised surface on dark
- `--color-paper`          `#f5efe3`  warm cream — never `#fff`
- `--color-paper-dim`      `#eae0cc`
- `--color-fg-on-ink`      `#f5efe3`
- `--color-fg-on-paper`    `#12160f`
- `--color-muted-on-ink`   `#9a9c8f`
- `--color-muted-on-paper` `#6b6552`
- `--color-accent`         `#d5642f`  terracotta — the single anchor hue
- `--color-accent-soft`    `#e88656`
- `--color-gold`           `#c79a3e`  secondary, sparing

**Accent discipline:** terracotta stays under ~5% of any viewport. It marks the
primary action, the section numeral, and one emphasis word — nothing else.

## Typography

- Display: Space Grotesk, 700, roman. Never italic.
- Body: Manrope, 400/500.
- Display tracking: `-0.02em` at large sizes (`tracking-tight`).
- Hero headline ≤ 7 words where written fresh.
- Numerals in any price, ledger, or spec table: `tabular-nums`.

## Spacing

Tailwind's 4-pt scale. Sections breathe at `py-20 lg:py-28`; the closing CTA gets
more (`py-24 lg:py-32`). Do not pad every section identically — vary deliberately.

## Motion

- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` — one curve, used everywhere.
- Reveal: one `<Reveal>` per structural half, opposite halves staggered by
  `0.12s`. **Not** one per element — that is animate-on-scroll-on-everything.
- Reduced motion: handled globally in `globals.css`.

## Microinteractions stance

- Silent success. No celebratory toasts.
- Focus rings appear instantly — never transitioned.
- Hover affordances always have a focus equivalent.
- No `transition-all`; name the properties.

## CTA voice

- Primary: filled terracotta pill (`MagneticButton` default), verb-first label.
- Secondary: outline or ghost, never competing in weight with the primary.
- One primary action per section. The closing CTA is a single button, not two.

## Per-page allowances

- Marketing pages MAY use a proof column (ledger, checklist, spec table).
- Content pages: typography only.
- No page ships enrichment — no WebGL, no fake device chrome, no stock imagery.

## What pages MUST share

- The wordmark and its terracotta full stop.
- The accent colour and its ≤5% placement discipline.
- Space Grotesk + Manrope.
- The CTA voice (pill shape, padding rhythm, verb-first copy).
- Nav **N9 edge-aligned minimal** and footer **Ft5 statement**.
- **Zero eyebrows.** No `01 · SECTION` kickers, no `SectionLabel`. Section numerals
  are allowed only where content is genuinely ordinal (the two crafts), and then
  stacked above the heading in the same column — never tag-left/heading-right.

## What pages MAY differ on

- Macrostructure, within the page-type family above.
- Which proof device the diptych's second half carries.
- Section count and rhythm.

## Honest-copy rule

No invented metrics, testimonials, client logos, or case-study numbers. If a
number isn't real, the section ships without it or uses a different shape. This
rule is load-bearing: the site's whole pitch is transparent pricing.
