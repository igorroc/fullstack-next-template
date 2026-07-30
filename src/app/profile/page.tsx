import { requireUser } from "@/lib/auth"
import { ProfileContent } from "@/components/profile/profile-content"

export default async function Profile() {
	const user = await requireUser()

	return <ProfileContent user={user} />
}
