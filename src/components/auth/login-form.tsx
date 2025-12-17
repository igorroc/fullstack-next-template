"use client"

import { Input, Button } from "@nextui-org/react"
import { toast } from "react-toastify"
import { loginAction } from "@/features/auth/login"
import { useState } from "react"

export function LoginForm() {
	const [isLoading, setIsLoading] = useState(false)

	async function loginClient(formData: FormData) {
		setIsLoading(true)
		try {
			const res = await loginAction(formData)

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
		<form action={loginClient} className="flex flex-col gap-4">
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
