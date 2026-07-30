import { AuthService, loginRequestSchema } from "@/modules/auth"
import { ApiResponse } from "@/lib/api/api-response"
import { TypeGuard } from "@/lib/api/api-result"

export async function POST(request: Request) {
	const body = await request.json().catch(() => null)
	const parsed = loginRequestSchema.safeParse(body)

	if (!parsed.success) {
		return ApiResponse.error(
			"VALIDATION_ERROR",
			parsed.error.issues[0]?.message ?? "Invalid request",
			400,
		)
	}

	try {
		const result = await AuthService.login(parsed.data)

		if (TypeGuard.isFailure(result)) {
			return ApiResponse.error(result.error.code, result.error.message, 401)
		}

		return ApiResponse.success()
	} catch {
		return ApiResponse.error("INTERNAL_ERROR", "Something went wrong. Please try again later.", 500)
	}
}
