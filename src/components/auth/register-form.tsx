"use client"

import { Input, Button } from "@nextui-org/react"
import { toast } from "react-toastify"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { ApiClient } from "@/lib/api-client"
import { TypeGuard } from "@/lib/api-result"

export function RegisterForm() {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	async function registerClient(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setIsLoading(true)

		const formData = new FormData(event.currentTarget)

		try {
			const res = await ApiClient.register({
				name: String(formData.get("name") ?? ""),
				email: String(formData.get("email") ?? ""),
				password: String(formData.get("password") ?? ""),
			})

			if (TypeGuard.isFailure(res)) {
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
		<form onSubmit={registerClient} className="flex flex-col gap-4">
			<Input
				type="text"
				label="Name"
				placeholder="Enter your name"
				name="name"
				isRequired
				variant="bordered"
				isDisabled={isLoading}
			/>
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
				color="secondary"
				size="lg"
				className="mt-2"
				isLoading={isLoading}
			>
				Register
			</Button>
		</form>
	)
}
