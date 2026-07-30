import { hash, verify, type Options } from "@node-rs/argon2"

const passwordHashOptions: Options = {
	// 2 is Argon2id. The package exposes it as a const enum, which cannot be used with isolatedModules.
	algorithm: 2,
	memoryCost: 19456,
	timeCost: 2,
	parallelism: 1,
	outputLen: 32,
}

export class PasswordService {
	static async hash(password: string) {
		return hash(password, passwordHashOptions)
	}

	static async verify(passwordHash: string, password: string) {
		return verify(passwordHash, password)
	}
}
