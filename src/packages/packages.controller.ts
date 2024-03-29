import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Put,
	HttpCode,
	HttpStatus,
	BadRequestException,
	NotFoundException,
	Delete,
} from '@nestjs/common'
import { PackagesService } from './packages.service'
import { PackageDto } from './dto/package.dto'
import { UpdatePackageDto } from './dto/update-package.dto'
import { PACAKGE_STATUSES, PackageStatus } from './constants'
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'

@ApiTags('Packages')
@Controller('packages')
export class PackagesController {
	constructor(private packageService: PackagesService) {}

	@ApiOperation({ description: 'List all users' })
	@Get()
	@HttpCode(HttpStatus.OK)
	async findAll() {
		try {
			return this.packageService.findAll()
		} catch (error) {
			throw error
		}
	}

	@ApiOperation({ description: 'List a specific package based on their ID' })
	@ApiParam({ name: 'id', description: 'ID of the package', type: String })
	@Get(':id')
	@HttpCode(HttpStatus.OK)
	async findBy(@Param('id') id: string) {
		try {
			//TODO No llamar mongoose en los controllers, llamar a un servicio que llame a mongoose. Va a hacer falta un mock de mongoose para testear
			const isValidId = await this.packageService.validateObjectId(id)
			if (!isValidId)
				throw new BadRequestException('Por favor ingresar un ID valido')

			const packageById = await this.packageService.findByID(id)
			if (!packageById) throw new NotFoundException('Paquete no encontrado')

			return packageById
		} catch (error) {
			throw error
		}
	}

	@ApiOperation({ description: 'List all packages with a specific status' })
	@ApiParam({
		name: 'status',
		description: 'Status of the package',
		enum: PACAKGE_STATUSES,
	})
	@Get('/status/:status')
	@HttpCode(HttpStatus.OK)
	async findByStatus(@Param('status') status: PackageStatus) {
		try {
			if (!PACAKGE_STATUSES.includes(status))
				throw new BadRequestException('Por favor ingrear un estado válido')
			return await this.packageService.findByStatus(status)
		} catch (error) {
			throw error
		}
	}

	@ApiOperation({ description: 'Create a new package' })
	@ApiBody({ type: PackageDto })
	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() body: PackageDto) {
		const { address, clientName, deliverDate, weight } = body
		try {
			if (!address || !clientName || !deliverDate || !weight) {
				throw new BadRequestException('Missing required fields')
			}
			return this.packageService.create(body)
		} catch (error) {
			throw error
		}
	}

	@ApiOperation({ description: 'Update a specific package based on their ID' })
	@ApiBody({ type: UpdatePackageDto })
	@ApiParam({ name: 'id', description: 'ID of the package', type: String })
	@Put(':id')
	@HttpCode(HttpStatus.CREATED)
	async update(@Param('id') id: string, @Body() data: UpdatePackageDto) {
		try {
			// ObjectId validation:
			const isValidId = await this.packageService.validateObjectId(id)
			if (!isValidId) {
				throw new BadRequestException('Please enter a correct id')
			}

			const updatedPackage = this.packageService.update(id, data)

			if (!updatedPackage) {
				throw new NotFoundException('User not found')
			}

			return updatedPackage
		} catch (error) {
			throw error
		}
	}

	@ApiOperation({ description: 'Delete a specific package based on their ID' })
	@ApiParam({ name: 'id', description: 'ID of the package', type: String })
	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	async deleteById(@Param('id') id: string) {
		try {
			//TODO No llamar mongoose en los controllers, llamar a un servicio que llame a mongoose. Va a hacer falta un mock de mongoose para testear
			const isValidId = await this.packageService.validateObjectId(id)
			if (!isValidId)
				throw new BadRequestException('Por favor ingresar un ID valido')

			const packageById = await this.packageService.findByID(id)
			if (!packageById) throw new NotFoundException('Paquete no encontrado')

			return await this.packageService.delete(id)
		} catch (error) {
			throw error
		}
	}
}
