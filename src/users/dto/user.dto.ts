import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Package } from 'src/packages/schema/packages.schema'

export class UserDTO {
	@IsNotEmpty()
	@IsString()
	name: string

	@IsNotEmpty()
	@IsString()
	lastName: string

	@IsNotEmpty()
	@IsString()
	email: string

	@IsNotEmpty()
	@IsString()
	userName: string

	@IsOptional()
	@IsString()
	image: string

	@IsNotEmpty()
	@IsString()
	password: string

	@IsOptional()
	@IsString()
	role?: string

	@IsOptional()
	@IsString()
	status?: string

	@IsOptional()
	@IsArray()
	packages?: Package[]
}
