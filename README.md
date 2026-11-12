# STP ITS Blueprint

An interactive website that presents the **100-day blueprint for the Science Techno Park (STP) of Institut Teknologi Sepuluh Nopember (ITS)**.

It was built as the STP team's group assignment in the **UTM–ITS STELLAR 2026** programme (Science & Technology Ecosystem Leadership for Acceleration & Research Translation), covering Module 6 (Innovation Showcase), Module 10 (Techno Park Operating Model) and Module 11 b–g (100-Day TTO & TP Launch Blueprint).

**Access:** [its.id/stpbp](https://its.id/stpbp)

## What the site shows

- **3D site plan of STP ITS.** A stylised map of the park area (test circuit, cluster buildings, Robotics Center, the Research Center tower that houses DIKST, the TTO and the GRIT gallery, and ILBI). You can switch between three scenarios: **Now**, **Day 100** and **2030**.
- **Videos button** (bottom right, above the access link): a drop-up list of DIKST/GRIT YouTube videos that play in a pop-up player, plus a link to the DIKST channel. Edit `VIDEOS` in `content.js` to add more.
- **Profile tab.** The DIKST ITS profile video (muted, looping, 720p, ~5 MB), loaded only when the tab is opened.
- **2D map tab.** A real map (satellite imagery or OpenStreetMap streets) of the STP area. It has no points by default; add your own in `site/assets/js/map2d-points.js`.
- **Diagnosis.** Eight current issues with their impact and root cause, plus the evidence from the OTK ITS 2024 organisation chart.
- **Roadmap.** The STP ITS roadmap, from 2018 to 2045.
- **100-day plan.** Five priorities (P1–P5) with Day 30/60/100 outputs, owners and a Gantt chart.
- **Quick wins, governance, resources, risks and policy handover.** Module 11 c–g.
- **Showcase & operating model.** GRIT as the innovation gateway (Module 6), and Build/Share/Partner choices (Module 10).
- **Future infrastructure.** The Eco AI Data Center Living Lab concept, with clean-room plans handled as partner/defer.

The site is bilingual: **English (default)** and **Bahasa Indonesia** (use the EN/ID toggle or add `?lang=id` to the URL).

> The map is a schematic traced from aerial imagery, not a survey drawing. Targets and owners are proposals for discussion. Positions follow OTK ITS 2024, and no personal names are used.

## Run with Docker

```bash
cp .env.example .env          # set STP_PORT (default 8080) and STP_BIND
docker compose up -d --build
# open http://localhost:<STP_PORT>
```

- Behind a reverse proxy on a VPS, set `STP_BIND=127.0.0.1` and point your domain to `127.0.0.1:<STP_PORT>`.
- Health check: `GET /healthz`.

## Project structure

```
site/
  index.html
  assets/css/style.css     styles (white paper + ITS blue)
  assets/js/content.js     all text, EN/ID
  assets/js/layout.js      map layout (x = east, z = south)
  assets/js/map3d.js       three.js scene (3D tab, default)
  assets/js/map2d.js       Leaflet map (2D tab)
  assets/js/map2d-points.js  points for the 2D map – empty, fill in yourself
  assets/js/app.js         page logic
  assets/vendor/three/     three.js r160 (MIT), vendored
  assets/vendor/leaflet/   Leaflet 1.9.4 (BSD-2), vendored
Dockerfile · docker-compose.yml · nginx.conf · .env.example
```

## Adding points to the 2D map

Edit `site/assets/js/map2d-points.js` and add entries to `points`:

```js
{ lat: -7.2790, lng: 112.7985, site: 'circuit', label: { en: 'Test Circuit', id: 'Sirkuit Uji' }, status: 'issue' }
```

- `site` links the point to a panel (ids: `stp, circuit, auto, ict, creative, maritime, labs, rc, ilbi, ecodc, cleanroom`).
- `status` sets the colour: `issue`, `active`, `mature` or `plan`.

Rebuild after editing: `docker compose up -d --build`. Map tiles load from OpenStreetMap and Esri, so the 2D tab needs internet access.

## Sources

DIKST ITS "Pengenalan Science Techno Park (STP) ITS" briefing; OTK ITS 2024 (Bidang IV); Rector Regulation No. 22/2026 on Science & Technology Park governance; DIKST and GRIT videos; UTM–ITS STELLAR 2026 Modules 6 and 10.
