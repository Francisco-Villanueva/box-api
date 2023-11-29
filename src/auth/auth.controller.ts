import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginAuthDto } from './dto/login-auth.dto'
import { UserDTO } from 'src/users/dto/user.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() { userName, password }: LoginAuthDto) {
		const userValidate = await this.authService.validateUser(userName, password)

		if (!userValidate) {
			throw new UnauthorizedException('Data not valid')
		}

		const jwt = await this.authService.generateJWT(userValidate)

		return jwt
	}

	@Post('register')
	registerUser(@Body() userObjectRegister: UserDTO) {
		return this.authService.register(userObjectRegister)
	}
}
