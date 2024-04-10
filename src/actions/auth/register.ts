"use server"

import bcrypt from "bcrypt"

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
			const encryptedPassword = await bcrypt.hash(formData.get("password") as string, 10)

			const newUser = await db.user.create({
				data: {
					name: user.name,
					email: user.email,
					password: encryptedPassword,
				},
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
