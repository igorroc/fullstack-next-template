# Fullstack Next.js Template

A modern, production-ready fullstack Next.js template with authentication, database integration, and beautiful UI components.

## Features

### Core Features
- **Next.js 16** - The latest version of Next.js with App Router
- **TypeScript** - Full type-safe development
- **Clean Architecture** - Well-organized folder structure following best practices
- **Authentication** - Complete auth system with middleware protection and automatic login after registration
- **Database** - PostgreSQL with Prisma ORM
- **UI Components** - NextUI (based on Tailwind CSS) for modern, accessible components
- **Docker** - Containerized PostgreSQL database
- **Form Handling** - Server Actions with loading states and error handling

### Implemented Pages
- **Home Page** - Welcome page with navigation to auth pages
- **Login** - User authentication with automatic redirect to profile
- **Register** - User registration with automatic login
- **Profile** - Protected page showing user info and list of all registered users
- **Logout** - Secure logout with redirect to home

## Technologies

- **Next.js 16** - React framework for production
- **TypeScript 5** - JavaScript with syntax for types
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **NextUI** - Beautiful, fast and modern React UI library
- **Prisma 5.12** - Next-generation ORM for TypeScript & Node.js
- **PostgreSQL 15** - Powerful, open-source relational database
- **Docker** - Platform for containerized applications
- **bcrypt** - Password hashing
- **Jose** - JWT implementation

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
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
npm install
# or
bun install
```

3. **Set up environment variables:**

Create a `.env` file in the root directory (you can copy from `.env.example`):

```env
DATABASE_DB="your_database_name"
DATABASE_USER="postgres"
DATABASE_PASSWORD="custom_db_password"

POSTGRES_PRISMA_URL="postgresql://postgres:custom_db_password@localhost:5432/your_database_name"
AUTHENTICATION_SECRET_KEY="random_hash_1234567890ABCDE"
```

Replace the values with your own:
- `DATABASE_DB`: Choose a name for your database
- `DATABASE_PASSWORD`: Set a secure password
- `AUTHENTICATION_SECRET_KEY`: Generate a random secure string

4. **Start the PostgreSQL database:**

```bash
npm run compose:up
```

This will start a PostgreSQL container using Docker Compose.

5. **Run database migrations:**

```bash
npm run migrate
```

This will create the database schema and generate Prisma Client.

6. **Start the development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see your app.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run ts-check` - Type check without emitting files
- `npm run compose:up` - Start PostgreSQL container
- `npm run migrate` - Run Prisma migrations
- `npm run migrate:reset` - Reset database and run migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

## Project Structure

This project follows clean architecture principles with a well-organized structure:

```
├── src/
│   ├── app/                # Next.js App Router (Presentation Layer)
│   │   ├── auth/          # Authentication routes (login, register, logout)
│   │   ├── profile/       # Protected profile page
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── providers.tsx  # Client-side providers (NextUI)
│   ├── components/        # Reusable UI Components
│   │   ├── auth/         # Auth-related components (forms, content)
│   │   ├── home/         # Home page components
│   │   └── profile/      # Profile page components
│   ├── features/         # Business Logic by Feature
│   │   ├── auth/        # Authentication actions (login, register, logout)
│   │   └── users/       # User-related actions (get users)
│   ├── lib/             # Shared Utilities & Infrastructure
│   │   ├── utils/       # Utility functions (validators, etc.)
│   │   ├── auth.ts      # Authentication utilities
│   │   ├── db.ts        # Database connection (Prisma)
│   │   └── proxy.ts     # Middleware proxy
│   └── types/           # TypeScript type definitions
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
- **Protected Routes** - Using Next.js middleware
- **Session Management** - JWT-based sessions

## Database

The template uses Prisma with PostgreSQL:

- Edit `prisma/schema.prisma` to modify your database schema
- Run `npm run migrate` to apply changes
- Use `npm run prisma:studio` to visualize your data

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

1. **Create a new feature** in `src/features/your-feature/`:
```typescript
// src/features/products/get-products.ts
"use server"
import db from "@/lib/db"

export async function getProducts() {
  return await db.product.findMany()
}
```

2. **Add exports** in `src/features/products/index.ts`:
```typescript
export { getProducts } from "./get-products"
```

3. **Create UI components** in `src/components/products/`:
```typescript
// src/components/products/product-list.tsx
"use client"
import { Card } from "@nextui-org/react"

export function ProductList({ products }) {
  // Your component logic
}
```

4. **Use in pages** with clean imports:
```typescript
// src/app/products/page.tsx
import { getProducts } from "@/features/products"
import { ProductList } from "@/components/products"

export default async function ProductsPage() {
  const products = await getProducts()
  return <ProductList products={products} />
}
```

### Database Schema

Modify `prisma/schema.prisma` to add or change models, then run:

```bash
npm run migrate:create-only  # Create migration without applying
npm run migrate              # Apply migrations
```

### Import Examples

The clean architecture allows for intuitive imports:

```typescript
// Features (Server Actions)
import { loginAction, registerAction } from "@/features/auth"
import { getAllUsers } from "@/features/users"

// Components
import { LoginForm, RegisterForm } from "@/components/auth"
import { ProfileContent } from "@/components/profile"

// Utilities
import { isEmail } from "@/lib/utils"
import { getUserBySession } from "@/lib/auth"
import db from "@/lib/db"
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is open source and available under the [MIT License](LICENSE).
