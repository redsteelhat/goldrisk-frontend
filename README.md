# GoldRisk Frontend

GoldRisk Frontend is the web interface for GoldRisk AI, an enterprise-oriented gold trading and risk management platform.

The application provides the user-facing dashboard layer for authentication, trading/risk workflows, reporting screens and operational visibility. It is designed to work with the GoldRisk backend API.

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **UI:** Tailwind CSS
- **Data Fetching:** TanStack Query
- **Forms:** React Hook Form + Zod
- **HTTP Client:** Axios
- **Date/Number Utilities:** Day.js, Decimal.js
- **Icons:** Lucide React

## Core Scope

- Authentication screens
- Dashboard shell
- Gold trading and risk management workflows
- Reporting-oriented pages
- API-driven frontend architecture
- Production-ready frontend structure for business software

## Local Development

```bash
npm install
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```

## Quality Commands

```bash
npm run lint
npm run format:check
npm run format
```

## Backend Integration

This frontend should be connected to the GoldRisk backend API. Keep API base URLs, tokens and environment-specific values outside the source code by using environment variables.

Recommended local environment pattern:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

Update this value according to the actual backend host and deployment environment.

## Repository Notes

This repository is kept focused on the frontend application layer. Backend services, database logic and financial domain rules should remain in the backend repository.
