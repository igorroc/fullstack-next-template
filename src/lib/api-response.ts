import { NextResponse } from "next/server"
import { failure, success } from "@/lib/api-result"
import type { AuthError, AuthResponse } from "@/features/auth/schemas"

type ErrorCode = AuthError["code"]

export function apiSuccess(status = 200) {
	return NextResponse.json<AuthResponse>(success(null), { status })
}

export function apiError(code: ErrorCode, message: string, status: number) {
	return NextResponse.json<AuthResponse>(failure({ code, message }), { status })
}
