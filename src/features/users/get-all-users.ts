"use server"

import db from "@/lib/db"

export async function getAllUsers() {
	try {

		return await db.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				createdAt: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		})
	} catch (error) {
		console.error("Error fetching users:", error)
		return []
	}
}
