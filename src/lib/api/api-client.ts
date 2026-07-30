import type { AuthResponse, LoginRequest, RegisterRequest } from "@/modules/auth/schemas"

export class ApiClient {
	static login(input: LoginRequest) {
		return this.postJson<LoginRequest, AuthResponse>("/api/auth/login", input)
	}

	static register(input: RegisterRequest) {
		return this.postJson<RegisterRequest, AuthResponse>("/api/auth/register", input)
	}

	static logout() {
		return this.postJson<undefined, AuthResponse>("/api/auth/logout")
	}

	private static async postJson<TRequest, TResponse>(
		url: string,
		body?: TRequest,
	): Promise<TResponse> {
		const response = await fetch(url, {
			method: "POST",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			body: body ? JSON.stringify(body) : undefined,
		})

		return response.json() as Promise<TResponse>
	}
}
