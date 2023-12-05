import { UsersService } from 'src/users/users.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersDocument } from 'src/users/schema/users.schema'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { AuthResponse, PayloadToken } from 'src/interfaces/auth.interface'
import { UserDTO } from 'src/users/dto/user.dto'
import { ResetPasswordDto } from './dto/resetPass-auth.dto'
import { MailService } from '../modules/mailer/mailer.service'
import { UpdatePasswordDto } from './dto/updatePass-auth.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly mailerService: MailService
	) {}

	public async validateUser(userName: string, password: string) {
		const userByUsername = await this.userService.findBy({
			key: 'userName',
			value: userName,
		})
		const userByEmial = await this.userService.findBy({
			key: 'email',
			value: userName,
		})

		if (userByUsername) {
			const match = await bcrypt.compare(password, userByUsername.password)
			if (match) return userByUsername
		}

		if (userByEmial) {
			const match = await bcrypt.compare(password, userByEmial.password)
			if (match) return userByEmial
		}

		return null
	}

	public signJWT({
		payload,
		secret,
	}: {
		payload: jwt.JwtPayload
		secret: string
	}): string {
		return jwt.sign(payload, secret, { noTimestamp: true })
	}

	public async generateJWT(user: UsersDocument): Promise<AuthResponse> {
		const getUser = await this.userService.findById(user._id.toString())

		const payload: PayloadToken = {
			_id: getUser._id.toString(),
			name: getUser.name,
			email: getUser.email,
			lastName: getUser.lastName,
			role: getUser.role,
			status: getUser.status,
			image: getUser.image,
			userName: getUser.userName,
		}

		return {
			accessToken: this.signJWT({
				payload,
				secret: process.env.SECRET_PASSWORD,
			}),
			user,
		}
	}

	public async me(token: string) {
		const payload = jwt.verify(token, process.env.SECRET_PASSWORD)

		if (!payload) {
			throw new UnauthorizedException('Token invalido')
		}

		return payload
	}
	async register(userObjectRegister: UserDTO) {
		const { password } = userObjectRegister
		const hashPassword = await bcrypt.hash(password, +process.env.HASH_SALT)
		userObjectRegister = { ...userObjectRegister, password: hashPassword }
		return this.userService.create(userObjectRegister)
	}

	async resetPassword(resetPasswordDto: ResetPasswordDto) {
		const { email } = resetPasswordDto
		const user = await this.userService.findByEmail(email)

		if (!user) {
			throw new UnauthorizedException('Email no encontrado')
		}

		const resetToken = await this.generateJWT(user)
		await this.mailerService.sendEmail(user.email, resetToken)
	}

	async updatePassword(updatePasswordDto: UpdatePasswordDto) {
		const { password, resetToken } = updatePasswordDto

		// Verifica y valida el token:
		const payload = jwt.verify(
			resetToken,
			process.env.SECRET_PASSWORD
		) as jwt.JwtPayload

		if (!payload) {
			throw new UnauthorizedException('Token invalido')
		}

		// Busca el usuario a partir del token verificado:
		const userId = payload._id.toString()
		const user = await this.userService.findById(userId)

		if (!user) {
			throw new UnauthorizedException('Usuario no encontrado')
		}

		// Encriptar la nueva contraseña:
		const hashPassword = await bcrypt.hash(password, +process.env.HASH_SALT)

		// Actualizar usuario con nueva contraseña:
		await this.userService.updatePassword(userId, hashPassword)
	}
}
