import { loginRequestSchema } from "@/features/auth/schemas"
import { loginUser } from "@/features/auth/service"
import { apiError, apiSuccess } from "@/lib/api-response"
import { isFailure } from "@/lib/api-result"

export async function POST(request: Request) {
	const body = await request.json().catch(() => null)
	const parsed = loginRequestSchema.safeParse(body)

	if (!parsed.success) {
		return apiError("VALIDATION_ERROR", parsed.error.issues[0]?.message ?? "Invalid request", 400)
	}

	try {
		const result = await loginUser(parsed.data)

		if (isFailure(result)) {
			return apiError(result.error.code, result.error.message, 401)
		}

		return apiSuccess()
	} catch {
		return apiError("INTERNAL_ERROR", "Something went wrong. Please try again later.", 500)
	}
}
