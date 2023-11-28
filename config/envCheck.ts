import * as dotenv from 'dotenv'
dotenv.config()

export const checkEnvVariables = () => {
	const requiredEnvVariables: string[] = [
		'PORT',
		'SECRET_PASSWORD',
		'MONGO_URI',

		'CLIENT_HOST',
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
