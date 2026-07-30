"use client"

import { Card, CardBody, CardHeader, Button, Chip, Avatar, Divider } from "@nextui-org/react"
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
			<div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/15 blur-3xl" />
			<div className="w-full max-w-3xl space-y-6">
				<Card className="w-full border border-white/15 bg-white/10 shadow-2xl shadow-emerald-950/30 backdrop-blur-xl">
					<CardHeader className="flex flex-col items-center gap-4 pb-4 pt-8 text-center">
						<Chip
							color="success"
							variant="flat"
							size="sm"
							className="border border-emerald-300/20 bg-emerald-400/15 text-emerald-100"
						>
							Autenticado
						</Chip>
						<h1 className="text-4xl font-black text-white">Seu perfil</h1>
						<p className="max-w-md text-sm text-slate-300">
							Esta é sua área privada. Aqui você pode validar os dados da sessão atual.
						</p>
					</CardHeader>
					<CardBody className="gap-6 px-6 pb-8">
						<div className="flex flex-col items-center gap-4">
							<Avatar
								name={user.name?.charAt(0).toUpperCase() || "U"}
								size="lg"
								showFallback
								className="h-24 w-24 bg-gradient-to-br from-emerald-300 to-sky-400 text-large text-slate-950"
							/>
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

						<Divider className="bg-white/10" />

						<div className="flex flex-col gap-3 sm:flex-row">
							<Button
								as={Link}
								href="/"
								variant="bordered"
								className="border-white/60 bg-white/5 font-semibold text-slate-100 hover:bg-white/10"
								fullWidth
							>
								Voltar ao início
							</Button>
							<Button as={Link} href="/auth/logout" color="danger" variant="shadow" fullWidth>
								Sair
							</Button>
						</div>
					</CardBody>
				</Card>
			</div>
		</main>
	)
}
