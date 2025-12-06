# El Wasyet Next

A modern Next.js application for managing business operations with Arabic language support (RTL).

## Features

- **Employee Management**: Create, view, edit employees with role-based permissions and abilities
- **Branch Management**: Manage multiple business branches with managers
- **Client Management**: Track and manage customer information
- **Order Management**: Handle orders with status tracking and commission management
- **Stock Management**: Inventory tracking and stock item management
- **Service Management**: Define and manage available services
- **Commission & Discount System**: Track employee commissions and apply discounts
- **Expense Tracking**: Monitor business expenses
- **Dashboard & Reports**: Analytics and reporting capabilities
- **Authentication**: Secure authentication with Next-Auth
- **RTL Support**: Full Arabic language interface with right-to-left layout

## Tech Stack

- **Framework**: Next.js 15.5 with App Router and Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form with Zod validation
- **Authentication**: NextAuth v5
- **Charts**: Recharts
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Mhmd0Mhmod/el-wasyet-next.git
cd el-wasyet-next
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with required variables (refer to `.env.example` if available)

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── actions/          # Server actions for data mutations
├── app/             # Next.js app router pages
├── components/      # React components
│   ├── auth/       # Authentication components
│   ├── main/       # Main feature components
│   ├── shared/     # Shared/reusable components
│   └── ui/         # UI primitives (shadcn/ui)
├── data/           # Data fetching functions
├── hooks/          # Custom React hooks
├── lib/            # Utility libraries
├── schema/         # Zod validation schemas
└── types/          # TypeScript type definitions
```

## Key Features Details

### Employee Management

- Full CRUD operations for employees
- Role assignment with dynamic abilities
- Manager assignment
- Suspend/activate employee accounts
- Password management with secure input
- Loading states and form validation

### Authentication

- Secure login with NextAuth
- Role-based access control
- Protected routes with middleware

### UI/UX

- Responsive design
- Arabic RTL interface
- Dark mode support (via next-themes)
- Toast notifications (Sonner)
- Skeleton loading states
- Accessible components (Radix UI)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)
