import "server-only"

import db from "@/lib/db"
import { PasswordService } from "@/lib/auth/password"
import { ApiResult, type ApiResultType } from "@/lib/api/api-result"
import { AuthSession } from "@/modules/auth/auth-session"
import type { AuthError, LoginRequest, RegisterRequest } from "@/modules/auth/schemas"

type AuthServiceResult = ApiResultType<null, AuthError>

export class AuthService {
	static async login(input: LoginRequest): Promise<AuthServiceResult> {
		const email = input.email.toLowerCase()

		const existingUser = await db.user.findFirst({
			where: {
				email,
			},
			select: {
				id: true,
				password: true,
			},
		})

		if (!existingUser) {
			return ApiResult.failure({ code: "UNAUTHENTICATED", message: "Invalid credentials" })
		}

		const isPasswordCorrect = await PasswordService.verify(existingUser.password, input.password)

		if (!isPasswordCorrect) {
			return ApiResult.failure({ code: "UNAUTHENTICATED", message: "Invalid credentials" })
		}

		await AuthSession.authenticateLogin(existingUser.id)

		return ApiResult.success(null)
	}

	static async register(input: RegisterRequest): Promise<AuthServiceResult> {
		const email = input.email.toLowerCase()

		const existingUser = await db.user.findFirst({
			where: {
				email,
			},
			select: {
				id: true,
			},
		})

		if (existingUser) {
			return ApiResult.failure({ code: "CONFLICT", message: "User already exists" })
		}

		const encryptedPassword = await PasswordService.hash(input.password)

		const newUser = await db.user.create({
			data: {
				name: input.name,
				email,
				password: encryptedPassword,
			},
			select: {
				id: true,
			},
		})

		await AuthSession.authenticateLogin(newUser.id)

		return ApiResult.success(null)
	}

	static async logout(): Promise<AuthServiceResult> {
		await AuthSession.authenticateLogout()

		return ApiResult.success(null)
	}
}
