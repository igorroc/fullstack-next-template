"use server"

import bcrypt from "bcrypt"
import { redirect } from "next/navigation"

import db from "@/modules/db"

import { isEmail } from "@/utils/Validators"
import { authenticateLogin } from "@/modules/auth"

export async function loginAction(formData: FormData) {
	const user = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	}

	if (!user.email || !user.password) {
		return {
			error: "Please fill in all fields",
		}
	}

	if (!isEmail(user.email)) {
		return {
			error: "Please enter a valid email",
		}
	}

	try {
		const existingUser = await db.user.findFirst({
			where: {
				email: user.email,
			},
		})

		if (!existingUser) {
			return {
				error: "User does not exist",
			}
		}

		const isPasswordCorrect = await bcrypt.compare(user.password, existingUser.password)

		if (!isPasswordCorrect) {
			return {
				error: "Password is incorrect",
			}
		}

		await authenticateLogin(existingUser)
	} catch (e) {
		return {
			error: "Something went wrong. Please try again later.",
		}
	}

	redirect("/profile")
}
