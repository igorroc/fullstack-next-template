import type { AuthResponse, LoginRequest, RegisterRequest } from "@/features/auth/schemas"

async function postJson<TRequest, TResponse>(url: string, body?: TRequest): Promise<TResponse> {
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: body ? JSON.stringify(body) : undefined,
	})

	return response.json() as Promise<TResponse>
}

export const apiClient = {
	login(input: LoginRequest) {
		return postJson<LoginRequest, AuthResponse>("/api/auth/login", input)
	},
	register(input: RegisterRequest) {
		return postJson<RegisterRequest, AuthResponse>("/api/auth/register", input)
	},
	logout() {
		return postJson<undefined, AuthResponse>("/api/auth/logout")
	},
}
