import { NextRequest } from "next/server"

import { hasSessionCookie } from "./lib/session-cookie"


export async function proxy(request: NextRequest) {
	if (
		request.nextUrl.pathname.startsWith("/auth") &&
		!request.nextUrl.pathname.startsWith("/auth/logout")
	) {
		if (hasSessionCookie(request)) {
			return Response.redirect(new URL("/profile", request.url))
		}
	}

	if (request.nextUrl.pathname.startsWith("/profile")) {
		if (!hasSessionCookie(request)) {
			return Response.redirect(new URL("/auth/login", request.url))
		}
	}
}

export const config = {
	matcher: ["/api/:path*", "/dashboard/:path*", "/auth/:path*", "/profile/:path*"],
}
