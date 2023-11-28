import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UsersDocument } from './schema/users.schema'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private UserModule: Model<UsersDocument>
	) {}

	async create(createUserDto: CreateUserDto) {
		// TODO: DTO createUserDto ---> BODY, esto trae la data
		const userCreated = await this.UserModule.create(createUserDto)
		return userCreated
	}

	findAll() {
		return 'This action returns all users'
	}

	findOne(id: number) {
		return `This action returns a #${id} user`
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		console.log(updateUserDto)

		return `This action updates a #${id} user`
	}

	remove(id: number) {
		return `This action removes a #${id} user`
	}
}
