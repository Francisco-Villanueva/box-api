import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { CARRIER_STATUS } from 'src/constants/carrierStatus'
import { ROLES } from 'src/constants/roles'

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

	@IsNotEmpty()
	@IsEnum(ROLES)
	role: ROLES

	@IsNotEmpty()
	@IsEnum(CARRIER_STATUS)
	status: CARRIER_STATUS
}
