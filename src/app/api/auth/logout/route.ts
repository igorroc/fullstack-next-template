import { logoutUser } from "@/features/auth/service"
import { apiError, apiSuccess } from "@/lib/api-response"

export async function POST() {
	try {
		await logoutUser()
		return apiSuccess()
	} catch {
		return apiError("INTERNAL_ERROR", "Error logging out. Try again later.", 500)
	}
}
