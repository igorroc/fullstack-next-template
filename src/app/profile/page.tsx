import { getUserBySession } from "@/modules/auth"
import { ProfileContent } from "./profile-content"

export default async function Profile() {
	const user = await getUserBySession()

	return <ProfileContent user={user} />
}
