import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
	NotFoundException,
	BadRequestException,
	HttpCode,
	HttpStatus,
	Patch,
} from '@nestjs/common'
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
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() body: UserDTO) {
		const { name, lastName, userName, email, password } = body
		try {
			if (!name || !lastName || !userName || !email || !password) {
				throw new BadRequestException('Missing required fields')
			}

			return this.usersService.create(body)
		} catch (error) {
			throw error
		}
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	async findAll() {
		try {
			return await this.usersService.findAll()
		} catch (error) {
			throw error
		}
	}

	@Get('/carriers')
	@HttpCode(HttpStatus.OK)
	async findCarriers() {
		try {
			return await this.usersService.findCarriers()
		} catch (error) {
			throw error
		}
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	async findOne(@Param('id') id: string) {
		try {
			// ObjectId validation:
			const isValidId = await this.usersService.validateObjectId(id)

			if (!isValidId) {
				throw new BadRequestException('Please enter a correct id')
			}

			// user validation:
			const user = await this.usersService.findById(id)

			if (!user) {
				throw new NotFoundException('User not found')
			}

			return user
		} catch (error) {
			throw error
		}
	}

	@Put(':id')
	@HttpCode(HttpStatus.OK)
	async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		try {
			// ObjectId validation:
			const isValidId = await this.usersService.validateObjectId(id)

			if (!isValidId) {
				throw new BadRequestException('Please enter a correct id')
			}

			// Dto validation:
			const { name, lastName, userName, email, password, role, status, packages } =
				updateUserDto

			if (
				!(
					name ||
					lastName ||
					userName ||
					email ||
					password ||
					role ||
					status ||
					packages
				)
			) {
				throw new BadRequestException('Key for update not found on UserDto')
			}

			// Validated user & dto update:
			const updatedUser = await this.usersService.update(id, updateUserDto)

			if (!updatedUser) {
				throw new NotFoundException('User not found')
			}

			return updatedUser
		} catch (error) {
			throw error
		}
	}

	@Get('/:userId/packages')
	@HttpCode(HttpStatus.OK)
	async getPackages(@Param('userId') id: string) {
		try {
			// ObjectId validation:
			const isValidId = await this.usersService.validateObjectId(id)

			if (!isValidId) {
				throw new BadRequestException('Please enter a correct id')
			}

			const carrier = await this.usersService.findById(id)

			if (!carrier) {
				throw new NotFoundException('User not found')
			}

			return carrier.packages
		} catch (error) {
			throw error
		}
	}

	@Post('/:userId/package')
	@HttpCode(HttpStatus.OK)
	async addPackage(
		@Param('userId') userId: string,
		@Body() { packageId }: AddPackageDto
	) {
		// ObjectId validation:
		const isValidId = await this.usersService.validateObjectId(userId)

		if (!isValidId) {
			throw new BadRequestException('Please enter a correct id')
		}

		const pack = await this.pacakgesServices.findByID(packageId)
		if (!pack) {
			throw new NotFoundException('Package not found')
		}
		pack.status = 'PENDIENTE'
		pack.save()
		return this.usersService.addPackageToUser(userId, pack._id.toString())
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	async remove(@Param('id') id: string) {
		// ObjectId validation:
		const isValidId = await this.usersService.validateObjectId(id)

		if (!isValidId) {
			throw new BadRequestException('Please enter a correct id')
		}

		return this.usersService.remove(id)
	}

	@Patch('/:userId/removepackage/:packageId')
	async removePackage(
		@Param('userId') userId: string,
		@Param('packageId') packageId: string
	) {
		return this.usersService.removePackage(userId, packageId)
	}
}
