"use client"

import { useEffect } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

import { logoutAction } from "@/actions/auth/logout"

export default function Logout() {
	const router = useRouter()
	useEffect(() => {
		;(async () => {
			const res = await logoutAction()
			if ("error" in res) return toast.error(res.error)

			router.push("/")
			toast.success("User logged out successfully")
		})()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<main className="flex min-h-dvh flex-col items-center justify-center p-24">
			<h1 className="text-2xl font-bold">Logging out...</h1>
		</main>
	)
}
