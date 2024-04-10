"use client"

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
		<form action={loginClient} className="flex flex-col gap-1">
			<input
				type="email"
				placeholder="Your email"
				name="email"
				className="p-2 bg-transparent border-b-2 border-gray-700"
			/>
			<input
				type="password"
				placeholder="Your password"
				name="password"
				className="p-2 bg-transparent border-b-2 border-gray-700"
			/>
			<button
				type="submit"
				className="mt-4 px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all"
			>
				Login
			</button>
		</form>
	)
}
