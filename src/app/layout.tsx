import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ToastContainer } from "react-toastify"

import "./globals.css"
import "react-toastify/dist/ReactToastify.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Fullstack Project",
	description: "Fullstack Project with Next.js and Prisma",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<ToastContainer />
					{children}
				</Providers>
			</body>
		</html>
	)
}
