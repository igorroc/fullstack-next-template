"use client"

import { Input, Button } from "@nextui-org/react"
import { toast } from "react-toastify"
import { registerAction } from "@/actions/auth/register"

export default function Form() {
	async function registerClient(formData: FormData) {
		const res = await registerAction(formData)

		if ("error" in res) {
			toast.error(res.error)
		} else {
			toast.success("User registered successfully")
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
			/>
			<Input
				type="email"
				label="Email"
				placeholder="Enter your email"
				name="email"
				isRequired
				variant="bordered"
			/>
			<Input
				type="password"
				label="Password"
				placeholder="Enter your password"
				name="password"
				isRequired
				variant="bordered"
			/>
			<Button type="submit" color="secondary" size="lg" className="mt-2">
				Register
			</Button>
		</form>
	)
}
