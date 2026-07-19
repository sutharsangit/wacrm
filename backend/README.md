# AI Lead Qualification & WhatsApp CRM SaaS Backend

## Project Overview
A highly scalable, multi-tenant SaaS backend that centralizes leads from Meta Ads, Google Ads, and custom Webhooks. It automatically qualifies leads using AI through WhatsApp conversations, allowing sales teams to focus on hot prospects.

## Architecture
- **Language**: TypeScript
- **Runtime**: Node.js (Express.js)
- **Database**: PostgreSQL with Prisma ORM
- **Cache & Queues**: Redis & BullMQ
- **Validation**: Zod
- **Authentication**: JWT & bcrypt

## Folder Structure
```text
src/
├── app/          # Express setup
├── config/       # Redis, Swagger, Env configuration
├── modules/      # Business logic grouped by feature (Auth, CRM, Leads, etc.)
├── middleware/   # Express middlewares (auth, validation, error handler)
├── services/     # 3rd party integrations (WhatsApp, AI, Payment)
├── jobs/         # Background job initializers
├── queues/       # BullMQ queue configurations
├── utils/        # Helpers (logger, JWT)
```

## Installation
1. `npm install`
2. Create `.env` from `.env.example` (or set the variables manually).
3. Start Redis and Postgres (or use `docker-compose up -d db redis`).
4. `npx prisma generate`
5. `npx prisma migrate dev`
6. `npm run dev`

## Docker Setup
Run `docker-compose up --build -d` to spin up the API, Postgres, and Redis.

## Testing
- Tests are configured to run via `jest` and `supertest`.
- Execute tests with `npm test`.
