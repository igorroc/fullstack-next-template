# Fullstack Next.js Template

A modern, production-ready fullstack Next.js template with authentication, database integration, and beautiful UI components.

## Features

### Core Features

- **Next.js 16** - The latest version of Next.js with App Router
- **TypeScript** - Full type-safe development
- **Clean Architecture** - Well-organized folder structure following best practices
- **Authentication** - Complete auth system with protected routes and automatic login after registration
- **Database** - PostgreSQL with Prisma ORM
- **UI Components** - NextUI (based on Tailwind CSS) for modern, accessible components
- **Docker** - Containerized PostgreSQL database
- **Typed API Routes** - Route Handlers with shared schemas, typed client calls, loading states, and error handling

### Implemented Pages

- **Home Page** - Welcome page with navigation to auth pages
- **Login** - User authentication with automatic redirect to profile
- **Register** - User registration with automatic login
- **Profile** - Protected page showing the authenticated user's information
- **Logout** - Secure logout with redirect to home

## Technologies

- **Next.js 16** - React framework for production
- **TypeScript 5** - JavaScript with syntax for types
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **NextUI** - Beautiful, fast and modern React UI library
- **Prisma 5.12** - Next-generation ORM for TypeScript & Node.js
- **PostgreSQL 15** - Powerful, open-source relational database
- **Docker** - Platform for containerized applications
- **Argon2id** - Password hashing
- **Opaque Sessions** - Database-backed session management
- **Zod** - Runtime validation and shared API contracts

## Getting Started

### Prerequisites

- Bun 1.3.14+
- Docker and Docker Compose
- Git

### Installation

1. **Use this template** to create a new repository or clone it:

```bash
git clone https://github.com/igorroc/fullstack-next-template.git my-project
cd my-project
```

2. **Install dependencies:**

```bash
bun install --frozen-lockfile
```

3. **Set up environment variables:**

Create a `.env` file in the root directory (you can copy from `.env.example`):

```env
DATABASE_DB="your_database_name"
DATABASE_USER="postgres"
DATABASE_PASSWORD="custom_db_password"

POSTGRES_PRISMA_URL="postgresql://postgres:custom_db_password@localhost:5432/your_database_name"
```

Replace the values with your own:

- `DATABASE_DB`: Choose a name for your database
- `DATABASE_PASSWORD`: Set a secure password

4. **Start the PostgreSQL database:**

```bash
bun run compose:up
```

This will start a PostgreSQL container using Docker Compose.

5. **Run database migrations:**

```bash
bun run migrate
```

This will create the database schema and generate Prisma Client.

6. **Start the development server:**

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see your app.

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run ts-check` - Type check without emitting files
- `bun run compose:up` - Start PostgreSQL container
- `bun run migrate` - Run Prisma migrations
- `bun run migrate:reset` - Reset database and run migrations
- `bun run prisma:studio` - Open Prisma Studio (database GUI)

## Project Structure

This project follows clean architecture principles with a well-organized structure:

```
├── src/
│   ├── app/                # Next.js App Router (Presentation Layer)
│   │   ├── auth/          # Authentication pages (login, register, logout)
│   │   ├── api/           # Typed Route Handlers
│   │   ├── profile/       # Protected profile page
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── providers.tsx  # Client-side providers (NextUI)
│   ├── components/        # Reusable UI Components
│   │   ├── auth/         # Auth-related components (forms, content)
│   │   ├── home/         # Home page components
│   │   └── profile/      # Profile page components
│   ├── modules/          # Business Logic by Domain
│   │   └── auth/        # Authentication schemas, services, sessions and types
│   ├── lib/             # Shared Utilities & Infrastructure
│   │   ├── utils/       # Utility functions (validators, etc.)
│   │   ├── auth.ts      # Authentication utilities
│   │   ├── db.ts        # Database connection (Prisma)
│   │   └── password.ts  # Password hashing utilities
│   └── proxy.ts         # Route protection proxy
├── prisma/
│   └── schema.prisma    # Database schema
└── public/              # Static files
```

**Key Principles:**

- **kebab-case**: All files and folders use kebab-case naming
- **Feature-based**: Business logic organized by domain (auth, users, etc.)
- **Clean separation**: UI components separated from business logic
- **Barrel exports**: Each folder has index.ts for clean imports

For detailed architecture documentation, see [ARCHITECTURE.md](ARCHITECTURE.md).

## Authentication

The template includes a complete authentication system:

- **Registration** - `/auth/register`
- **Login** - `/auth/login`
- **Logout** - `/auth/logout`
- **Protected Routes** - Using Next.js Proxy
- **Session Management** - Database-backed opaque sessions

## Database

The template uses Prisma with PostgreSQL:

- Edit `prisma/schema.prisma` to modify your database schema
- Run `bun run migrate` to apply changes
- Use `bun run prisma:studio` to visualize your data

## Deploy on Vercel

The easiest way to deploy this template is using [Vercel](https://vercel.com):

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository on Vercel
3. Configure environment variables (same as in `.env`)
4. For the database, you'll need to set up a PostgreSQL instance (Vercel Postgres, Railway, Supabase, etc.)
5. Update `POSTGRES_PRISMA_URL` with your production database URL
6. Deploy!

Alternatively, use the Vercel CLI:

```bash
vercel
```

## Customization

### Styling

The template uses NextUI components with Tailwind CSS. You can customize:

- **Theme**: Edit `tailwind.config.ts` to modify colors, fonts, etc.
- **NextUI**: Configure NextUI theme in the same file
- **Components**: All pages use NextUI components which are fully customizable
- **Dark Mode**: Built-in dark mode support (toggle in `tailwind.config.ts`)

### Adding New Features

The project structure makes it easy to add new features:

1. **Create a new module service** in `src/modules/your-module/`:

```typescript
// src/modules/products/product-service.ts
import "server-only"
import db from "@/lib/db"

export class ProductService {
	static async list() {
		return db.product.findMany()
	}
}
```

2. **Add exports** in `src/modules/products/index.ts`:

```typescript
export { ProductService } from "./product-service"
```

3. **Expose a Route Handler** in `src/app/api/products/route.ts`:

```typescript
import { NextResponse } from "next/server"
import { ProductService } from "@/modules/products"

export async function GET() {
	return NextResponse.json({ success: true, data: await ProductService.list() })
}
```

4. **Create UI components** in `src/components/products/`:

```typescript
// src/components/products/product-list.tsx
"use client"
import { Card } from "@nextui-org/react"

export function ProductList({ products }) {
	// Your component logic
}
```

5. **Use in pages** with clean imports:

```typescript
// src/app/products/page.tsx
import { ProductService } from "@/modules/products"
import { ProductList } from "@/components/products"

export default async function ProductsPage() {
  const products = await ProductService.list()
  return <ProductList products={products} />
}
```

### Database Schema

Modify `prisma/schema.prisma` to add or change models, then run:

```bash
bun run migrate:create-only  # Create migration without applying
bun run migrate              # Apply migrations
```

### Import Examples

The clean architecture allows for intuitive imports:

```typescript
// Typed API client
import { ApiClient } from "@/lib/api-client"

// Components
import { LoginForm, RegisterForm } from "@/components/auth"
import { ProfileContent } from "@/components/profile"

// Server utilities
import { AuthSession } from "@/modules/auth"
import db from "@/lib/db"
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

### Commit Messages

This repository uses [Conventional Commits](https://www.conventionalcommits.org/) to determine semantic versioning: `fix` creates a patch release, `feat` creates a minor release, and `!` or a `BREAKING CHANGE:` footer creates a major release. WebStorm loads the committed `.gitmessage` template automatically after running:

```bash
git config --local commit.template .gitmessage
```

## License

This project is open source and available under the [MIT License](LICENSE).
