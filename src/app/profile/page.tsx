import { AuthSession } from "@/modules/auth"
import { ProfileContent } from "@/components/profile/profile-content"

export default async function Profile() {
	const user = await AuthSession.requireUser()

	return <ProfileContent user={user} />
}
