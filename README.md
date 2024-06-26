# Fullstack next template

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Introduction

With this template, you can start a new fullstack NextJS project, including middleware authentication and a database connection.

Everything is set up for you to start coding right away.

## Technologies

-   TypeScript 5.0 - JavaScript with syntax for types.
-   Tailwind CSS 3.3 - A utility-first CSS framework for rapidly building custom designs.
-   Prisma 5.12 - A modern database toolkit for TypeScript & Node.js.
-   PostgreSQL 15 Alpine - A powerful, open-source object-relational database system.
-   Docker 20.10 - A platform for building, sharing, and running applications with containers.

## Getting Started

> To use this template, you need to have Docker and Docker Compose installed on your machine. Check the [official documentation](https://docs.docker.com/get-docker/) to install it.

To get started, you can use the `create-next-app` command to create a new project from this template.

```bash
npx create-next-app@latest --example https://github.com/igorroc/fullstack-next-template
```

Follow the default instructions to create your project.

Once the project is created, you can navigate to your project's folder and install the dependencies.

```bash
cd your_project_name
npm install
```

After that, you need to create a `.env` file in the root of the project with the following content:

```bash
DATABASE_DB="your_database_name"
DATABASE_USER="postgres"
DATABASE_PASSWORD="custom_db_password"

POSTGRES_PRISMA_URL="postgresql://postgres:custom_db_password@localhost:5432/your_database_name"
AUTHENTICATION_SECRET_KEY="random_hash_1234567890ABCDE"
```

Make sure to also change the `POSTGRES_PRISMA_URL` with the correct values.

Now you can start the database with the following command:

```bash
npm run compose:up
```

This command will start a PostgreSQL database in a Docker container.

After that, you need to run the following command to create the database schema:

```bash
npm run migrate
```

Now you can start the development server with the following command:

```bash
npm run dev
```

## Deploy on Vercel

To deploy your project on Vercel, first you need to make sure you don't already have a project that is using the `storage` feature. Vercel doesn't allow multiple storages in one account.

If you don't have a project with storage, you can create a new project on Vercel using the dashboard or the CLI.

```bash
vercel
```

Follow the instructions to deploy your project.

## License

This project is open source and available under the [MIT License](LICENSE).
