import { getUserBySession } from "@/lib/auth"
import { ProfileContent } from "@/components/profile/profile-content"

export default async function Profile() {
	const user = await getUserBySession()

	return <ProfileContent user={user} />
}
