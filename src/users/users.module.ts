import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schema/users.schema'
import { PackagesService } from 'src/packages/packages.service'
import { Package, PackageSchema } from 'src/packages/schema/packages.schema'

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema,
			},
			{
				name: Package.name,
				schema: PackageSchema,
			},
		]),
	],
	controllers: [UsersController],
	providers: [UsersService, PackagesService],
})
export class UsersModule {}
