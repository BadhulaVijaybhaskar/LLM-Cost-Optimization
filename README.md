# AI Unit Economics Engine (MVP)

Complete MVP for ingesting LLM usage events, calculating unit economics, and visualizing spending in a React dashboard.

## 1) Architecture

- **Backend**: Node.js + Express + TypeScript (`backend/`)
- **Database**: PostgreSQL with SQL migrations/seed (`backend/src/db`)
- **Frontend**: React + TypeScript + Vite + Recharts (`frontend/`)
- **Design**: Clean architecture style (`controllers`, `services`, `repositories`, `models`)

## 2) Features Implemented

1. Real-time usage ingest API (`POST /api/usage-events`)
2. Provider/model cost calculator (OpenAI + Anthropic env-driven pricing)
3. Feature spend aggregation + per-user cost attribution
4. Token efficiency score calculation
5. Alerts subsystem (DB + webhook/email stubs)
6. Model comparison simulation endpoint (`POST /api/simulate-model`)
7. Dashboard API (`GET /api/dashboard`)
8. Frontend dashboard with:
   - total monthly cost line chart
   - cost by feature table
   - token efficiency list
   - alerts list
   - model comparison simulator form

## 3) Setup

### Prerequisites

- Node.js 20+
- PostgreSQL 14+

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend default URL: `http://localhost:5173`
Backend default URL: `http://localhost:4000`

## 4) Database Schema (PostgreSQL)

- `usage_events`: raw usage + computed cost and efficiency.
- `alerts`: alert feed consumed by dashboard.

See SQL files:
- `backend/src/db/schema.sql`
- `backend/src/db/seed.sql`

## 5) Core API Routes

### Collector Route (real-time ingest)

`POST /api/usage-events`

```json
{
  "provider": "openai",
  "model": "gpt-4o",
  "userId": "user_123",
  "featureTag": "draft_assistant",
  "inputTokens": 2000,
  "outputTokens": 500,
  "requestId": "req_abc"
}
```

### Dashboard Route

`GET /api/dashboard`

Response shape:

```json
{
  "data": {
    "monthlyCost": [{ "month": "2026-02", "totalCostUsd": 121.22 }],
    "costByFeature": [{ "featureTag": "support_bot", "totalCostUsd": 38.42, "callCount": 920 }],
    "userAttribution": [{ "userId": "user_1", "totalCostUsd": 10.2, "totalInputTokens": 2000, "totalOutputTokens": 900 }],
    "efficiencyByFeature": [{ "featureTag": "summary", "avgEfficiencyScore": 1.24 }],
    "alerts": [{ "id": 1, "message": "Cost spike", "severity": "warning", "createdAt": "..." }]
  }
}
```

### Simulation Route

`POST /api/simulate-model`

```json
{
  "currentProvider": "openai",
  "currentModel": "gpt-4o",
  "targetProvider": "anthropic",
  "targetModel": "claude-3-5-sonnet",
  "avgInputTokens": 1200,
  "avgOutputTokens": 600,
  "monthlyCallVolume": 10000
}
```

## 6) Sample API Client

`backend/src/clients/sampleCollectorClient.ts` posts a sample event to ingest route.

Run:

```bash
cd backend
BACKEND_URL=http://localhost:4000 npx tsx src/clients/sampleCollectorClient.ts
```

## 7) Testing

Backend unit tests for cost and efficiency calculations:

```bash
cd backend
npm test
```

## 8) Environment Variables

`backend/.env.example`

- `DATABASE_URL`
- `PORT`
- Pricing vars (OpenAI/Anthropic per-1k token costs)
- Alert channel stubs (`ALERT_WEBHOOK_URL`, email fields)

`frontend/.env.example`

- `VITE_API_BASE`

## 9) Notes

- Defaults are provided for key environment variables so local unit tests can run without a fully populated `.env` file.
- SQL queries are parameterized via `pg` client placeholders.
- Pricing can be extended by adding entries in `pricingTable.ts`.
- Alerts integration points are intentionally stubbed for easy swap-in.
