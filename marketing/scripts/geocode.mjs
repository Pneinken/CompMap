#!/usr/bin/env node
// Geocode every property in the brief via Mapbox.
// Run locally (this repo's sandbox cannot reach api.mapbox.com):
//   MAPBOX_TOKEN=pk.eyJ... node marketing/scripts/geocode.mjs
//
// Writes marketing/geocoded.json. Use to validate / refresh the
// fallback coordinates inside the HTML.
import { writeFileSync } from "node:fs";

const TOKEN = process.env.MAPBOX_TOKEN || process.argv[2];
if (!TOKEN || !TOKEN.startsWith("pk.")) {
  console.error("usage: MAPBOX_TOKEN=pk.... node marketing/scripts/geocode.mjs");
  process.exit(1);
}

const PROPERTIES = [
  { id: "pear",                  q: "1800 Owens Street, San Francisco, CA 94158" },

  { id: "avail_1_wharfside",     q: "185 Berry Street, San Francisco, CA 94107" },
  { id: "avail_2_pier70",        q: "Pier 70, San Francisco, CA 94107" },
  { id: "avail_3_2800_3rd",      q: "2800 3rd Street, San Francisco, CA 94107" },
  { id: "avail_4_berry_bldg",    q: "185 Berry Street, San Francisco, CA 94107" },
  { id: "avail_5_455_mbb",       q: "455 Mission Bay Boulevard South, San Francisco, CA 94158" },
  { id: "avail_6_1450_owens",    q: "1450 Owens Street, San Francisco, CA 94158" },
  { id: "avail_7_1800_owens",    q: "1800 Owens Street, San Francisco, CA 94158" },

  { id: "comp_A_1070_maryland",  q: "1070 Maryland Street, San Francisco, CA 94107" },
  { id: "comp_B_1500_owens",     q: "1500 Owens Street, San Francisco, CA 94158" },
  { id: "comp_C_1051_3rd",       q: "1051 3rd Street, San Francisco, CA 94158" },
  { id: "comp_E_499_illinois",   q: "499 Illinois Street, San Francisco, CA 94158" },
  { id: "comp_F_550_terry",      q: "550 Terry A Francois Boulevard, San Francisco, CA 94158" },
  { id: "comp_G_455_mbb",        q: "455 Mission Bay Boulevard South, San Francisco, CA 94158" },
  { id: "comp_H_1800_owens",     q: "1800 Owens Street, San Francisco, CA 94158" },
];

const results = {};
for (const { id, q } of PROPERTIES) {
  const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(q)}&country=us&proximity=-122.39,37.77&limit=1&access_token=${TOKEN}`;
  const r = await fetch(url);
  if (!r.ok) { console.error("http", r.status, id, q); continue; }
  const j = await r.json();
  const f = j.features?.[0];
  if (!f) { console.error("no match", id, q); continue; }
  const [lng, lat] = f.geometry.coordinates;
  results[id] = { q, lng, lat, name: f.properties?.full_address || f.properties?.name };
  console.log(`${id.padEnd(28)} ${lng.toFixed(6)}, ${lat.toFixed(6)}  ${f.properties?.full_address ?? ""}`);
}

writeFileSync(new URL("../geocoded.json", import.meta.url), JSON.stringify(results, null, 2));
console.log("\nwrote marketing/geocoded.json");
