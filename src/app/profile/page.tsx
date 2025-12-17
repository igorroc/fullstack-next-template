import { getUserBySession } from "@/modules/auth"
import { getAllUsers } from "@/actions/users/getUsers"
import { ProfileContent } from "./profile-content"

export default async function Profile() {
	const user = await getUserBySession()
	const allUsers = await getAllUsers()

	return <ProfileContent user={user} allUsers={allUsers} />
}
