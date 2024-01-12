import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Package, PackageDocument } from './schema/packages.schema'
import mongoose, { Model } from 'mongoose'
import { PackageDto } from './dto/package.dto'
import { UpdatePackageDto } from './dto/update-package.dto'
import { PackageStatus } from './constants'
import { PackagesModule } from './packages.module'

@Injectable()
export class PackagesService {
	constructor(
		@InjectModel(Package.name) private PackageModel: Model<PackageDocument>
	) {}

	async create(data: PackageDto): Promise<PackagesModule> {
		return await this.PackageModel.create(data)
	}

	async findAll() {
		return this.PackageModel.find()
	}

	async findByID(id: string) {
		return await this.PackageModel.findById(id)
	}

	async findByStatus(status: PackageStatus) {
		return await this.PackageModel.find({ status })
	}
	async update(_id: string, data: UpdatePackageDto) {
		return await this.PackageModel.findOneAndUpdate({ _id }, data, {
			returnOriginal: false,
		})
	}
	// ObjectId validation:
	async validateObjectId(id: string): Promise<boolean> {
		const isValidId = mongoose.isValidObjectId(id)
		return isValidId
	}
}
