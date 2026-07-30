export class Validator {
	static isEmail(email: string) {
		const re = /\S+@\S+\.\S+/
		return re.test(email)
	}
}
