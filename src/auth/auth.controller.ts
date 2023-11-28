import { Controller, Post, Body, Get } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginAuthDto } from './dto/login-auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() { userName, password }: LoginAuthDto) {
		const isUserValid = await this.authService.validateUser(userName, password)

		return isUserValid
	}
}
