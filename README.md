# Admind_Briefly

Admind_Briefly is a creative brief management platform designed to streamline the process of creating, sharing, and managing creative briefs for agencies, clients, and managers.

## Features

- **Role-based Dashboards**: Separate dashboards for Admin, Manager, and Client roles, each with tailored functionality.
- **Microsoft Authentication**: Sign in securely using your Microsoft account.
- **Brief Builder Wizard**: Step-by-step wizard for clients to create detailed creative briefs.
- **Brief Management**: View, edit, and manage briefs.
- **Organization Management**: Admins can manage organizations, clients, and managers.
- **Sharing and Collaboration**: Share briefs with team members and stakeholders.
- **Advanced Search**: Role-based search functionality across all entities:
  - **Admin**: Search organizations, managers, clients, and briefs with filtering options
  - **Manager**: Search clients and briefs within their organization
  - **Client**: Search their own briefs
- **Modern UI**: Built with React, Next.js, Tailwind CSS, and Radix UI for a responsive and accessible experience.

## Tech Stack

- **Framework**: Next.js 15
- **UI**: React 19, Tailwind CSS, Radix UI
- **Database**: PostgreSQL (via Prisma ORM)
- **Auth**: NextAuth.js (Microsoft OAuth)
- **Cloud Storage**: Azure Blob Storage
- **Package Manager**: pnpm (preferred)

## Search Implementation

The search functionality is implemented with role-based access control:

### API Endpoint
- **Route**: `/api/search`
- **Method**: GET
- **Parameters**: 
  - `q`: Search query (required)
  - `type`: Entity type filter (`all`, `organizations`, `managers`, `clients`, `briefs`)

### Search Components
- **Global Search**: `components/ui/search.tsx` - Reusable search component used in header
- **Admin Search**: `components/admin/admin-dashboard-search.tsx` - Advanced search with filters
- **Manager Search**: `components/manager/manager-dashboard-search.tsx` - Client and brief search
- **Client Search**: `components/client/client-dashboard-search.tsx` - Brief-only search

### Features
- **Debounced Search**: 300ms delay to prevent excessive API calls
- **Real-time Results**: Live search with dropdown results
- **Type Filtering**: Filter by entity type (admin only)
- **Role-based Access**: Users can only search entities they have access to
- **Keyboard Navigation**: Full keyboard support for accessibility
- **Click Outside**: Results close when clicking outside
- **Loading States**: Visual feedback during search
- **Error Handling**: Graceful error handling with user feedback

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