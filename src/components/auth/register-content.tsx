"use client"

import { Card, CardBody, CardHeader } from "@nextui-org/react"
import Link from "next/link"
import { RegisterForm } from "./register-form"

export function RegisterContent() {
	return (
		<main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6 py-12">
			<div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-secondary/25 blur-3xl" />
			<Card className="w-full max-w-md border border-white/15 bg-white/10 shadow-2xl shadow-fuchsia-950/30 backdrop-blur-xl">
				<CardHeader className="flex flex-col gap-3 px-6 pb-4 pt-8 text-center">
					<p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-200">
						Comece agora
					</p>
					<h1 className="text-4xl font-black text-white">Criar conta</h1>
					<p className="text-sm leading-6 text-slate-300">
						Preencha seus dados para liberar sua área privada.
					</p>
				</CardHeader>
				<CardBody className="px-6 pb-8">
					<RegisterForm />
					<p className="mt-5 text-center text-sm text-slate-300">
						Já tem uma conta?{" "}
						<Link href="/auth/login" className="font-semibold text-fuchsia-200 hover:text-white">
							Entrar
						</Link>
					</p>
				</CardBody>
			</Card>
		</main>
	)
}
