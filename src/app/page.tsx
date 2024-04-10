import Link from "next/link"

export default function Home() {
	return (
		<main className="flex min-h-dvh flex-col items-center justify-center p-24">
			<h1 className="text-2xl font-bold">Welcome</h1>
			<p>
				To the default page of the app. You can start by editing the{" "}
				<code>src/app/page.tsx</code> file.
			</p>

			<div className="flex gap-2 mt-16">
				<Link
					className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all"
					href="/auth/login"
				>
					Login
				</Link>
				<Link
					className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all"
					href="/auth/register"
				>
					Register
				</Link>
			</div>
		</main>
	)
}
