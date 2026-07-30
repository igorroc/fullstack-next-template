import { AuthService } from "@/modules/auth"
import { ApiResponse } from "@/lib/api/api-response"

export async function POST() {
	try {
		await AuthService.logout()
		return ApiResponse.success()
	} catch {
		return ApiResponse.error("INTERNAL_ERROR", "Error logging out. Try again later.", 500)
	}
}
