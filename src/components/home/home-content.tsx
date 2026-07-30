"use client"

import Link from "next/link"
import { Button, Card, CardBody, CardHeader, Chip } from "@nextui-org/react"

export function HomeContent() {
	return (
		<main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6 py-12">
			<div className="absolute left-8 top-12 h-52 w-52 rounded-full bg-sky-400/20 blur-3xl" />
			<div className="absolute bottom-12 right-6 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />

			<Card className="w-full max-w-3xl border border-white/15 bg-white/10 shadow-2xl shadow-sky-950/40 backdrop-blur-xl">
				<CardHeader className="flex flex-col items-center gap-4 px-6 pb-2 pt-8 text-center sm:px-10">
					<Chip
						color="primary"
						variant="flat"
						className="border border-sky-300/20 bg-sky-400/10 text-sky-100"
					>
						Next.js 16 + Prisma + PostgreSQL
					</Chip>
					<h1 className="max-w-2xl text-4xl font-black tracking-tight text-white sm:text-6xl">
						Seu ponto de partida para apps fullstack modernos
					</h1>
				</CardHeader>
				<CardBody className="gap-8 px-6 pb-8 sm:px-10">
					<p className="mx-auto max-w-2xl text-center text-base leading-7 text-slate-200 sm:text-lg">
						Template pronto para evoluir seu produto com autenticação, banco de dados e uma base
						visual mais acolhedora. Comece ajustando{" "}
						<code className="rounded-lg border border-white/10 bg-white/10 px-2 py-1 text-sm text-sky-100">
							src/app/page.tsx
						</code>
					</p>

					<div className="grid gap-3 rounded-3xl border border-white/10 bg-slate-950/30 p-4 text-sm text-slate-200 sm:grid-cols-3">
						<div className="rounded-2xl bg-white/10 p-4">
							<strong className="block text-white">Autenticação</strong>
							Login, cadastro e sessão protegida.
						</div>
						<div className="rounded-2xl bg-white/10 p-4">
							<strong className="block text-white">Banco integrado</strong>
							Prisma configurado para produção.
						</div>
						<div className="rounded-2xl bg-white/10 p-4">
							<strong className="block text-white">UI pronta</strong>
							Componentes bonitos e responsivos.
						</div>
					</div>

					<div className="flex flex-col justify-center gap-3 sm:flex-row">
						<Button
							as={Link}
							href="/auth/login"
							color="primary"
							variant="shadow"
							size="lg"
							className="font-semibold"
						>
							Entrar
						</Button>
						<Button as={Link} href="/auth/register" color="secondary" variant="shadow" size="lg">
							Criar conta
						</Button>
						<Button
							as={Link}
							href="/profile"
							variant="bordered"
							size="lg"
							className="border-white/60 bg-white/5 font-semibold text-slate-100 hover:bg-white/10"
						>
							Ver perfil
						</Button>
					</div>
				</CardBody>
			</Card>
		</main>
	)
}
