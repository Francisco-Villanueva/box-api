import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/users/schema/users.schema'
import { UsersService } from 'src/users/users.service'
import { MailService } from 'modules/mailer/mailer.service'

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema,
			},
		]),
	],
	controllers: [AuthController],
	providers: [AuthService, UsersService, MailService],
})
export class AuthModule {}
