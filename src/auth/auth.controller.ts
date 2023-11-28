import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginAuthDto } from './dto/login-auth.dto'
import { RegisterAuthDto } from './dto/register-auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	loginUser(@Body() userObjectLogin: LoginAuthDto) {
		return this.authService.login(userObjectLogin)
	}

	@Post('register')
	registerUser(@Body() userObjectRegister: RegisterAuthDto) {
		return this.authService.register(userObjectRegister)
	}
}
