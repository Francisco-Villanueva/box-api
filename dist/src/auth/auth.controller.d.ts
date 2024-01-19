/// <reference types="multer" />
import { AuthService } from './auth.service'
import { LoginAuthDto } from './dto/login-auth.dto'
import { UserDTO } from 'src/users/dto/user.dto'
import { ResetPasswordDto } from './dto/resetPass-auth.dto'
import { UpdatePasswordDto } from './dto/updatePass-auth.dto'
import { ValidateTokenDTO } from './dto/token.dto'
export declare class AuthController {
	private readonly authService
	constructor(authService: AuthService)
	sayHello(): string
	login({
		user,
		password,
	}: LoginAuthDto): Promise<import('./auth.interface').IAuthResponse>
	registerUser(
		userObjectRegister: UserDTO
	): Promise<import('../users/users.module').UsersModule>
	me(
		token: ValidateTokenDTO
	): Promise<string | import('jsonwebtoken').JwtPayload>
	resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void>
	updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<void>
	uploadImage(file: Express.Multer.File): Promise<{
		imageUrl: string
	}>
}
