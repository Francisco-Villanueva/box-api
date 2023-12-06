import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

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
}
