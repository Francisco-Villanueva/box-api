import { HttpException, Injectable } from '@nestjs/common'
import { LoginAuthDto } from './dto/login-auth.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User, UsersDocument } from 'src/users/schema/users.schema'
import { Model } from 'mongoose'
import { compare, hash } from 'bcrypt'
import { RegisterAuthDto } from './dto/register-auth.dto'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UsersDocument>
	) {}

	async login(userObjectLogin: LoginAuthDto) {
		const { email, password } = userObjectLogin
		const findUser = await this.userModel.findOne({ email })

		if (!findUser) throw new HttpException('Usuario no encontrado.', 404)

		const checkPassword = await compare(password, findUser.password)

		if (!checkPassword) throw new HttpException('Contraseña Incorrecta', 403)

		const data = findUser //testing, acá va la logica del jwt
		return data
	}

	async register(userObjectRegister: RegisterAuthDto) {
		const { password } = userObjectRegister
		const hashPassword = await hash(password, 8)
		userObjectRegister = { ...userObjectRegister, password: hashPassword }
		return this.userModel.create(userObjectRegister)
	}
}
