import { IsEmail, MinLength, IsString } from 'class-validator'

export class LoginAuthDto {
	@IsString()
	usuario: string

	@IsEmail()
	email: string

	@MinLength(4)
	password: string
}

//Posibles validaciones
//     @IsString()
//     @Length(4, 20, { message: 'El usuario debe tener entre 4 y 20 caracteres' })
//     @Matches(/^[a-zA-Z0-9_-]+$/, { message: 'El usuario solo puede contener letras, números, guiones bajos y guiones' })
//     usuario: string;

//     @IsEmail()
//     email: string;

//     @MinLength(4, { message: 'La contraseña debe tener al menos 4 caracteres' })
//     password: string;
