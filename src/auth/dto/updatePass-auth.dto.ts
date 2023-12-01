import { IsNotEmpty, IsString } from 'class-validator'

export class UpdatePasswordDto {
	@IsNotEmpty()
	@IsString()
	password: string

	@IsNotEmpty()
	@IsString()
	resetToken: string
}
