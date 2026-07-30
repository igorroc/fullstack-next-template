import "server-only"

import db from "@/lib/db"
import { authenticateLogin, authenticateLogout } from "@/lib/auth"
import { hashPassword, verifyPassword } from "@/lib/password"
import { failure, success, type ApiResult } from "@/lib/api-result"
import type { AuthError, LoginRequest, RegisterRequest } from "@/features/auth/schemas"

type AuthServiceResult = ApiResult<null, AuthError>

export async function loginUser(input: LoginRequest): Promise<AuthServiceResult> {
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
		return failure({ code: "UNAUTHENTICATED", message: "Invalid credentials" })
	}

	const isPasswordCorrect = await verifyPassword(existingUser.password, input.password)

	if (!isPasswordCorrect) {
		return failure({ code: "UNAUTHENTICATED", message: "Invalid credentials" })
	}

	await authenticateLogin(existingUser.id)

	return success(null)
}

export async function registerUser(input: RegisterRequest): Promise<AuthServiceResult> {
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
		return failure({ code: "CONFLICT", message: "User already exists" })
	}

	const encryptedPassword = await hashPassword(input.password)

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

	await authenticateLogin(newUser.id)

	return success(null)
}

export async function logoutUser(): Promise<AuthServiceResult> {
	await authenticateLogout()

	return success(null)
}
