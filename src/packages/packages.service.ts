import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Package, PackageDocument } from './schema/packages.schema'
import mongoose, { Model } from 'mongoose'
import { PackageDto } from './dto/package.dto'
import { UpdatePackageDto } from './dto/update-package.dto'
import { PACAKGE_STATUSES, PackageStatus } from './constants'
import { PackagesModule } from './packages.module'

@Injectable()
export class PackagesService {
	constructor(
		@InjectModel(Package.name) private PackageModel: Model<PackageDocument>
	) {}

	async create(data: PackageDto): Promise<PackagesModule> {
		const createdPackage = await this.PackageModel.create(data)
		return createdPackage
	}

	async findAll() {
		return this.PackageModel.find()
	}

	async findByID(id: string) {
		const isValidId = mongoose.isValidObjectId(id)

		if (!isValidId)
			throw new BadRequestException('Por favor ingresar un ID valido')

		const packageById = await this.PackageModel.findById(id)

		if (!packageById) throw new NotFoundException('Paquete no encontrado')

		return packageById
	}

	async findByStatus(status: PackageStatus) {
		if (!PACAKGE_STATUSES.includes(status))
			throw new BadRequestException('Por favor ingrear un estado válido')
		const packagesByStatus = this.PackageModel.find({ status })

		return packagesByStatus
	}
	async update(_id: string, data: UpdatePackageDto) {
		return await this.PackageModel.findOneAndUpdate({ _id }, data, {
			returnOriginal: false,
		})
	}
}
