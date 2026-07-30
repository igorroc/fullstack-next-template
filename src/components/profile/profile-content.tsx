"use client"

import {
	Card,
	CardBody,
	CardHeader,
	Button,
	Chip,
	Avatar,
	Divider,
} from "@nextui-org/react"
import Link from "next/link"

type UserType = {
	id: string
	email: string
	name: string | null
	createdAt?: Date
}

type ProfileContentProps = {
	user: UserType | null
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

	const formatDate = (date?: Date) => {
		if (!date) return "N/A"
		return new Date(date).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		})
	}

	return (
		<main className="flex min-h-dvh flex-col items-center p-8 py-12 bg-gradient-to-br from-gray-900 to-gray-800">
			<div className="max-w-3xl w-full space-y-6">
				<Card className="w-full">
					<CardHeader className="flex flex-col items-center gap-3 pb-4 pt-6">
						<Chip color="success" variant="flat" size="sm">
							Authenticated
						</Chip>
						<h1 className="text-3xl font-bold text-center">Your Profile</h1>
					</CardHeader>
					<CardBody className="gap-6">
						<div className="flex flex-col items-center gap-4">
							<Avatar
								name={user.name?.charAt(0).toUpperCase() || "U"}
								size="lg"
								showFallback
								className="w-20 h-20 text-large"
							/>
							<div className="text-center">
								<h2 className="text-xl font-semibold">{user.name || "User"}</h2>
								<p className="text-sm text-gray-500">{user.email}</p>
								{user.createdAt && (
									<p className="text-xs text-gray-400 mt-1">
										Member since {formatDate(user.createdAt)}
									</p>
								)}
							</div>
						</div>

						<Divider />

						<div className="flex flex-col sm:flex-row gap-2">
							<Button
								as={Link}
								href="/"
								color="default"
								variant="bordered"
								fullWidth
							>
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
			</div>
		</main>
	)
}
