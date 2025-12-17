"use client"

import { Input, Button } from "@nextui-org/react"
import { toast } from "react-toastify"
import { loginAction } from "@/actions/auth/login"

export default function Form() {
	async function loginClient(formData: FormData) {
		const res = await loginAction(formData)

		if ("error" in res) {
			toast.error(res.error)
		} else {
			toast.success("User logged in successfully")
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
			/>
			<Input
				type="password"
				label="Password"
				placeholder="Enter your password"
				name="password"
				isRequired
				variant="bordered"
			/>
			<Button type="submit" color="primary" size="lg" className="mt-2">
				Login
			</Button>
		</form>
	)
}
