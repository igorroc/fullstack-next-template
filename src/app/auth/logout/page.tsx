import { LogoutContent } from "@/components/auth/logout-content"

type LogoutPageProps = {
	searchParams: Promise<{
		reason?: string
	}>
}

export default async function Logout({ searchParams }: LogoutPageProps) {
	const { reason } = await searchParams

	return <LogoutContent isExpired={reason === "expired"} />
}
