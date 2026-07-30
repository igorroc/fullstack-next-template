"use client"

import { Card, CardBody, CardHeader } from "@nextui-org/react"
import Link from "next/link"
import { LoginForm } from "./login-form"

export function LoginContent() {
	return (
		<main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6 py-12">
			<div className="absolute -top-20 right-10 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
			<Card className="w-full max-w-md border border-white/15 bg-white/10 shadow-2xl shadow-sky-950/40 backdrop-blur-xl">
				<CardHeader className="flex flex-col gap-3 px-6 pb-4 pt-8 text-center">
					<p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-200">
						Bem-vindo de volta
					</p>
					<h1 className="text-4xl font-black text-white">Entrar</h1>
					<p className="text-sm leading-6 text-slate-300">
						Acesse sua conta para continuar de onde parou.
					</p>
				</CardHeader>
				<CardBody className="px-6 pb-8">
					<LoginForm />
					<p className="mt-5 text-center text-sm text-slate-300">
						Ainda não tem uma conta?{" "}
						<Link href="/auth/register" className="font-semibold text-sky-200 hover:text-white">
							Cadastre-se
						</Link>
					</p>
				</CardBody>
			</Card>
		</main>
	)
}
