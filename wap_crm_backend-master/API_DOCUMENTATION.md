# API Documentation

The complete Interactive API documentation is available via Swagger UI. 
Run the server and visit `http://localhost:3000/api-docs`.

## Core Endpoints Overview

### Auth
- `POST /api/v1/auth/register` - Register a new business organization and owner user.
- `POST /api/v1/auth/login` - Authenticate and receive JWT tokens.
- `POST /api/v1/auth/refresh` - Refresh an expired access token.

### Users
- `GET /api/v1/users` - List all users in the organization.
- `POST /api/v1/users/invite` - Invite a new user to the organization.
- `PUT /api/v1/users/:id` - Update user details.
- `DELETE /api/v1/users/:id` - Deactivate a user.

### Organizations
- `GET /api/v1/organizations` - Get organization details and settings.
- `PUT /api/v1/organizations` - Update organization branding, timezone, etc.

### Leads
- `GET /api/v1/leads` - List leads (supports pagination, filtering, searching).
- `POST /api/v1/leads` - Manually create a lead.
- `GET /api/v1/leads/:id` - Get a specific lead with timeline and history.
- `PUT /api/v1/leads/:id` - Update lead status or details.
- `POST /api/v1/leads/:id/assign` - Assign lead to a specific user.

### CRM
- `POST /api/v1/crm/notes` - Add a note to a lead.
- `POST /api/v1/crm/calls` - Log a phone call.
- `POST /api/v1/crm/follow-ups` - Schedule a follow-up task.
- `GET /api/v1/crm/follow-ups` - List pending follow-ups.

### Analytics
- `GET /api/v1/analytics/dashboard` - Get high-level KPI metrics.
- `GET /api/v1/analytics/sources` - Get lead source distribution.
- `GET /api/v1/analytics/sales-performance` - Get sales team metrics.

### Webhooks
- `POST /api/v1/webhooks/meta/:orgId` - Inbound webhook for Meta Lead Ads.
- `POST /api/v1/webhooks/google/:orgId` - Inbound webhook for Google Lead Forms.
