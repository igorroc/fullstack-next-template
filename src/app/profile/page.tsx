import { getUserBySession } from "@/modules/auth"
import Link from "next/link"
import React from "react"

export default async function Profile() {
	const user = await getUserBySession()

	if (!user) {
		return <p>Not logged in fall back</p>
	}

	return (
		<main className="flex min-h-dvh flex-col items-center justify-center p-24">
			<h1 className="text-2xl font-bold">Welcome</h1>
			<p className="text-gray-500 mt-2">
				You are logged in as <span className="font-bold">{user.email}</span>
			</p>
			<Link
				className="mt-16 px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all"
				href="/auth/logout"
			>
				Log out
			</Link>
		</main>
	)
}
