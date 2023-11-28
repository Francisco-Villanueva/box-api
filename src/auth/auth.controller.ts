import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginAuthDto } from './dto/login-auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	loginUser(@Body() userObjectLogin: LoginAuthDto) {
		return this.authService.login(userObjectLogin)
	}
}
