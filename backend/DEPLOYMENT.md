# Deployment Guide

The API is containerized and production-ready. We provide a `docker-compose.yml` for straightforward deployments.

## Prerequisites
- Docker & Docker Compose
- A domain name pointing to your server
- Reverse Proxy (Nginx / Traefik)

## Steps for Production
1. **Clone the Repository** on your production server.
2. **Environment Configuration**: Copy `.env.example` to `.env` and fill in your actual production database credentials, JWT secrets, Redis credentials, and 3rd-party API keys (Razorpay, Twilio, Meta, aicredits).
3. **Build and Run**:
   ```bash
   docker-compose up --build -d
   ```
4. **Nginx Reverse Proxy**: Set up Nginx to proxy pass requests on port 80/443 to `localhost:3000`. Ensure SSL is configured (e.g., using Certbot).
5. **Database Migration**: The provided `docker-compose.yml` automatically runs `npx prisma migrate deploy` on startup to ensure the database schema is up to date.

## Scaling
- **Stateless API**: The Express API is stateless. Session and rate-limit states are stored in Redis.
- **Horizontal Scaling**: You can spin up multiple instances of the `api` container and balance the load via Nginx.
- **Queue Workers**: Heavy background jobs (like processing CSV imports or sending broadcast WhatsApp messages) are handled by BullMQ workers. You can run dedicated worker instances by changing the startup command to only initialize the queue processors.
