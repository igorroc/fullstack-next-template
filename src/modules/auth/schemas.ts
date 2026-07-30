import { z } from "zod"
import type { ApiResultType } from "@/lib/api/api-result"

export const loginRequestSchema = z.object({
	email: z.email("Please enter a valid email").trim().max(255),
	password: z.string().min(1, "Please fill in all fields").max(255),
})

export const registerRequestSchema = z.object({
	name: z.string().trim().min(1, "Please fill in all fields").max(120),
	email: z.email("Please enter a valid email").trim().max(255),
	password: z.string().min(1, "Please fill in all fields").max(255),
})

export type LoginRequest = z.infer<typeof loginRequestSchema>
export type RegisterRequest = z.infer<typeof registerRequestSchema>

export type AuthError = {
	code: "VALIDATION_ERROR" | "UNAUTHENTICATED" | "CONFLICT" | "INTERNAL_ERROR"
	message: string
}

export type AuthResponse = ApiResultType<null, AuthError>
