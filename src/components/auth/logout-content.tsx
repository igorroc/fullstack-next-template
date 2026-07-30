"use client"

import { useEffect, useRef } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

import { ApiClient } from "@/lib/api-client"
import { TypeGuard } from "@/lib/api-result"

type LogoutContentProps = {
	isExpired: boolean
}

export function LogoutContent({ isExpired }: LogoutContentProps) {
	const router = useRouter()
	const hasLoggedOut = useRef(false)

	useEffect(() => {
		if (hasLoggedOut.current) return

		hasLoggedOut.current = true

		;(async () => {
			const res = await ApiClient.logout()
			if (TypeGuard.isFailure(res)) {
				toast.error(res.error.message)
				return
			}

			toast.success(isExpired ? "Session expired. Please log in again." : "User logged out successfully")
			router.push("/")
		})()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<main className="flex min-h-dvh flex-col items-center justify-center p-24">
			<h1 className="text-2xl font-bold">{isExpired ? "Session expired..." : "Logging out..."}</h1>
		</main>
	)
}
