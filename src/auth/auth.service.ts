import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'

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
