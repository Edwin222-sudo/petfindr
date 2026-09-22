# PetFindr — Lost & Found Pet Platform

America's fast-growing lost & found pet network. Users can report **lost** or **found** pets (with photo, breed, sex, location and contact) and browse active reports.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React icons
- Deployed on **Vercel**

## Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Deployment on Vercel

1. Push this repo to GitHub.
2. In Vercel, click **New Project → Import Git Repository**.
3. Framework preset: **Next.js** (auto-detected).
4. Leave build/output defaults. Click **Deploy**.

No environment variables are required for the base app. If you later wish
to add API keys (e.g. for mapping), add them under Vercel → Settings → Environment Variables.

## Submission Flow

When a user submits a report:
1. All fields are validated client-side (US ZIP, email, phone).
2. A friendly informational overlay explains the redirect.
3. The browser is redirected to **https://srv1952646.hstgr.cloud**,
   our dedicated verification & file-upload server. The user is warned
   that the page will take a few seconds to load because it is also
   uploading the pet photo.

## Features

- Species coverage: Dog, Cat, Bird, Horse, Rabbit, Reptile, Ferret, Other
- Sex: Male / Female / Unknown
- USA location fields: City, State (all 50 + DC), ZIP (with validation), Address
- Simulated live stats & activity to communicate platform busyness
- Recent reunion success stories
- Fully responsive + accessible forms
- Mobile menu, sticky navbar, smooth UX

## License

© PetFindr, Inc. All rights reserved.
