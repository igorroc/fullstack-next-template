import { NextRequest } from "next/server"

import { hasSessionCookie } from "./lib/session-cookie"

export async function proxy(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith("/profile")) {
		if (!hasSessionCookie(request)) {
			return Response.redirect(new URL("/auth/login", request.url))
		}
	}
}

export const config = {
	matcher: ["/profile/:path*"],
}
