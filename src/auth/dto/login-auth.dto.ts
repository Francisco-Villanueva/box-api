import { IsNotEmpty, IsString } from 'class-validator'
import { AuthBody } from '../../interfaces/auth.interface'
export class LoginAuthDto implements AuthBody {
	@IsNotEmpty()
	@IsString()
	user: string

	@IsNotEmpty()
	@IsString()
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
// 	@IsNotEmpty()
// 	@IsString()
// 	userName: string

// 	@IsNotEmpty()
// 	@IsString()
// 	password: string
// }
