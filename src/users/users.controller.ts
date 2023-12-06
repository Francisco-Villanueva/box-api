import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserDTO } from './dto/user.dto'
import { PackagesService } from 'src/packages/packages.service'
import { AddPackageDto } from './dto/add-package.dto'

//Esto se crea con npx nest g controller <name>
@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly pacakgesServices: PackagesService
	) {}

	@Post()
	create(@Body() body: UserDTO) {
		return this.usersService.create(body)
	}

	@Get()
	findAll() {
		return this.usersService.findAll()
	}
	@Get('/carriers')
	findCarriers() {
		return this.usersService.findCarriers()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findById(id)
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto)
	}
	@Get('/:userId/packages')
	async getPackages(@Param('userId') id: string) {
		try {
			const carrier = await this.usersService.findById(id)

			return carrier.packages
		} catch (error) {
			throw error
		}
	}
	@Post('/add-package')
	async addPackage(@Body() { packageId, userId }: AddPackageDto) {
		const pack = await this.pacakgesServices.findByID(packageId)

		const updatedPackage = await this.pacakgesServices.update(
			pack._id.toString(),
			{
				address: pack.address,
				clientName: pack.clientName,
				deliverDate: pack.deliverDate,
				weight: pack.weight,
				status: 'PENDIENTE',
			}
		)
		console.log('updatedPackage--->', updatedPackage)

		return this.usersService.addPackageToUser(userId, pack._id.toString())
	}
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(+id)
	}
}
