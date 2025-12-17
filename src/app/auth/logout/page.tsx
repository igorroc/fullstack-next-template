"use client"

import { useEffect, useRef } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

import { logoutAction } from "@/features/auth/logout"

export default function Logout() {
	const router = useRouter()
	const hasLoggedOut = useRef(false)

	useEffect(() => {
		if (hasLoggedOut.current) return

		hasLoggedOut.current = true

		;(async () => {
			const res = await logoutAction()
			if ("error" in res) {
				toast.error(res.error)
				return
			}

			toast.success("User logged out successfully")
			router.push("/")
		})()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<main className="flex min-h-dvh flex-col items-center justify-center p-24">
			<h1 className="text-2xl font-bold">Logging out...</h1>
		</main>
	)
}
