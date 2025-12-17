"use client"

import { Input, Button } from "@nextui-org/react"
import { toast } from "react-toastify"
import { registerAction } from "@/features/auth/register"
import { useState } from "react"

export function RegisterForm() {
	const [isLoading, setIsLoading] = useState(false)

	async function registerClient(formData: FormData) {
		setIsLoading(true)
		try {
			const res = await registerAction(formData)

			if (res && "error" in res) {
				toast.error(res.error)
				setIsLoading(false)
			}
			// Se não houver erro, o redirect() na action vai redirecionar automaticamente
		} catch (error) {
			// O redirect() lança uma exceção que é capturada pelo Next.js
			// Não precisa fazer nada aqui
		}
	}

	return (
		<form action={registerClient} className="flex flex-col gap-4">
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
