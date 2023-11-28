import { UsersService } from 'src/users/users.service'
import { HttpException, Injectable } from '@nestjs/common'
import { LoginAuthDto } from './dto/login-auth.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User, UsersDocument } from 'src/users/schema/users.schema'
import { Model } from 'mongoose'
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
	constructor(private readonly userService: UsersService) {}

	async login(userObjectLogin: LoginAuthDto) {
		// const { email, password } = userObjectLogin
		// const findUser = await this.userModel.findOne({ email })
		// if (!findUser) throw new HttpException('Usuario no encontrado.', 404)
		// const checkPassword = await compare(password, findUser.password)
		// if (!checkPassword) throw new HttpException('Contraseña Incorrecta', 403)
		// const data = findUser //testing, acá va la logica del jwt
		// return data
	}

	public async validateUser(userName: string, password: string) {
		const userByUsername = await this.userService.findBy({
			key: 'userName',
			value: userName,
		})
		const userByEmial = await this.userService.findBy({
			key: 'email',
			value: userName,
		})

		console.log({ userByEmial, userByUsername })

		// if (userByUsername) {
		// 	const match = await bcrypt.compare(password, userByUsername)
		// 	if (match) return userByUsername
		// }

		// if (userByEmial) {
		// 	const match = await bcrypt.compare(password, userByEmial.password)
		// 	if (match) return userByEmial
		// }
	}
}
