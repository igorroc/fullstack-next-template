# Project Architecture

This project follows clean architecture principles with a well-organized folder structure for scalability and maintainability.

## Folder Structure

```
src/
├── app/                    # Next.js App Router (Presentation Layer)
│   ├── auth/              # Authentication routes
│   │   ├── login/         # Login page
│   │   ├── logout/        # Logout page
│   │   └── register/      # Register page
│   ├── profile/           # Profile page (protected)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # Client-side providers
│
├── components/            # Reusable UI Components (Client Components)
│   ├── auth/             # Authentication components
│   │   ├── login-content.tsx
│   │   ├── login-form.tsx
│   │   ├── register-content.tsx
│   │   ├── register-form.tsx
│   │   └── index.ts      # Barrel export
│   ├── home/             # Home page components
│   │   ├── home-content.tsx
│   │   └── index.ts
│   └── profile/          # Profile page components
│       ├── profile-content.tsx
│       └── index.ts
│
├── features/             # Business Logic by Feature (Server Actions)
│   ├── auth/            # Authentication feature
│   │   ├── login.ts     # Login action
│   │   ├── logout.ts    # Logout action
│   │   ├── register.ts  # Register action
│   │   └── index.ts     # Barrel export
│   └── users/           # Users feature
│       ├── get-all-users.ts
│       └── index.ts
│
├── lib/                 # Shared Utilities and Infrastructure
│   ├── utils/          # Utility functions
│   │   ├── validators.ts
│   │   └── index.ts
│   ├── auth.ts         # Authentication utilities
│   ├── db.ts           # Database connection (Prisma)
│   └── proxy.ts        # Middleware proxy
│
└── types/              # TypeScript type definitions
    └── index.ts
```

## Architecture Principles

### 1. Separation of Concerns

- **app/**: Route definitions and page components (thin layer)
- **components/**: Reusable UI components
- **features/**: Business logic organized by domain
- **lib/**: Shared utilities and infrastructure

### 2. Feature-Based Organization

Each feature (auth, users, etc.) contains:
- Server actions for data mutations
- Related business logic
- Barrel exports for clean imports

### 3. Clean Code Practices

- **kebab-case**: All file and folder names use kebab-case
- **Named Exports**: Components use named exports for better refactoring
- **Barrel Exports**: Index files provide clean import paths
- **Type Safety**: Full TypeScript coverage

### 4. Component Structure

- **Server Components**: Default for pages in app/
- **Client Components**: In components/ with "use client" directive
- **Separation**: UI logic separated from business logic

## Import Examples

```typescript
// Clean imports using barrel exports
import { LoginContent, LoginForm } from "@/components/auth"
import { loginAction, logoutAction } from "@/features/auth"
import { getAllUsers } from "@/features/users"
import { isEmail } from "@/lib/utils"
import { getUserBySession } from "@/lib/auth"
```

## File Naming Conventions

- **Components**: `component-name.tsx` (e.g., `login-form.tsx`)
- **Actions**: `action-name.ts` (e.g., `get-all-users.ts`)
- **Utilities**: `utility-name.ts` (e.g., `validators.ts`)
- **Exports**: `index.ts` in each folder for barrel exports

## Benefits

1. **Scalability**: Easy to add new features without cluttering
2. **Maintainability**: Clear separation makes code easy to find and modify
3. **Testability**: Isolated business logic is easier to test
4. **Readability**: Consistent naming and organization
5. **Reusability**: Shared components and utilities are easily accessible

## Adding New Features

1. Create a new folder in `features/` with your feature name
2. Add your server actions
3. Create an `index.ts` for exports
4. Add related UI components in `components/` if needed
5. Add pages in `app/` that use the feature

Example:
```
features/
└── products/
    ├── get-products.ts
    ├── create-product.ts
    ├── update-product.ts
    └── index.ts
```

## Best Practices

- Keep server actions in `features/`
- Keep UI components in `components/`
- Use server components by default, client components when needed
- Always export through index files for clean imports
- Follow kebab-case for all files and folders
- Use TypeScript for type safety
