"use client"

import { Card, CardBody, CardHeader } from "@nextui-org/react"
import Link from "next/link"
import { LoginForm } from "./login-form"

export function LoginContent() {
	return (
		<main className="flex min-h-dvh flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-gray-800">
			<Card className="max-w-md w-full">
				<CardHeader className="flex flex-col gap-2 pb-4">
					<h1 className="text-3xl font-bold text-center">Login</h1>
					<p className="text-sm text-gray-500 text-center">
						Enter your credentials to access your account
					</p>
				</CardHeader>
				<CardBody>
					<LoginForm />
					<p className="text-sm text-center text-gray-500 mt-4">
						Don&apos;t have an account?{" "}
						<Link href="/auth/register" className="text-primary hover:underline">
							Register here
						</Link>
					</p>
				</CardBody>
			</Card>
		</main>
	)
}
