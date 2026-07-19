# Backend System Integration Requirements

This document outlines the API specifications, webhook models, and service architectures the backend engineering team must build to integrate with the SaaS frontend.

---

## 🔑 1. Authentication & Workspace APIs

### POST `/api/auth/register`
- **Request Body**: Name, Business Name, Email, Password, Industry.
- **Action**: Create Workspace organization, create Admin user, generate session tokens, trigger welcome email.

### POST `/api/auth/login`
- **Request Body**: Email, Password.
- **Response**: JWT session token, User profile, Workspace credentials, Onboarding status.

### POST `/api/auth/forgot-password`
- **Request Body**: Email.
- **Action**: Generate unique reset hash, send password reset link via SMTP.

---

## 📋 2. Leads Management APIs

### GET `/api/leads`
- **Query Params**: `search`, `status`, `source`, `sortBy`, `sortOrder`, `page`, `limit`.
- **Response**: Paginated array of Lead entities + total counts.

### POST `/api/leads`
- **Request Body**: Name, Phone, Email, Company, Source, AssignedUserId.
- **Action**: Create lead record, set status = `New`.

### GET `/api/leads/:id`
- **Response**: Detailed Lead information including nested Notes, CallLogs, TimelineEvents, and QAList.

### PATCH `/api/leads/:id`
- **Request Body**: Partial`<Lead>` (e.g., status, assignedUserId).
- **Action**: Update lead fields, log a status/assignment change event to Timeline.

### POST `/api/leads/:id/notes`
- **Request Body**: Content.
- **Action**: Insert Note, record Timeline event.

### POST `/api/leads/:id/calls`
- **Request Body**: Duration, Description.
- **Action**: Insert CallLog, record Timeline event.

---

## 💬 3. WhatsApp CRM & Messaging APIs

### GET `/api/chats`
- **Query Params**: `filterAi` (boolean), `search`.
- **Response**: List of active chat threads with unread counts and last message details.

### GET `/api/chats/:leadId/messages`
- **Response**: Full chronological array of Messages in the thread.

### POST `/api/chats/:leadId/messages`
- **Request Body**: Text, SenderType (`agent` | `ai`).
- **Action**: Dispatch message via WhatsApp Business API Cloud Endpoint. Save message to database with status = `sent`.

### PATCH `/api/chats/:leadId/ai-toggle`
- **Request Body**: `aiMode` (boolean).
- **Action**: Enable/disable automated AI replies for this conversation.

---

## 📣 4. Campaigns & Webhook APIs

### POST `/api/campaigns/broadcast`
- **Request Body**: Name, TemplateId.
- **Action**: Query leads list matching campaign category, queue WhatsApp message dispatches using Redis/BullMQ.
- **Response**: Campaign ID, status = `Scheduled` or `Sending`.

### POST `/api/webhooks/meta-whatsapp`
- **Verification**: Validate Hub Signature verification from Meta.
- **Action**: Parse incoming WhatsApp messages (`statuses`, `messages`).
  - If a message status (sent/delivered/read) is received, update matching message status in database and emit Socket.io event to frontend.
  - If a customer message is received:
    - Save message.
    - If `aiMode` is active for thread, trigger the **AI Qualification Engine**.
    - Emit message event to frontend via sockets.

### POST `/api/webhooks/meta-leads`
- **Action**: Pull lead details using Meta Lead ID, create Lead, trigger AI welcome message on WhatsApp.

---

## 🤖 5. AI Qualification Service

- **Trigger**: New customer message on an active AI-triage chat thread.
- **Workflow**:
  1. Retrieve chat history + company qualification criteria parameters.
  2. Send context payload to LLM (e.g. Gemini 1.5 Flash API) with system prompt instructions:
     - "Qualify customer for [Industry] using [Q1, Q2, Q3]."
     - "Keep replies brief and professional."
     - "Determine if lead is Hot/Warm/Cold and return JSON format."
  3. If LLM completes the questions:
     - Calculate overall Lead Score.
     - Move Lead status to `Qualified`.
     - Update timeline event logs.
     - Reassign lead to active sales agent.
  4. Save AI response text to database and dispatch via WhatsApp.
