# Mission Bay Market Brief — Pear VC

Dense, on-brand one-pager produced under the Resource brand-guard system.
Anchored at **1800 Owens Street** (Pear Studio SF), with every property
geocoded via Mapbox at render time.

## Files

- `mission-bay-market-brief.html` — the deliverable. Open in any modern
  browser. The map loads tiles from Mapbox and geocodes every address
  against the Mapbox Geocoding API; results are cached in localStorage
  so re-opens are instant.
- `config.example.js` — template for the local Mapbox token.
- `config.local.js` — your local copy of the token; gitignored. Create
  it before opening the HTML: `cp config.example.js config.local.js`
  then paste your `pk.` Mapbox public token in.
- `scripts/geocode.mjs` — standalone Node script that geocodes every
  property in the brief and writes `geocoded.json`. Run it locally to
  refresh / validate the fallback coordinates baked into the HTML.
- `assets/logos/` — bundled Resource logo set.

## Printing to PDF

The map is interactive in HTML. To export a print-ready PDF:

1. Open `mission-bay-market-brief.html` in Chrome or Safari.
2. Wait a second for the map to fully render (markers and walk rings appear).
3. **File → Print → Save as PDF**, with **paper size: Tabloid (17 × 11 in)**,
   **orientation: Landscape**, **margins: None**, and **background graphics: on**.

A pre-rendered PNG/PDF is bundled in the repo for reference, but the map
panel will be blank in those files — they were generated in an environment
without outbound access to `api.mapbox.com`. Re-export from your own
browser to capture the live map.

## Data sources

- **Available spaces** — CoStar export (5/19/2026), 7 buildings in
  Mission Bay / China Basin submarket.
- **Recent comparables** — CompStak export (5/19/2026), 8 transactions
  across 7 buildings, Q3 2024 → Q1 2026.

## Brand notes

Built with the Resource brand-guard rules:

- DM Serif Display for headings, DM Sans for body (live type system).
- Peacock green leads, gold and purple as selective accents; no gradients,
  no shadows, no decorative effects.
- Mapbox `light-v11` style with the base land color softened to the
  Resource paper neutral (`#F4EFE6`) and water tinted to a muted peacock
  (`#C9DAD6`) at runtime, so the basemap recedes and the markers carry
  the brand.
- Softened neutrals on a warm paper bg; flat color blocks; restrained
  editorial layout.

## Geocoding

Every property in `PROPERTIES` (inside the HTML) is geocoded against
Mapbox v6 forward-geocoding on page load, biased to a Mission Bay
proximity centroid. Results are cached client-side in `localStorage`
under the key `rsrc:geocache:v2`. If geocoding fails (offline, rate
limit), the script falls back to a baked-in lng/lat per address so the
map is never empty.

A small `offset` field is applied to a handful of pins where multiple
properties share a single street address — the two 185 Berry buildings,
the two Mission Rock B leases (Coinbase + Warriors), the two Alexandria
455 MBB entries (availability + Nurix comp), and the three 1800 Owens
entries (Pear + availability + Nudge comp). Offsets keep the markers
visually separable without misrepresenting location.

## Things to fill in / iterate

- Confirm Pear Studio SF suite number if a finer anchor is wanted.
- Asking rents come through as "Withheld" from the CoStar export for
  every available; swap in broker intel when ready.
- The four market-band stats are computed from the supplied PDFs — swap
  for CoStar / Cushman submarket vacancy and rent-trend numbers if those
  are preferred.
