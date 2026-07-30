"use client"

import { Avatar, Card, Chip } from "@heroui/react"
import Link from "next/link"

import type { CurrentUser } from "@/modules/auth"

type ProfileContentProps = {
	user: CurrentUser
}

export function ProfileContent({ user }: ProfileContentProps) {
	const formatDate = (date?: Date) => {
		if (!date) return "N/A"
		return new Date(date).toLocaleDateString("pt-BR", {
			year: "numeric",
			month: "short",
			day: "numeric",
		})
	}

	return (
		<main className="relative flex min-h-dvh flex-col items-center overflow-hidden px-6 py-12">
			<div className="absolute top-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/15 blur-3xl" />
			<div className="w-full max-w-3xl space-y-6">
				<Card className="w-full border border-white/15 bg-white/10 shadow-2xl shadow-emerald-950/30 backdrop-blur-xl">
					<Card.Header className="flex flex-col items-center gap-4 pt-8 pb-4 text-center">
						<Chip
							color="success"
							variant="soft"
							size="sm"
							className="border border-emerald-300/20 bg-emerald-400/15 text-emerald-100"
						>
							Autenticado
						</Chip>
						<h1 className="text-4xl font-black text-white">Seu perfil</h1>
						<p className="max-w-md text-sm text-slate-300">
							Esta é sua área privada. Aqui você pode validar os dados da sessão atual.
						</p>
					</Card.Header>
					<Card.Content className="gap-6 px-6 pb-8">
						<div className="flex flex-col items-center gap-4">
							<Avatar
								size="lg"
								className="text-large h-24 w-24 bg-gradient-to-br from-emerald-300 to-sky-400 text-slate-950"
							>
								<Avatar.Fallback>{user.name?.charAt(0).toUpperCase() || "U"}</Avatar.Fallback>
							</Avatar>
							<div className="text-center">
								<h2 className="text-2xl font-bold text-white">{user.name || "Usuário"}</h2>
								<p className="text-sm text-slate-300">{user.email}</p>
								{user.createdAt && (
									<p className="mt-2 text-xs text-slate-400">
										Membro desde {formatDate(user.createdAt)}
									</p>
								)}
							</div>
						</div>

						<div className="h-px bg-white/10" />

						<div className="flex flex-col gap-3 sm:flex-row">
							<Link
								href="/"
								className="w-full rounded-2xl border border-white/60 bg-white/5 px-6 py-3 text-center font-semibold text-slate-100 transition hover:bg-white/10"
							>
								Voltar ao início
							</Link>
							<Link
								href="/auth/logout"
								className="w-full rounded-2xl bg-red-500 px-6 py-3 text-center font-semibold text-white shadow-lg shadow-red-950/30 transition hover:bg-red-400"
							>
								Sair
							</Link>
						</div>
					</Card.Content>
				</Card>
			</div>
		</main>
	)
}
