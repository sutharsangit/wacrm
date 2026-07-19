# Database Schema Documentation

The database is built using PostgreSQL and managed by Prisma ORM.

## Multi-tenant Architecture
Every business entity is tied to an `Organization`. Almost all operational tables include an `organizationId` foreign key to ensure complete data isolation across tenants.

## Core Models
- **Organization**: The top-level tenant entity holding business details, settings, and billing information.
- **User**: Employees or owners associated with an organization. Managed with Role-Based Access Control (RBAC).
- **Role & Permission**: Defines what actions a user can perform (e.g., Owner, Admin, Sales).

## CRM & Lead Models
- **Lead**: The core prospect entity. Stores contact info, lead source, score, and current status.
- **LeadTimeline**: An append-only log of every significant action performed on a lead (created, assigned, WhatsApp message sent, call logged).
- **LeadAssignment**: Tracks which sales executive is currently responsible for the lead.
- **LeadScore / LeadQualification**: Used to store AI-generated scores and answers to qualification questionnaires.

## Interaction Models
- **Note**: Internal team notes on a lead.
- **CallLog**: Records of phone calls, durations, and outcomes.
- **FollowUp**: Scheduled tasks (Call, Email, WhatsApp) for future engagement with a lead.

## WhatsApp & Messaging Models
- **Conversation**: Represents a chat thread with a lead via WhatsApp.
- **Message**: Individual inbound or outbound messages.
- **Template**: Pre-approved WhatsApp template messages.
- **BroadcastCampaign**: Configurations for bulk messaging segments of leads.

## Webhook & System Models
- **Webhook / WebhookLog**: Configurations and raw payload logs for inbound integrations (Meta/Google).
- **DashboardSnapshot**: Pre-calculated metrics stored daily/weekly to speed up dashboard loading.
- **ActivityLog**: System-wide audit logs tracking user actions.
