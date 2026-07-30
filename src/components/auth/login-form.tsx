"use client"

import { Input, Button } from "@nextui-org/react"
import { toast } from "react-toastify"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { apiClient } from "@/lib/api-client"
import { isFailure } from "@/lib/api-result"

export function LoginForm() {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	async function loginClient(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setIsLoading(true)

		const formData = new FormData(event.currentTarget)

		try {
			const res = await apiClient.login({
				email: String(formData.get("email") ?? ""),
				password: String(formData.get("password") ?? ""),
			})

			if (isFailure(res)) {
				toast.error(res.error.message)
				setIsLoading(false)
				return
			}

			router.push("/profile")
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
				label="Email"
				placeholder="Enter your email"
				name="email"
				isRequired
				variant="bordered"
				isDisabled={isLoading}
			/>
			<Input
				type="password"
				label="Password"
				placeholder="Enter your password"
				name="password"
				isRequired
				variant="bordered"
				isDisabled={isLoading}
			/>
			<Button
				type="submit"
				color="primary"
				size="lg"
				className="mt-2"
				isLoading={isLoading}
			>
				Login
			</Button>
		</form>
	)
}
