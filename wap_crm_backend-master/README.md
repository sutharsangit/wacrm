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

---

## 🟢 WhatsApp Business Integration Module

We have added a modular WhatsApp Business Integration router containing Express controller placeholders returning mock data structure endpoints.

### Implemented API Placeholders

The following endpoints are mounted under `/api/v1/`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/v1/whatsapp/connect` | Initiates the WhatsApp onboarding selection wizard. |
| **POST** | `/api/v1/whatsapp/verify` | Submits GST/Website validation documents & verify phone. |
| **POST** | `/api/v1/whatsapp/send` | Dispatches single chat responses from sales reps. |
| **GET** | `/api/v1/whatsapp/messages` | Fetches synchronized inbound message thread lists. |
| **GET** | `/api/v1/whatsapp/templates` | Lists Meta-approved pre-defined screen message templates. |
| **POST** | `/api/v1/broadcast/send` | Triggers a bulk template campaign dispatch to queue. |
| **GET** | `/api/v1/campaigns` | Lists historical broadcast statistics (sent, read rates). |
| **GET** | `/api/v1/contacts` | Fetches CRM contact profiles synchronized with WhatsApp. |
| **POST** | `/api/v1/qualification/start` | Spawns AI conversational lead qualification chatbot. |
| **POST** | `/api/v1/qualification/submit` | Registers response and recalculates lead score. |

### Future Production Integrations Guide

To move this module from sandbox to production-grade:

1. **Meta Graph & Cloud API Connection**:
   - Replace the mock handlers inside `WhatsappController` with HTTP clients (e.g. `axios`) posting to the official Meta Graph API:
     `https://graph.facebook.com/v21.0/PHONE_NUMBER_ID/messages`
   - Include authorization headers utilizing the permanent Meta system-user access token.
2. **Inbound Webhook Listener**:
   - Expand `modules/webhooks/webhooks.routes.ts` with a GET verification route (`hub.mode`, `hub.challenge`, `hub.verify_token`) and a POST handler to intercept Meta’s inbound JSON payload structures (`value.messages`).
   - Push incoming WhatsApp messages onto Redis queues (BullMQ) to process without blocking.
3. **AI Qualification Service Integration**:
   - Inside `POST /qualification/submit`, hook up a service integrating OpenAI/Gemini SDKs.
   - Supply the screening questions list, current lead responses history, and compute a numeric score representing criteria match (Budget, Urgency, Demo request).
4. **Campaign Broadcast Queue**:
   - Scale the `POST /broadcast/send` route to fetch target contact numbers and schedule individual message deliveries via BullMQ workers to respect Meta messaging rate limits.

