import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Put,
	HttpCode,
	HttpStatus,
} from '@nestjs/common'
import { PackagesService } from './packages.service'
import { PackageDto } from './dto/package.dto'
import { UpdatePackageDto } from './dto/update-package.dto'
import { PackageStatus } from './constants'

@Controller('packages')
export class PackagesController {
	constructor(private packageService: PackagesService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	findAll() {
		return this.packageService.findAll()
	}
	@Get(':id')
	@HttpCode(HttpStatus.OK)
	findBy(@Param('id') id: string) {
		return this.packageService.findByID(id)
	}
	@Get('/status/:status')
	@HttpCode(HttpStatus.OK)
	findByStatus(@Param('status') status: PackageStatus) {
		return this.packageService.findByStatus(status)
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	create(@Body() createPackageDto: PackageDto) {
		return this.packageService.create(createPackageDto)
	}
	@Put(':id')
	@HttpCode(HttpStatus.CREATED)
	update(@Param('id') id: string, @Body() data: UpdatePackageDto) {
		return this.packageService.update(id, data)
	}
}
