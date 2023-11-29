import { UsersService } from 'src/users/users.service'
import { Injectable } from '@nestjs/common'
import { UsersDocument } from 'src/users/schema/users.schema'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { AuthResponse, PayloadToken } from 'src/interfaces/auth.interface'

@Injectable()
export class AuthService {
	constructor(private readonly userService: UsersService) {}

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
		expires,
	}: {
		payload: jwt.JwtPayload
		secret: string
		expires: number | string
	}): string {
		return jwt.sign(payload, secret, { expiresIn: expires })
	}

	public async generateJWT(user: UsersDocument): Promise<AuthResponse> {
		const getUser = await this.userService.findById(user._id.toString())

		const payload: PayloadToken = {
			sub: getUser._id.toString(),
		}

		//TODO: En este return hay que excluir la password dentro de user.
		return {
			accessToken: this.signJWT({
				payload,
				secret: process.env.SECRET_PASSWORD,
				expires: '1h',
			}),
			user,
		}
	}
}
