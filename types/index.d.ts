//NodeJS.ProcessEnv

declare namespace NodeJS {
	interface ProcessEnv {
		PORT: number
		MONGO_URI: string
		CLIENT_HOST: number
		SECRET_PASSWORD: string
		HASH_SALT: number
		EMAIL_ADMIN: string
		PASS_ADMIN: number
	}
}
