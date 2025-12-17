export function isEmail(email: string) {
	const re = /\S+@\S+\.\S+/
	return re.test(email)
}
