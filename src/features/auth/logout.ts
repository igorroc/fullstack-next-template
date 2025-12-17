"use server"

import { authenticateLogout } from "@/lib/auth"

export async function logoutAction() {
	try {
		await authenticateLogout()
		return { success: true }
	} catch (error) {
		return { error: "Error logging out. Try again later." }
	}
}
