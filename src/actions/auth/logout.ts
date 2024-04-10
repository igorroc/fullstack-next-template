"use server"

import { authenticateLogout } from "@/modules/auth"

export async function logoutAction() {
	try {
		await authenticateLogout()
		return { success: true }
	} catch (error) {
		return { error: "Error logging out. Try again later." }
	}
}
