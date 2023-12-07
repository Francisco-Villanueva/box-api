import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common'
import { PackagesService } from './packages.service'
import { PackageDto } from './dto/package.dto'
import { UpdatePackageDto } from './dto/update-package.dto'

@Controller('packages')
export class PackagesController {
	constructor(private packageService: PackagesService) {}

	@Get()
	findAll() {
		return this.packageService.findAll()
	}
	@Get(':id')
	findBy(@Param('id') id: string) {
		return this.packageService.findByID(id)
	}

	@Post()
	create(@Body() createPackageDto: PackageDto) {
		return this.packageService.create(createPackageDto)
	}
	@Put(':id')
	update(@Param('id') id: string, @Body() data: UpdatePackageDto) {
		return this.packageService.update(id, data)
	}
}
