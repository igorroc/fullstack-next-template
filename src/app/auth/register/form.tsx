"use client"

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
		<form action={registerClient} className="flex flex-col gap-1">
			<input
				type="text"
				placeholder="Your name"
				name="name"
				className="p-2 bg-transparent border-b-2 border-gray-700"
			/>
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
				Register
			</button>
		</form>
	)
}
