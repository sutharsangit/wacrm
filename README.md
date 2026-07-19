# AI Lead Qualification & WhatsApp CRM SaaS Platform (Frontend Sandbox)

A modern, highly responsive frontend application for an AI-powered Lead Qualification and WhatsApp CRM SaaS workspace. This dashboard allows businesses to manage and sync inbound lead sources, qualify them using automated conversational AI, track sales pipeline progress on a Kanban board, execute template broadcasts, and analyze sales representative response metrics.

---

## 🚀 Technologies Used

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/) + TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Form Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

---

## 📂 Folder Structure

The project code is organized using a clean production-ready structure:

```
src/
 ├── app/                             # Next.js App Router subpages
 │    ├── (marketing)/                # Landing Page
 │    ├── (auth)/                     # Login, Register, Forgot Password
 │    ├── (wizard)/                   # Onboarding Wizard Stepper
 │    ├── (dashboard)/                # Main Dashboard console layout
 │    │    ├── dashboard/             # Dashboard Overview KPI stats
 │    │    ├── leads/                 # Leads Table & Detail sidebar drawer
 │    │    ├── crm/                   # Kanban Pipeline drag-and-drop
 │    │    ├── whatsapp/              # WhatsApp CRM threads & Broadcast campaigns
 │    │    ├── analytics/             # Rich Charts & team metric reports
 │    │    ├── billing/               # Plan usage meters & secure checkout mock
 │    │    └── settings/              # Configurations & Theme switches
 ├── components/                      # Shared reusable elements
 │    ├── layout/                     # Sidebar, Topbar layouts
 │    └── ui/                         # Base typography or styled grids
 ├── lib/                             # Utility classes (cn helper, formatters)
 ├── mock/                            # JSON dummy database models (leads, chats, metrics)
 └── store/                           # Zustand client-state stores (auth, leads, messages)
```

---

## 💻 Screens Implemented

1. **Marketing Landing Page (`/`)**:
   - Hero header, feature grids, pricing tiers, testimonial sliders, and a mock interactive demo booking scheduler modal.
2. **Authentication Workspace**:
   - **Login (`/login`)**: Client-side validated form.
   - **Register (`/register`)**: Workspace creator form detailing company metrics.
   - **Forgot Password (`/forgot-password`)**: Recovery simulation.
3. **Onboarding Wizard (`/onboarding`)**:
   - 4-step wizard stepper detailing company specs, lead connector options (Meta Ads, Google, Webforms), subscription tiers, and a final configuration checklist.
4. **Sales Command Console (`/dashboard`)**:
   - Dynamic top KPI cards (Total, Qualified, Follow-ups, Conversion Rates, MRR), monthly AreaCharts, channel acquisition PieCharts, and a global timeline log.
5. **Leads Central (`/leads`)**:
   - Search-filtered table supporting headers sort and paginated navigation.
   - Detailed master-detail sliding drawer showing Activity Streams, note takers, call recorders, and qualification Q&As.
6. **Pipeline Kanban (`/crm`)**:
   - Native HTML5 Drag and Drop stage blocks (New, Contacted, Qualified, Follow-up, Won, Lost) to update deal status dynamically.
7. **WhatsApp CRM Inbox (`/whatsapp`)**:
   - Three-pane inbox. Features unread count indicators, message delivery status marks, instant template inserts, calendar follow-ups, and a template editor dialog.
   - **Broadcast Campaigns**: Design marketing template dispatches with simulated progress logs.
8. **Analytics Hub (`/analytics`)**:
   - Conversion funnels, monthly actual vs projected MRR, and a team velocity evaluation sheet.
9. **Billing Manager (`/billing`)**:
   - Active plan usage meters, comparative grid, and checkout simulator modal.
10. **Console Settings (`/settings`)**:
    - Tabs for Profile, Company, Integrations, Notifications, and Light/Dark theme configuration switches.

---

## 🛠️ Mock API & State Architecture

This project runs **entirely frontend-only**. All interactions use a client-side state machine:
- **Zustand Stores**:
  - `useAuthStore`: Manages authenticated credentials and onboarding status flags.
  - `useLeadsStore`: Controls CRUD actions on lead files, note history logs, and outbound calls.
  - `useChatStore`: Orchestrates chat logs, templates, broadcast lists, and schedules.
- **Simulations**:
  - Outbound agent messages sent in WhatsApp CRM trigger a mock reply from client leads (or AI copilot if enabled) after 2.5 seconds.
  - Upgrading subscriptions in checkout simulator modifies limits and quotas dynamically on the dashboard.
- **Persistence**: Local modifications are written to `localStorage` to preserve pipeline card drags, notes, and added leads across page refreshes.

---

## 🚀 How To Run

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run Dev Server**:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) inside your web browser.

---

## ⚠️ Known Limitations

1. **Browser Persistence**: All database operations use `localStorage`. Clearing browser cache restores the original mock data definitions.
2. **No Backend Endpoints**: API routes under `/api` or network fetch triggers are simulated with local promises.
3. **No Auth Guards**: For convenientPair Programming testing, the dashboard remains active by default but can be tested using the Logout/Login flows.
