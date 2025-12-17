"use server"

import { User } from "@prisma/client"
import { cookies } from "next/headers"
import { JWTPayload, SignJWT, jwtVerify } from "jose"

const secretKey = process.env.AUTHENTICATION_SECRET_KEY
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("1 week from now")
		.sign(key)
}

export async function decrypt(input: string): Promise<JWTPayload | null> {
	try {
		const { payload } = await jwtVerify(input, key, {
			algorithms: ["HS256"],
		})
		return payload
	} catch (error) {
		return null
	}
}

export async function authenticateLogin(user: User) {
	const session = await encrypt({ user })

	const awaitedCookies = await cookies()
	awaitedCookies.set("session", session, { httpOnly: true })
}
export async function authenticateLogout() {
	const awaitedCookies = await cookies()
	awaitedCookies.set("session", "", { httpOnly: true, expires: new Date(0) })
}

export async function getSession() {
	const awaitedCookies = await cookies()
	const session = awaitedCookies.get("session")
	if (!session || !session.value) return null
	const payload = await decrypt(session.value)

	if (!payload || !payload.exp || payload.exp < Date.now() / 1000) {
		return null
	}

	return payload
}

export async function getUserBySession() {
	const session = await getSession()
	if (!session || !session.user) return null
	return session.user as User
}
