"use client"

import { Card, CardBody, CardHeader, Button, Chip, User } from "@nextui-org/react"
import Link from "next/link"

type ProfileContentProps = {
	user: {
		id: string
		email: string
		name: string | null
	} | null
}

export function ProfileContent({ user }: ProfileContentProps) {
	if (!user) {
		return (
			<main className="flex min-h-dvh flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-gray-800">
				<Card className="max-w-md w-full">
					<CardBody className="text-center">
						<p className="text-lg">You are not logged in</p>
						<Button as={Link} href="/auth/login" color="primary" className="mt-4">
							Go to Login
						</Button>
					</CardBody>
				</Card>
			</main>
		)
	}

	return (
		<main className="flex min-h-dvh flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-gray-800">
			<Card className="max-w-2xl w-full">
				<CardHeader className="flex flex-col items-center gap-3 pb-4">
					<Chip color="success" variant="flat">
						Authenticated
					</Chip>
					<h1 className="text-3xl font-bold text-center">Profile</h1>
				</CardHeader>
				<CardBody className="gap-6">
					<div className="flex flex-col items-center gap-4">
						<User
							name={user.name || "User"}
							description={user.email}
							avatarProps={{
								size: "lg",
								showFallback: true,
								name: user.name?.charAt(0).toUpperCase() || "U",
							}}
						/>
						<div className="text-center">
							<p className="text-sm text-gray-500">
								Welcome back! You are successfully logged in.
							</p>
						</div>
					</div>

					<div className="flex flex-col gap-2 mt-4">
						<Button as={Link} href="/" color="default" variant="bordered" fullWidth>
							Back to Home
						</Button>
						<Button
							as={Link}
							href="/auth/logout"
							color="danger"
							variant="shadow"
							fullWidth
						>
							Log out
						</Button>
					</div>
				</CardBody>
			</Card>
		</main>
	)
}
