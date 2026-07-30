import { NextRequest } from "next/server"

import { SessionCookie } from "./lib/auth/session-cookie"

export async function proxy(request: NextRequest) {
	if (
		request.nextUrl.pathname.startsWith("/auth/login") ||
		request.nextUrl.pathname.startsWith("/auth/register")
	) {
		if (SessionCookie.hasSessionCookie(request)) {
			return Response.redirect(new URL("/profile", request.url))
		}
	}

	if (request.nextUrl.pathname.startsWith("/profile")) {
		if (!SessionCookie.hasSessionCookie(request)) {
			return Response.redirect(new URL("/auth/login", request.url))
		}
	}
}

export const config = {
	matcher: ["/profile/:path*", "/auth/login", "/auth/register"],
}
