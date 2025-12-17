"use client"

import Link from "next/link"
import { Button, Card, CardBody, CardHeader, Chip } from "@nextui-org/react"

export function HomeContent() {
	return (
		<main className="flex min-h-dvh flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-gray-800">
			<Card className="max-w-2xl w-full">
				<CardHeader className="flex flex-col items-center gap-2 pb-4">
					<h1 className="text-4xl font-bold text-center">
						Welcome to Your Fullstack Template
					</h1>
					<Chip color="primary" variant="flat">
						Next.js 16 + Prisma + PostgreSQL
					</Chip>
				</CardHeader>
				<CardBody className="gap-4">
					<p className="text-center text-gray-600">
						This is a ready-to-use fullstack Next.js template with authentication
						and database integration. Start building your application by editing{" "}
						<code className="bg-gray-100 px-2 py-1 rounded text-sm">
							src/app/page.tsx
						</code>
					</p>

					<div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
						<Button
							as={Link}
							href="/auth/login"
							color="primary"
							variant="shadow"
							size="lg"
						>
							Login
						</Button>
						<Button
							as={Link}
							href="/auth/register"
							color="secondary"
							variant="shadow"
							size="lg"
						>
							Register
						</Button>
						<Button
							as={Link}
							href="/profile"
							color="default"
							variant="bordered"
							size="lg"
						>
							Private Page
						</Button>
					</div>
				</CardBody>
			</Card>
		</main>
	)
}
