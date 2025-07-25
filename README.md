# GUNotes - A Collaborative Note-Sharing Platform

Welcome to GUNotes! This is a modern, full-stack web application designed to help students and educators share and discover high-quality study materials. The platform is built with a focus on scalability, security, and a rich user experience.

## Core Features

-   **Note Management:** Users can upload, view, and manage their study notes.
-   **Dynamic Content:** The system supports user-generated courses, professors, and semesters, allowing the academic data to grow organically.
-   **Review System:** A complete 5-star rating and review system allows users to provide feedback on notes.
-   **Role-Based Access Control:** A robust security model ensures that only authorized users can access sensitive areas.
    -   **Students:** Can upload and manage their own notes.
    -   **Tutors, Professors, Admins:** Can explore all notes on the platform.
    -   **Admins:** Have access to a full administrative dashboard.
-   **Admin Dashboard:** A dedicated section for administrators to manage user roles and the raffle system.
-   **Raffle System:** A complete, end-to-end raffle system where admins can create raffles, upload prize images, and automatically draw winners.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (with Turbopack)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
-   **Database:** [PostgreSQL](https://www.postgresql.org/) managed with [Prisma ORM](https://www.prisma.io/)
-   **Authentication:** [Auth0](https://auth0.com/)
-   **File Storage:** [Supabase Storage](https://supabase.com/storage)

---

## Project Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url> gunotes
cd gunotes
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of the project and add the following variables.

```env
# Auth0 Credentials
AUTH0_SECRET='...'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='...'
AUTH0_CLIENT_ID='...'
AUTH0_CLIENT_SECRET='...'

# Database Connection (Your Supabase Postgres URL)
DATABASE_URL="postgresql://..."

# Supabase Storage Credentials
SUPABASE_PROJECT_URL="https://<your-project-ref>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..." # IMPORTANT: Use the secret service_role key

# Optional for Admin User Search (if implemented)
# AUTH0_MANAGEMENT_DOMAIN="..."
# AUTH0_MANAGEMENT_CLIENT_ID="..."
# AUTH0_MANAGEMENT_CLIENT_SECRET="..."
```

### 4. Run Database Migrations

This command will apply all existing migrations to your database, creating the necessary tables.

```bash
npx prisma migrate dev
```

### 5. Seed the Database (Optional but Recommended)

To populate your database with realistic sample data (users, notes, an active raffle, etc.), run the following command:

```bash
npx prisma db seed
```

### 6. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Project Structure Overview

```
gunotes
├─ /prisma/             # Prisma schema, migrations, and seed script
├─ /public/             # Static assets (images, logos)
├─ /src/
│  ├─ /app/             # Next.js App Router
│  │  ├─ /api/          # All backend API routes
│  │  ├─ /admin/        # Admin dashboard pages
│  │  └─ ...            # Other application pages
│  ├─ /components/      # Shared React components
│  └─ /lib/             # Helper libraries (Prisma client, Supabase client)
├─ .env                  # Environment variables (ignored by Git)
├─ package.json          # Project dependencies and scripts
└─ README.md             # This file
```
