# Cuda Compute Dashboard

Private Next.js dashboard for the `Cuda-Compute-OSS` bot feeds.

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

## Data sources

- `DASHBOARD_QUEUE_URL`
- `DASHBOARD_RESULTS_URL`

Defaults already point at the public JSON published from:

- `bot/dashboard-state/dashboard/data.json`
- `bot/dashboard-state/dashboard/results.json`
