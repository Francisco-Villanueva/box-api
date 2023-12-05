import { Injectable } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UsersDocument } from './schema/users.schema'
import { UserDTO } from './dto/user.dto'
import { UsersModule } from './users.module'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name)
		private UserModule: Model<UsersDocument>
	) {}

	async create(body: UserDTO): Promise<UsersModule> {
		// Hasheo de la password para ingresalra a la db encriptada.
		const userCreated = await this.UserModule.create(body)
		return userCreated
	}

	findAll() {
		return this.UserModule.find()
	}

	public async findById(id: string) {
		return await this.UserModule.findById(id)
	}

	public async findByEmail(email: string) {
		return await this.UserModule.findOne({ email })
	}

	update(id: string, updateUserDto: UpdateUserDto) {
		return this.UserModule.findByIdAndUpdate(id, updateUserDto, { new: true })
	}

	public async updatePassword(id: string, password: string) {
		return await this.UserModule.findByIdAndUpdate(
			id,
			{ password },
			{ new: true }
		)
	}

	remove(id: number) {
		return `This action removes a #${id} user`
	}
	public async findBy({ key, value }: { key: keyof UserDTO; value: any }) {
		try {
			const user: UsersDocument = await this.UserModule.findOne().where({
				[key]: value,
			})

			return user
		} catch (error) {}
	}
}
