import * as dotenv from 'dotenv'
dotenv.config()

export const checkEnvVariables = () => {
	const requiredEnvVariables: string[] = [
		'PORT',
		'SECRET_PASSWORD',
		'MONGO_URI',
		'HASH_SALT',
		'CLIENT_HOST',
		'EMAIL_ADMIN',
		'PASS_ADMIN',
		'AWS_ACCESS_KEY',
		'AWS_SECRET_ACCESS_KEY',
		'AWS_REGION',
		'AWS_BUCKET',
	]

	const missingVariables: string[] = []

	requiredEnvVariables.forEach((envVariable) => {
		if (!process.env[envVariable]) {
			missingVariables.push(envVariable)
		}
	})

	if (missingVariables.length > 0) {
		console.error(
			`These environment variables are required in the .env file: ${missingVariables.join(
				', '
			)}`
		)
		process.exit(1)
	}
}
