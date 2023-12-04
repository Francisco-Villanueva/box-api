import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { MailService } from './mailer.service'
import * as dotenv from 'dotenv'
dotenv.config()

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				host: 'smtp.gmail.com',
				port: 465,
				secure: true,
				auth: {
					user: process.env.EMAIL_ADMIN,
					pass: process.env.PASS_ADMIN,
				},
			},
		}),
	],
	providers: [MailService],
})
export class MailModule {}
