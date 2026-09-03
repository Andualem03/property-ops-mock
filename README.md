# Mock Round 3 — Property Ops Command Center

This is a small, already-built (but broken/incomplete) property management
tool. Real estate companies use tools like this to track properties, tenants,
and maintenance requests. Your job: build on it, fix what's broken, and ship
what you can, prioritizing what matters most — you are **not** expected to
finish everything.

## Setup (does NOT count against your 2 hours)
1. Create a free Postgres database at https://neon.tech (same as the real test).
2. Run `schema.sql` then `seed.sql` against it (Neon has a SQL editor in the
   browser — easiest option, no extra tools needed).
3. Copy `.env.example` to `.env` and paste in your Neon connection string.
4. `npm install`
5. `npm run dev` (or open in Codespaces and it'll prompt you)
6. Confirm the app loads before starting your timer.

## The task (2-hour block, same structure as the real test)
- Minutes 0–105: build, debug, test, improve, commit, open a PR, deploy.
- At 105: stop code changes.
- 105–120: record your screen-and-voice walkthrough.
- +10 min after: submission only, no code.

## Known issues (more than you'll finish — prioritize)
1. **Security bug:** login compares passwords in plain text instead of the
   hashed value. Find it and fix it properly.
2. Maintenance tab gets stuck on "Loading..." forever — no visible console
   error. (Same *class* of bug as before — different cause. Don't assume it's
   the same fix.)
3. Property status filter doesn't actually filter anything.
4. Rent amounts sort like text, not numbers (e.g. "9" sorts after "10").
5. Filtering tenants by property crashes the server instead of returning
   results.
6. Deleting a maintenance request has no confirmation step.
7. Tenants table breaks/overflows on mobile widths.
8. Form inputs aren't properly labeled (accessibility).
9. Currency displays as raw numbers (e.g. `125000` instead of `$1,250.00`).
10. Tenant list has no pagination — it just dumps everything.
11. There's no way to update a maintenance request's status once created —
    that endpoint was never built.
12. No automated tests exist yet.

## Stack
Vercel serverless functions (`/api`) + a plain HTML/CSS/JS frontend
(`/public`) + Postgres. Deliberately close to what you already know from
Round 1, plus a real database this time.

## Deploy
Import this repo into your existing free Vercel account, add the
`DATABASE_URL` environment variable in Vercel's project settings (same value
as your local `.env`), and deploy.

Good luck — go after what matters most first.
