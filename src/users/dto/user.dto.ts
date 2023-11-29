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

	// ESTO NO VIENE EN EL BODY, SE SETEA POR DEFAULT CUANDO SE CREA EL USER (default: carrier)
	// @IsNotEmpty()
	// @IsEnum(ROLES)
	// role: ROLES

	// ESTO NO VIENE EN EL BODY, SE SETEA POR DEFAULT CUANDO SE CREA EL USER (default: HABILITADO)
	// @IsNotEmpty()
	// @IsEnum(CARRIER_STATUS)
	// status: CARRIER_STATUS
}
