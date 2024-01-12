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
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'

//Esto se crea con npx nest g controller <name>
@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly pacakgesServices: PackagesService
	) {}

	@ApiOperation({ description: 'Create a new user' })
	@ApiBody({ type: UserDTO })
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

	@ApiOperation({ description: 'List all users' })
	@Get()
	@HttpCode(HttpStatus.OK)
	async findAll() {
		try {
			return await this.usersService.findAll()
		} catch (error) {
			throw error
		}
	}

	@ApiOperation({ description: 'List all users with role Carrier' })
	@Get('/carriers')
	@HttpCode(HttpStatus.OK)
	async findCarriers() {
		try {
			return await this.usersService.findCarriers()
		} catch (error) {
			throw error
		}
	}

	@ApiOperation({ description: 'List a specific user based on their ID' })
	@ApiParam({ name: 'id', description: 'ID of the user', type: String })
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

	@ApiOperation({ description: 'Update a specific user based on their ID' })
	@ApiBody({ type: UpdateUserDto })
	@ApiParam({ name: 'id', description: 'ID of the user', type: String })
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
			const {
				name,
				lastName,
				userName,
				email,
				password,
				role,
				status,
				packages,
				rejectedDeclarationTime,
			} = updateUserDto

			if (
				!(
					name ||
					lastName ||
					userName ||
					email ||
					password ||
					role ||
					status ||
					packages ||
					rejectedDeclarationTime
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

	@ApiOperation({
		description: 'List a specific user associated packages, based on their ID',
	})
	@ApiParam({ name: 'userId', description: 'ID of the user', type: String })
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

	@ApiOperation({
		description: 'Add a package to a specific user, based on their ID',
	})
	@ApiBody({ type: AddPackageDto })
	@ApiParam({ name: 'userId', description: 'ID of the user', type: String })
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

	@ApiOperation({ description: 'Delete a specific user based on their ID' })
	@ApiParam({ name: 'id', description: 'ID of the user', type: String })
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

	@ApiOperation({
		description: 'Remove a specific package from a user, based on their ID',
	})
	@ApiParam({ name: 'userId', description: 'ID of the user', type: String })
	@ApiParam({
		name: 'packageId',
		description: 'ID of the package',
		type: String,
	})
	@Patch('/:userId/removepackage/:packageId')
	async removePackage(
		@Param('userId') userId: string,
		@Param('packageId') packageId: string
	) {
		return this.usersService.removePackage(userId, packageId)
	}
}
