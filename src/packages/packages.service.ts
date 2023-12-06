import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Package, PackageDocument } from './schema/packages.schema'
import { Model } from 'mongoose'
import { PackageDto } from './dto/package.dto'

@Injectable()
export class PackagesService {
	constructor(
		@InjectModel(Package.name) private PackageModel: Model<PackageDocument>
	) {}

	async create(data: PackageDto) {
		const createdPackage = await this.PackageModel.create(data)
		return createdPackage
	}

	async findAll() {
		return this.PackageModel.find()
	}
	async findByID(id: string) {
		return this.PackageModel.findById(id)
	}

	async update(_id: string, data: PackageDto) {
		return await this.PackageModel.findOneAndUpdate({ _id }, data, {
			returnOriginal: false,
		})
	}
}
