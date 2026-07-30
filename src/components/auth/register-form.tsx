"use client"

import { Input, Button } from "@nextui-org/react"
import { toast } from "react-toastify"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { ApiClient } from "@/lib/api/api-client"
import { TypeGuard } from "@/lib/api/api-result"

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

			router.replace("/profile")
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
				label="Nome"
				placeholder="Seu nome"
				name="name"
				isRequired
				variant="bordered"
				classNames={{
					inputWrapper:
						"border-white/25 bg-slate-900/30 hover:border-fuchsia-300/60 group-data-[focus=true]:border-fuchsia-300",
					label: "text-slate-200 group-data-[filled-within=true]:text-fuchsia-100",
					input: "text-white placeholder:text-slate-400",
				}}
				isDisabled={isLoading}
			/>
			<Input
				type="email"
				label="Email"
				placeholder="voce@email.com"
				name="email"
				isRequired
				variant="bordered"
				classNames={{
					inputWrapper:
						"border-white/25 bg-slate-900/30 hover:border-fuchsia-300/60 group-data-[focus=true]:border-fuchsia-300",
					label: "text-slate-200 group-data-[filled-within=true]:text-fuchsia-100",
					input: "text-white placeholder:text-slate-400",
				}}
				isDisabled={isLoading}
			/>
			<Input
				type="password"
				label="Senha"
				placeholder="Crie uma senha segura"
				name="password"
				isRequired
				variant="bordered"
				classNames={{
					inputWrapper:
						"border-white/25 bg-slate-900/30 hover:border-fuchsia-300/60 group-data-[focus=true]:border-fuchsia-300",
					label: "text-slate-200 group-data-[filled-within=true]:text-fuchsia-100",
					input: "text-white placeholder:text-slate-400",
				}}
				isDisabled={isLoading}
			/>
			<Button
				type="submit"
				color="secondary"
				size="lg"
				className="mt-2 font-semibold"
				isLoading={isLoading}
			>
				Criar conta
			</Button>
		</form>
	)
}
