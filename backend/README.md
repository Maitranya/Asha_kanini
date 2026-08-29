# Kanini Padhai — Backend API

Node.js + Express + PostgreSQL API for teacher login, student profiles, and
per-student progress tracking on the Kanini Padhai learning trail.

## What this covers (v1)

- Teacher signup / login (email + password, bcrypt-hashed)
- JWT access tokens (15 min) + rotating refresh tokens in an httpOnly cookie
- Student profiles under a teacher (name, class 1–8)
- Progress tracking per student per resource (mark/unmark complete)

## What this does NOT cover yet

- Student self-login (PIN field exists in the schema, not wired up)
- Assessment portal integration (kept as an outbound link per your call)
- Other subjects besides Maths (schema already supports it via `subject` — no migration needed to add more later)

## Local setup

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL and JWT_ACCESS_SECRET
npm run migrate        # creates tables
npm run dev             # starts on http://localhost:4000
```

Generate a secret for `JWT_ACCESS_SECRET`:
```bash
openssl rand -hex 32
```

## Deploying

This is a plain Node process + Postgres — it runs anywhere that offers both:

- **Render / Railway** — easiest for a first deploy. Add a Postgres instance,
  set the env vars from `.env.example`, set the start command to `npm start`
  and build command to `npm install && npm run migrate`.
- **Your own VPS / alongside kanini.ashanet.org** — if that server already
  runs Node, you can deploy this the same way, behind nginx as a reverse
  proxy on a subpath or subdomain like `api.ashanet.org`.
- **Docker** — not included yet; ask if you want a Dockerfile added.

Whichever host you pick, set `CORS_ORIGINS` to the exact domain(s) the React
frontend will be served from, and set `NODE_ENV=production` so refresh-token
cookies are sent with `Secure; SameSite=None` (required for cross-site
cookies over HTTPS).

## API summary

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | – | Create a teacher account |
| POST | `/api/auth/login` | – | Log in, returns access token + sets refresh cookie |
| POST | `/api/auth/refresh` | cookie | Rotate refresh token, get new access token |
| POST | `/api/auth/logout` | cookie | Revoke refresh token |
| GET | `/api/students` | Bearer | List this teacher's students |
| POST | `/api/students` | Bearer | Add a student (`name`, `classLevel`) |
| PATCH | `/api/students/:id` | Bearer | Update a student |
| DELETE | `/api/students/:id` | Bearer | Remove a student |
| GET | `/api/students/:id/progress?subject=Maths` | Bearer | Get a student's completed resources |
| POST | `/api/students/:id/progress` | Bearer | Mark a resource complete |
| DELETE | `/api/students/:id/progress/:resourceKey` | Bearer | Un-mark a resource |

All `Bearer`-marked routes need `Authorization: Bearer <accessToken>`.

## Frontend integration notes

The React app currently keeps progress in local component state
(`useState(new Set())`). To wire it to this API:

1. On login, store the returned `accessToken` in memory (e.g. React context —
   not localStorage, to limit XSS exposure) and keep an axios/fetch wrapper
   that retries once via `/api/auth/refresh` on a 401.
2. Add a student picker (or auto-select if a teacher only has one student
   profile active) so the app knows which `studentId` to save progress under.
3. Replace `toggleComplete` with a call to `POST /api/students/:id/progress`
   (or the `DELETE` variant to un-mark), and load initial state from
   `GET /api/students/:id/progress` on mount.
4. `resourceKey` should stay exactly `${classLevel}-${term}-${topic}-${title}`
   to match what the frontend already generates.

Happy to do this wiring as the next step once the backend is deployed
somewhere reachable.
