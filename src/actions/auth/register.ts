"use server"

import db from "@/modules/db"

import { isEmail } from "@/utils/Validators"

export async function registerAction(formData: FormData) {
	const user = {
		name: formData.get("name") as string,
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	}

	if (!user.name || !user.email || !user.password) {
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

		if (existingUser) {
			return {
				error: "User already exists",
			}
		}

		try {
			const newUser = await db.user.create({
				data: user,
			})

			return {
				user: newUser,
			}
		} catch (e) {
			return {
				error: "Error creating user. Please try again later.",
			}
		}
	} catch (e) {
		return {
			error: "Something went wrong. Please try again later.",
		}
	}
}
