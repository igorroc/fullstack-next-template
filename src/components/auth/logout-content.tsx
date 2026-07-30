"use client"

import { useEffect, useRef } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

import { ApiClient } from "@/lib/api/api-client"
import { TypeGuard } from "@/lib/api/api-result"

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

			toast.success(
				isExpired ? "Session expired. Please log in again." : "User logged out successfully",
			)
			router.push("/")
		})()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<main className="flex min-h-dvh flex-col items-center justify-center px-6 py-12 text-center">
			<div className="rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
				<div className="mx-auto mb-5 h-12 w-12 animate-pulse rounded-full bg-sky-300/30 ring-8 ring-sky-300/10" />
				<h1 className="text-3xl font-black text-white">
					{isExpired ? "Sessão expirada" : "Encerrando sessão"}
				</h1>
				<p className="mt-3 text-sm text-slate-300">
					{isExpired
						? "Redirecionando para a tela inicial."
						: "Estamos finalizando seu acesso com segurança."}
				</p>
			</div>
		</main>
	)
}
