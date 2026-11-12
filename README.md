# STP ITS Blueprint – website

Static site (HTML/CSS/JS + three.js, vendored) served by nginx in Docker.

## Run
```bash
cp .env.example .env        # set STP_PORT / STP_BIND
docker compose up -d --build
# open http://localhost:${STP_PORT}
```

## Deploy on a VPS with other projects
- Pick a free port in `.env` (e.g. `STP_PORT=8091`).
- Behind an existing reverse proxy (nginx/Caddy/Traefik): set `STP_BIND=127.0.0.1` and proxy your domain to `127.0.0.1:${STP_PORT}`.
- Health check: `GET /healthz`.

## Edit content
- Text (EN/ID): `site/assets/js/content.js`
- 3D site layout: `site/assets/js/layout.js` (x = east, z = south)
- 3D rendering: `site/assets/js/map3d.js` · page logic: `site/assets/js/app.js` · styles: `site/assets/css/style.css`

Language: default English, `?lang=id` for Bahasa Indonesia (or the EN/ID toggle).
