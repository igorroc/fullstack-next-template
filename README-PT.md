# Template Fullstack Next.js

Um template moderno e pronto para produção de Next.js fullstack com autenticação, integração de banco de dados e componentes de UI bonitos.

## Funcionalidades

### Funcionalidades Principais
- **Next.js 16** - A versão mais recente do Next.js com App Router
- **TypeScript** - Desenvolvimento totalmente type-safe
- **Clean Architecture** - Estrutura de pastas bem organizada seguindo as melhores práticas
- **Autenticação** - Sistema completo de autenticação com proteção via middleware e login automático após registro
- **Banco de Dados** - PostgreSQL com Prisma ORM
- **Componentes UI** - NextUI (baseado em Tailwind CSS) para componentes modernos e acessíveis
- **Docker** - Banco de dados PostgreSQL containerizado
- **Manipulação de Formulários** - Server Actions com estados de loading e tratamento de erros

### Páginas Implementadas
- **Página Inicial** - Página de boas-vindas com navegação para páginas de autenticação
- **Login** - Autenticação de usuário com redirecionamento automático para o perfil
- **Registro** - Registro de usuário com login automático
- **Perfil** - Página protegida mostrando informações do usuário e lista de todos os usuários registrados
- **Logout** - Logout seguro com redirecionamento para a home

## Tecnologias

- **Next.js 16** - Framework React para produção
- **TypeScript 5** - JavaScript com sintaxe para tipos
- **Tailwind CSS 3.3** - Framework CSS utility-first
- **NextUI** - Biblioteca de UI React bonita, rápida e moderna
- **Prisma 5.12** - ORM de nova geração para TypeScript & Node.js
- **PostgreSQL 15** - Banco de dados relacional poderoso e open-source
- **Docker** - Plataforma para aplicações containerizadas
- **bcrypt** - Hash de senhas
- **Jose** - Implementação de JWT

## Começando

### Pré-requisitos

- Node.js 18+ ou Bun
- Docker e Docker Compose
- Git

### Instalação

1. **Use este template** para criar um novo repositório ou clone-o:

```bash
git clone https://github.com/igorroc/fullstack-next-template.git meu-projeto
cd meu-projeto
```

2. **Instale as dependências:**

```bash
npm install
# ou
bun install
```

3. **Configure as variáveis de ambiente:**

Crie um arquivo `.env` no diretório raiz (você pode copiar do `.env.example`):

```env
DATABASE_DB="nome_do_seu_banco"
DATABASE_USER="postgres"
DATABASE_PASSWORD="senha_personalizada_db"

POSTGRES_PRISMA_URL="postgresql://postgres:senha_personalizada_db@localhost:5432/nome_do_seu_banco"
AUTHENTICATION_SECRET_KEY="hash_aleatorio_1234567890ABCDE"
```

Substitua os valores pelos seus próprios:
- `DATABASE_DB`: Escolha um nome para seu banco de dados
- `DATABASE_PASSWORD`: Defina uma senha segura
- `AUTHENTICATION_SECRET_KEY`: Gere uma string aleatória segura

4. **Inicie o banco de dados PostgreSQL:**

```bash
npm run compose:up
```

Isso iniciará um container PostgreSQL usando Docker Compose.

5. **Execute as migrações do banco de dados:**

```bash
npm run migrate
```

Isso criará o schema do banco de dados e gerará o Prisma Client.

6. **Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver seu app.

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Faz build para produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o ESLint
- `npm run ts-check` - Verifica tipos sem emitir arquivos
- `npm run compose:up` - Inicia o container PostgreSQL
- `npm run migrate` - Executa as migrações do Prisma
- `npm run migrate:reset` - Reseta o banco de dados e executa as migrações
- `npm run prisma:studio` - Abre o Prisma Studio (GUI do banco de dados)

## Estrutura do Projeto

Este projeto segue princípios de clean architecture com uma estrutura bem organizada:

```
├── src/
│   ├── app/                # Next.js App Router (Camada de Apresentação)
│   │   ├── auth/          # Rotas de autenticação (login, register, logout)
│   │   ├── profile/       # Página de perfil protegida
│   │   ├── layout.tsx     # Layout raiz
│   │   ├── page.tsx       # Página inicial
│   │   └── providers.tsx  # Providers do lado do cliente (NextUI)
│   ├── components/        # Componentes UI Reutilizáveis
│   │   ├── auth/         # Componentes relacionados à autenticação
│   │   ├── home/         # Componentes da página inicial
│   │   └── profile/      # Componentes da página de perfil
│   ├── features/         # Lógica de Negócio por Feature
│   │   ├── auth/        # Actions de autenticação (login, register, logout)
│   │   └── users/       # Actions relacionadas a usuários
│   ├── lib/             # Utilitários e Infraestrutura Compartilhados
│   │   ├── utils/       # Funções utilitárias (validators, etc.)
│   │   ├── auth.ts      # Utilitários de autenticação
│   │   ├── db.ts        # Conexão com banco de dados (Prisma)
│   │   └── proxy.ts     # Proxy do middleware
│   └── types/           # Definições de tipos TypeScript
├── prisma/
│   └── schema.prisma    # Schema do banco de dados
└── public/              # Arquivos estáticos
```

**Princípios Chave:**
- **kebab-case**: Todos os arquivos e pastas usam nomenclatura kebab-case
- **Baseado em features**: Lógica de negócio organizada por domínio (auth, users, etc.)
- **Separação limpa**: Componentes UI separados da lógica de negócio
- **Barrel exports**: Cada pasta tem index.ts para imports limpos

Para documentação detalhada da arquitetura, veja [ARCHITECTURE.md](ARCHITECTURE.md).

## Autenticação

O template inclui um sistema completo de autenticação:

- **Registro** - `/auth/register`
- **Login** - `/auth/login`
- **Logout** - `/auth/logout`
- **Rotas Protegidas** - Usando middleware do Next.js
- **Gerenciamento de Sessão** - Sessões baseadas em JWT

## Banco de Dados

O template usa Prisma com PostgreSQL:

- Edite `prisma/schema.prisma` para modificar seu schema de banco de dados
- Execute `npm run migrate` para aplicar as mudanças
- Use `npm run prisma:studio` para visualizar seus dados

## Deploy na Vercel

A maneira mais fácil de fazer deploy deste template é usando a [Vercel](https://vercel.com):

1. Faça push do seu código para um repositório Git (GitHub, GitLab ou Bitbucket)
2. Importe seu repositório na Vercel
3. Configure as variáveis de ambiente (as mesmas do `.env`)
4. Para o banco de dados, você precisará configurar uma instância PostgreSQL (Vercel Postgres, Railway, Supabase, etc.)
5. Atualize `POSTGRES_PRISMA_URL` com a URL do seu banco de dados de produção
6. Faça o deploy!

Alternativamente, use a CLI da Vercel:

```bash
vercel
```

## Customização

### Estilização

O template usa componentes NextUI com Tailwind CSS. Você pode customizar:

- **Tema**: Edite `tailwind.config.ts` para modificar cores, fontes, etc.
- **NextUI**: Configure o tema do NextUI no mesmo arquivo
- **Componentes**: Todas as páginas usam componentes NextUI que são totalmente customizáveis
- **Dark Mode**: Suporte integrado para modo escuro (ative em `tailwind.config.ts`)

### Adicionando Novas Features

A estrutura do projeto facilita a adição de novas funcionalidades:

1. **Crie uma nova feature** em `src/features/sua-feature/`:
```typescript
// src/features/produtos/get-produtos.ts
"use server"
import db from "@/lib/db"

export async function getProdutos() {
  return await db.produto.findMany()
}
```

2. **Adicione exports** em `src/features/produtos/index.ts`:
```typescript
export { getProdutos } from "./get-produtos"
```

3. **Crie componentes UI** em `src/components/produtos/`:
```typescript
// src/components/produtos/lista-produtos.tsx
"use client"
import { Card } from "@nextui-org/react"

export function ListaProdutos({ produtos }) {
  // Lógica do componente
}
```

4. **Use nas páginas** com imports limpos:
```typescript
// src/app/produtos/page.tsx
import { getProdutos } from "@/features/produtos"
import { ListaProdutos } from "@/components/produtos"

export default async function PaginaProdutos() {
  const produtos = await getProdutos()
  return <ListaProdutos produtos={produtos} />
}
```

### Schema do Banco de Dados

Modifique `prisma/schema.prisma` para adicionar ou alterar models, depois execute:

```bash
npm run migrate:create-only  # Cria migração sem aplicar
npm run migrate              # Aplica as migrações
```

### Exemplos de Imports

A clean architecture permite imports intuitivos:

```typescript
// Features (Server Actions)
import { loginAction, registerAction } from "@/features/auth"
import { getAllUsers } from "@/features/users"

// Componentes
import { LoginForm, RegisterForm } from "@/components/auth"
import { ProfileContent } from "@/components/profile"

// Utilitários
import { isEmail } from "@/lib/utils"
import { getUserBySession } from "@/lib/auth"
import db from "@/lib/db"
```

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto é open source e está disponível sob a [Licença MIT](LICENSE).
