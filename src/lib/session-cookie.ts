import { NextRequest } from "next/server"

const SESSION_COOKIE_NAME = "session"

export class SessionCookie {
	static hasSessionCookie(request: NextRequest) {
		return Boolean(request.cookies.get(SESSION_COOKIE_NAME)?.value)
	}
}
