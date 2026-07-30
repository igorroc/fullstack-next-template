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
├── modules/              # Business Logic by Domain
│   └── auth/            # Authentication module
│       ├── auth-service.ts
│       ├── auth-session.ts
│       ├── schemas.ts   # Shared API contracts
│       ├── types.ts
│       └── index.ts     # Barrel export
│
├── lib/                 # Shared Utilities and Infrastructure
│   ├── utils/          # Utility functions
│   │   ├── validators.ts
│   │   └── index.ts
│   ├── api-client.ts   # Typed frontend API client
│   ├── api-result.ts   # Result and type guard classes
│   ├── api-response.ts # API response helpers
│   ├── db.ts           # Database connection (Prisma)
│   └── password.ts     # Password hashing utilities
│
└── proxy.ts            # Route protection proxy
```

## Architecture Principles

### 1. Separation of Concerns

- **app/**: Route definitions and page components (thin layer)
- **components/**: Reusable UI components
- **modules/**: Business logic organized by domain
- **lib/**: Shared utilities and infrastructure

### 2. Feature-Based Organization

Each module (auth, users, etc.) contains:

- Shared request/response schemas for API boundaries
- Server-only classes for business logic
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
import { ApiClient } from "@/lib/api-client"
import { AuthSession } from "@/modules/auth"
```

## File Naming Conventions

- **Components**: `component-name.tsx` (e.g., `login-form.tsx`)
- **Route Handlers**: `route.ts` inside `app/api/**`
- **Services**: `domain-service.ts` inside each module when business logic is needed
- **Utilities**: `utility-name.ts` (e.g., `validators.ts`)
- **Exports**: `index.ts` in each folder for barrel exports

## Benefits

1. **Scalability**: Easy to add new features without cluttering
2. **Maintainability**: Clear separation makes code easy to find and modify
3. **Testability**: Isolated business logic is easier to test
4. **Readability**: Consistent naming and organization
5. **Reusability**: Shared components and utilities are easily accessible

## Adding New Features

1. Create a new folder in `modules/` with your domain name
2. Add shared schemas and server-only classes
3. Expose Route Handlers in `app/api/**`
4. Create an `index.ts` for exports
5. Add related UI components in `components/` if needed
6. Add pages in `app/` that use the feature

Example:

```
modules/
└── products/
    ├── schemas.ts
    ├── product-service.ts
    └── index.ts
```

## Best Practices

- Keep business logic in server-only module classes
- Group helper behavior in responsibility-based classes such as `AuthService`, `AuthSession`, `ApiResult` and `TypeGuard`
- Use typed Route Handlers for frontend mutations and client-side reads
- Keep UI components in `components/`
- Use server components by default, client components when needed
- Always export through index files for clean imports
- Follow kebab-case for all files and folders
- Use TypeScript for type safety
