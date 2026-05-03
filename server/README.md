Contact service (Express) — deploy on Railway

Environment variables (set these in Railway):

- `RESEND_API_KEY` — Required. API key for Resend (kept secret in Railway env).
- `CONTACT_FROM_EMAIL` — Optional. From address for outgoing email (default: `noreply@stemhub.ug`).
- `CONTACT_TO_EMAIL` — Optional. Destination address for contact messages (default: `info@stemhub.ug`).
- `FRONTEND_ORIGIN` — Optional. Set to your frontend origin to restrict CORS (default `*`).

Endpoint:
- `POST /contact` — Accepts JSON { name, email, organisation?, subject?, message }

Response:
- 200: { ok: true }
- 4xx/5xx: { error: '...' }

Usage:
1. Install dependencies: `npm install` (or `pnpm install`).
2. Start: `npm start`.

When deploying to Railway set `RESEND_API_KEY` and (optionally) `CONTACT_TO_EMAIL`.
