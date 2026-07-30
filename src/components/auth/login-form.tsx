"use client"

import { Input, Button } from "@heroui/react"
import { toast } from "react-toastify"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { ApiClient } from "@/lib/api/api-client"
import { TypeGuard } from "@/lib/api/api-result"

export function LoginForm() {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	async function loginClient(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setIsLoading(true)

		const formData = new FormData(event.currentTarget)

		try {
			const res = await ApiClient.login({
				email: String(formData.get("email") ?? ""),
				password: String(formData.get("password") ?? ""),
			})

			if (TypeGuard.isFailure(res)) {
				toast.error(res.error.message)
				setIsLoading(false)
				return
			}

			router.replace("/profile")
			router.refresh()
		} catch {
			toast.error("Something went wrong. Please try again later.")
			setIsLoading(false)
		}
	}

	return (
		<form onSubmit={loginClient} className="flex flex-col gap-4">
			<Input
				type="email"
				aria-label="Email"
				placeholder="voce@email.com"
				name="email"
				required
				variant="primary"
				disabled={isLoading}
			/>
			<Input
				type="password"
				aria-label="Senha"
				placeholder="Sua senha"
				name="password"
				required
				variant="primary"
				disabled={isLoading}
			/>
			<Button
				type="submit"
				variant="primary"
				size="lg"
				fullWidth
				className="mt-2 font-semibold"
				isDisabled={isLoading}
			>
				Entrar
			</Button>
		</form>
	)
}
