import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { PackagesModule } from './packages/packages.module'
import { AuthModule } from './auth/auth.module'
import { MailModule } from 'modules/mailer/mailer.module'

import * as dotenv from 'dotenv'

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
export class AppModule {}
