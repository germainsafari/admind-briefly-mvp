# Admind_Briefly

Admind_Briefly is a creative brief management platform designed to streamline the process of creating, sharing, and managing creative briefs for agencies, clients, and managers.

## Features

- **Role-based Dashboards**: Separate dashboards for Admin, Manager, and Client roles, each with tailored functionality.
- **Microsoft Authentication**: Sign in securely using your Microsoft account.
- **Brief Builder Wizard**: Step-by-step wizard for clients to create detailed creative briefs, including project overview, scope, audience, strategic input, references, channels, and more.
- **Brief Management**: View, edit, and manage briefs. Tabs for All, New, Created by you, and Shared with you.
- **Organization Management**: Admins can manage organizations, clients, and managers.
- **Sharing and Collaboration**: Share briefs with team members and stakeholders.
- **Modern UI**: Built with React, Next.js, Tailwind CSS, and Radix UI for a responsive and accessible experience.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (or use npm/yarn if preferred)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd admind-briefly-mvp
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in the required values (e.g., Microsoft OAuth credentials).

4. **Run the development server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
pnpm build
pnpm start
# or
npm run build && npm start
# or
yarn build && yarn start
```

## Project Structure

- `app/` — Next.js app directory (routing, pages, layouts)
- `components/` — Reusable UI and feature components
- `lib/` — Utility and context providers
- `hooks/` — Custom React hooks
- `public/` — Static assets
- `styles/` — Global styles

## License

This project is for internal use. All rights reserved. 