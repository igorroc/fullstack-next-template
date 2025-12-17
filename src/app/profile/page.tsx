import { getUserBySession } from "@/lib/auth"
import { getAllUsers } from "@/features/users/get-all-users"
import { ProfileContent } from "@/components/profile/profile-content"

export default async function Profile() {
	const user = await getUserBySession()
	const allUsers = await getAllUsers()

	return <ProfileContent user={user} allUsers={allUsers} />
}
