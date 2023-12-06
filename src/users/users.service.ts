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
		const userCreated = await this.UserModule.create(body)
		return userCreated
	}

	async findAll() {
		return await this.UserModule.find().populate('packages')
	}
	async findCarriers() {
		return await this.UserModule.find({ role: 'CARRIER' }).populate('packages')
	}

	public async findById(id: string): Promise<UsersDocument> {
		return await this.UserModule.findById(id).populate('packages')
	}

	public async findByEmail(email: string) {
		return await this.UserModule.findOne({ email })
	}

	async update(_id: string, data: UpdateUserDto) {
		return await this.UserModule.findOneAndUpdate({ _id }, data)
	}

	public async updatePassword(id: string, password: string) {
		return await this.UserModule.findByIdAndUpdate(
			id,
			{ password },
			{ new: true }
		)
	}
	async addPackageToUser(userId: string, packageId: string): Promise<User> {
		return this.UserModule.findByIdAndUpdate(
			userId,
			{ $push: { packages: packageId } },
			{ new: true }
		).exec()
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
