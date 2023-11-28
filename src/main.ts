import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { checkEnvVariables } from 'config/envCheck'
import * as morgan from 'morgan'
import { CORS } from './constants'

async function bootstrap() {
	await checkEnvVariables()

	const app = await NestFactory.create(AppModule)

	app.enableCors(CORS)
	app.use(morgan('tiny'))
	app.setGlobalPrefix('api')

	await app.listen(process.env.PORT, () => {
		console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`)
	})
}
bootstrap()
