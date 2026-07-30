# Project Architecture

This project follows clean architecture principles with a well-organized folder structure for scalability and maintainability.

## Folder Structure

```
src/
├── app/                    # Next.js App Router (Presentation Layer)
│   ├── api/               # Typed Route Handlers
│   ├── auth/              # Authentication pages
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
├── features/             # Business Logic by Feature
│   └── auth/            # Authentication feature
│       ├── schemas.ts   # Shared API contracts
│       ├── service.ts   # Server-only business logic
│       └── index.ts     # Barrel export
│
├── lib/                 # Shared Utilities and Infrastructure
│   ├── utils/          # Utility functions
│   │   ├── validators.ts
│   │   └── index.ts
│   ├── auth.ts         # Authentication utilities
│   ├── db.ts           # Database connection (Prisma)
│   └── password.ts     # Password hashing utilities
│
└── proxy.ts            # Route protection proxy
```

## Architecture Principles

### 1. Separation of Concerns

- **app/**: Route definitions and page components (thin layer)
- **components/**: Reusable UI components
- **features/**: Business logic organized by domain
- **lib/**: Shared utilities and infrastructure

### 2. Feature-Based Organization

Each feature (auth, users, etc.) contains:
- Shared request/response schemas for API boundaries
- Server-only services for business logic
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
import { apiClient } from "@/lib/api-client"
import { isEmail } from "@/lib/utils"
import { requireUser } from "@/lib/auth"
```

## File Naming Conventions

- **Components**: `component-name.tsx` (e.g., `login-form.tsx`)
- **Route Handlers**: `route.ts` inside `app/api/**`
- **Services**: `service.ts` inside each feature when business logic is needed
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
2. Add shared schemas and server-only services
3. Expose Route Handlers in `app/api/**`
4. Create an `index.ts` for exports
5. Add related UI components in `components/` if needed
6. Add pages in `app/` that use the feature

Example:
```
features/
└── products/
    ├── schemas.ts
    ├── service.ts
    └── index.ts
```

## Best Practices

- Keep business logic in server-only feature services
- Use typed Route Handlers for frontend mutations and client-side reads
- Keep UI components in `components/`
- Use server components by default, client components when needed
- Always export through index files for clean imports
- Follow kebab-case for all files and folders
- Use TypeScript for type safety
