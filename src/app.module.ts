import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { PackagesModule } from './packages/packages.module'
import { AuthModule } from './auth/auth.module'
import { MailModule } from 'src/modules/mailer/mailer.module'

import * as dotenv from 'dotenv'
import { ValidateAdminMiddleware } from './middlewares/validateAdmin.middleware'
import { ValidateCarrierMiddleware } from './middlewares/validateCarrier.middleware'

dotenv.config()

@Module({
	imports: [
		MongooseModule.forRoot(process.env.MONGO_URI),
		UsersModule,
		PackagesModule,
		AuthModule,
		MailModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(ValidateAdminMiddleware)
			.forRoutes({ path: 'packages', method: RequestMethod.POST })
		consumer
			.apply(ValidateAdminMiddleware)
			.forRoutes({ path: 'packages/:id', method: RequestMethod.DELETE })
		consumer
			.apply(ValidateCarrierMiddleware)
			.forRoutes({ path: 'users/:userId/package', method: RequestMethod.POST })
	}
}
