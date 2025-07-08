# Admind_Briefly

Admind_Briefly is a creative brief management platform designed to streamline the process of creating, sharing, and managing creative briefs for agencies, clients, and managers.

## Features

- **Role-based Dashboards**: Separate dashboards for Admin, Manager, and Client roles, each with tailored functionality.
- **Microsoft Authentication**: Sign in securely using your Microsoft account.
- **Brief Builder Wizard**: Step-by-step wizard for clients to create detailed creative briefs.
- **Brief Management**: View, edit, and manage briefs.
- **Organization Management**: Admins can manage organizations, clients, and managers.
- **Sharing and Collaboration**: Share briefs with team members and stakeholders.
- **Modern UI**: Built with React, Next.js, Tailwind CSS, and Radix UI for a responsive and accessible experience.

## Tech Stack

- **Framework**: Next.js 15
- **UI**: React 19, Tailwind CSS, Radix UI
- **Database**: PostgreSQL (via Prisma ORM)
- **Auth**: NextAuth.js (Microsoft OAuth)
- **Cloud Storage**: Azure Blob Storage
- **Package Manager**: pnpm (preferred)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (preferred; install with `npm i -g pnpm`)
- PostgreSQL database (local or cloud)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd admind-briefly-mvp
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   - Create a `.env.local` file in the root directory.
   - Add the following variables (replace with your actual values):

     ```env
     # Database
     DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

     # Microsoft OAuth (NextAuth)
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=your-random-secret
     MICROSOFT_CLIENT_ID=your-microsoft-client-id
     MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
     MICROSOFT_TENANT_ID=your-microsoft-tenant-id

     # Azure Storage
     AZURE_STORAGE_ACCOUNT_NAME=your-azure-account
     AZURE_STORAGE_ACCOUNT_KEY=your-azure-key
     AZURE_STORAGE_CONTAINER=your-container
     AZURE_STORAGE_SAS_TOKEN=your-sas-token # (optional, if using SAS)
     AZURE_STORAGE_CONNECTION_STRING=your-connection-string # (optional)
     NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME=your-azure-account
     NEXT_PUBLIC_AZURE_STORAGE_CONTAINER_NAME=your-container
     ```

4. **Set up the database:**
   - Run Prisma migrations to set up your database schema:
     ```bash
     pnpm exec prisma migrate deploy
     # or for development
     pnpm exec prisma migrate dev
     ```

5. **Run the development server:**
   ```bash
   pnpm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
pnpm run build
pnpm run start
```

## Project Structure

- `app/` — Next.js app directory (routing, pages, layouts)
- `components/` — Reusable UI and feature components
- `lib/` — Utility and context providers
- `hooks/` — Custom React hooks
- `prisma/` — Prisma schema and migrations
- `public/` — Static assets
- `styles/` — Global styles

## Database

- Uses Prisma ORM with PostgreSQL.
- Migrations are located in `prisma/migrations/`.
- Update the schema in `prisma/schema.prisma` and run `pnpm exec prisma migrate dev` to apply changes.

## Deployment: Vercel

1. **Push your code to a GitHub/GitLab/Bitbucket repository.**
2. **Sign up at [Vercel](https://vercel.com/) and import your repository.**
3. **Set the following environment variables in the Vercel dashboard (Project Settings > Environment Variables):**
   - All variables listed in the `.env.local` example above.
   - For production, set `NEXTAUTH_URL` to your Vercel deployment URL (e.g., `https://your-app.vercel.app`).
4. **Add a PostgreSQL database (e.g., [Neon](https://neon.tech/), [Supabase](https://supabase.com/), or [Railway](https://railway.app/)) and update `DATABASE_URL` accordingly.**
5. **After the first deploy, run your migrations on Vercel:**
   - Use Vercel's [Post-Deployment Command](https://vercel.com/docs/projects/environment-variables#system-environment-variables/post-deployment-commands) or run manually:
     ```bash
     pnpm exec prisma migrate deploy
     ```

**Note:** Vercel's serverless environment may require adjustments for long-running database connections. See [Prisma docs for Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel).

## License

This project is for internal use. All rights reserved. 