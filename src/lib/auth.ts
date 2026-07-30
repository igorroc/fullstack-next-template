"use server"

import { createHash, randomBytes } from "crypto"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import db from "@/lib/db"
import type { CurrentUser } from "@/lib/auth-types"

const SESSION_COOKIE_NAME = "session"
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7

const safeUserSelect = {
	id: true,
	name: true,
	email: true,
	createdAt: true,
} as const

function createSessionToken() {
	return randomBytes(32).toString("base64url")
}

function hashSessionToken(token: string) {
	return createHash("sha256").update(token).digest("hex")
}

function getSessionExpiration() {
	return new Date(Date.now() + SESSION_DURATION_MS)
}

function getSessionCookieOptions(expires: Date) {
	return {
		expires,
		httpOnly: true,
		path: "/",
		sameSite: "lax" as const,
		secure: process.env.NODE_ENV === "production",
	}
}

export async function authenticateLogin(userId: string) {
	const token = createSessionToken()
	const expiresAt = getSessionExpiration()

	await db.session.create({
		data: {
			expiresAt,
			tokenHash: hashSessionToken(token),
			userId,
		},
	})

	const cookieStore = await cookies()
	cookieStore.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions(expiresAt))
}

export async function authenticateLogout() {
	const cookieStore = await cookies()
	const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

	if (token) {
		await db.session.updateMany({
			where: {
				revokedAt: null,
				tokenHash: hashSessionToken(token),
			},
			data: {
				revokedAt: new Date(),
			},
		})
	}

	cookieStore.set(SESSION_COOKIE_NAME, "", {
		expires: new Date(0),
		httpOnly: true,
		path: "/",
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
	})
}

export async function revokeUserSessions(userId: string) {
	await db.session.updateMany({
		where: {
			revokedAt: null,
			userId,
		},
		data: {
			revokedAt: new Date(),
		},
	})
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
	const cookieStore = await cookies()
	const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

	if (!token) return null

	const session = await db.session.findUnique({
		where: {
			tokenHash: hashSessionToken(token),
		},
		select: {
			expiresAt: true,
			revokedAt: true,
			user: {
				select: safeUserSelect,
			},
		},
	})

	if (!session || session.revokedAt || session.expiresAt <= new Date()) {
		return null
	}

	return session.user
}

export async function requireUser(): Promise<CurrentUser> {
	const user = await getCurrentUser()

	if (!user) {
		redirect("/auth/logout?reason=expired")
	}

	return user
}
