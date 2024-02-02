import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { checkEnvVariables } from 'config/envCheck'
import * as morgan from 'morgan'
import { CORS } from './constants'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
	await checkEnvVariables()

	const app = await NestFactory.create(AppModule)

	app.enableCors(CORS)
	app.use(morgan('tiny'))
	app.setGlobalPrefix('api')

	const config = new DocumentBuilder()
		.setTitle('Co-Workers Box')
		.setDescription('The Co-Workers Box API - Endpoints & Description')
		.setVersion('1.0')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('docs', app, document)

	await app.listen(process.env.PORT, () => {
		console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
	})
}
bootstrap()
