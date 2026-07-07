# Cuda Compute Dashboard

Public Next.js dashboard for the `Cuda-Compute-OSS` bot feeds.

## Run

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

Static export is written to `out/`.

## Data sources

- `DASHBOARD_QUEUE_URL`
- `DASHBOARD_RESULTS_URL`

Defaults already point at the public JSON published from:

- `bot/dashboard-state/dashboard/data.json`
- `bot/dashboard-state/dashboard/results.json`

## GitHub Pages

This repo is configured to deploy to GitHub Pages with GitHub Actions.

For the current repo name, the published URL is:

- `https://zeokin.github.io/Cuda-Compute-Dashboard/`

The workflow file is:

- `.github/workflows/deploy-pages.yml`

Before the first deploy:

1. Push the repo to GitHub.
2. In GitHub, open `Settings -> Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main` or run the workflow manually.

## Root domain note

If you want this dashboard at `https://zeokin.github.io/` instead of the repo path, you should publish it from the special repository named:

- `zeokin.github.io`

In that case, set:

- `NEXT_PUBLIC_BASE_PATH=""`

and deploy from that root-site repo instead of `Cuda-Compute-Dashboard`.
