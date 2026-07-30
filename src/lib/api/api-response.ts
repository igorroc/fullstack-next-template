import { NextResponse } from "next/server"
import { ApiResult } from "@/lib/api/api-result"
import type { AuthError, AuthResponse } from "@/modules/auth/schemas"

type ErrorCode = AuthError["code"]

export class ApiResponse {
	static success(status = 200) {
		return NextResponse.json<AuthResponse>(ApiResult.success(null), { status })
	}

	static error(code: ErrorCode, message: string, status: number) {
		return NextResponse.json<AuthResponse>(ApiResult.failure({ code, message }), { status })
	}
}
