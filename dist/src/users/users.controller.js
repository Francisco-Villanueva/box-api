'use strict'
var __decorate =
	(this && this.__decorate) ||
	function (decorators, target, key, desc) {
		var c = arguments.length,
			r =
				c < 3
					? target
					: desc === null
					? (desc = Object.getOwnPropertyDescriptor(target, key))
					: desc,
			d
		if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
			r = Reflect.decorate(decorators, target, key, desc)
		else
			for (var i = decorators.length - 1; i >= 0; i--)
				if ((d = decorators[i]))
					r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
		return c > 3 && r && Object.defineProperty(target, key, r), r
	}
var __metadata =
	(this && this.__metadata) ||
	function (k, v) {
		if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
			return Reflect.metadata(k, v)
	}
var __param =
	(this && this.__param) ||
	function (paramIndex, decorator) {
		return function (target, key) {
			decorator(target, key, paramIndex)
		}
	}
Object.defineProperty(exports, '__esModule', { value: true })
exports.UsersController = void 0
const openapi = require('@nestjs/swagger')
const common_1 = require('@nestjs/common')
const users_service_1 = require('./users.service')
const update_user_dto_1 = require('./dto/update-user.dto')
const user_dto_1 = require('./dto/user.dto')
const packages_service_1 = require('../packages/packages.service')
const add_package_dto_1 = require('./dto/add-package.dto')
const swagger_1 = require('@nestjs/swagger')
let UsersController = class UsersController {
	constructor(usersService, pacakgesServices) {
		this.usersService = usersService
		this.pacakgesServices = pacakgesServices
	}
	async create(body) {
		const { name, lastName, userName, email, password } = body
		try {
			if (!name || !lastName || !userName || !email || !password) {
				throw new common_1.BadRequestException('Missing required fields')
			}
			return this.usersService.create(body)
		} catch (error) {
			throw error
		}
	}
	async findAll() {
		try {
			return await this.usersService.findAll()
		} catch (error) {
			throw error
		}
	}
	async findCarriers() {
		try {
			return await this.usersService.findCarriers()
		} catch (error) {
			throw error
		}
	}
	async findOne(id) {
		try {
			const isValidId = await this.usersService.validateObjectId(id)
			if (!isValidId) {
				throw new common_1.BadRequestException('Please enter a correct id')
			}
			const user = await this.usersService.findById(id)
			if (!user) {
				throw new common_1.NotFoundException('User not found')
			}
			return user
		} catch (error) {
			throw error
		}
	}
	async update(id, updateUserDto) {
		try {
			const isValidId = await this.usersService.validateObjectId(id)
			if (!isValidId) {
				throw new common_1.BadRequestException('Please enter a correct id')
			}
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
				throw new common_1.BadRequestException(
					'Key for update not found on UserDto'
				)
			}
			const updatedUser = await this.usersService.update(id, updateUserDto)
			if (!updatedUser) {
				throw new common_1.NotFoundException('User not found')
			}
			return updatedUser
		} catch (error) {
			throw error
		}
	}
	async getPackages(id) {
		try {
			const isValidId = await this.usersService.validateObjectId(id)
			if (!isValidId) {
				throw new common_1.BadRequestException('Please enter a correct id')
			}
			const carrier = await this.usersService.findById(id)
			if (!carrier) {
				throw new common_1.NotFoundException('User not found')
			}
			return carrier.packages
		} catch (error) {
			throw error
		}
	}
	async addPackage(userId, { packageId }) {
		const isValidId = await this.usersService.validateObjectId(userId)
		if (!isValidId) {
			throw new common_1.BadRequestException('Please enter a correct id')
		}
		const pack = await this.pacakgesServices.findByID(packageId)
		if (!pack) {
			throw new common_1.NotFoundException('Package not found')
		}
		pack.status = 'PENDIENTE'
		pack.save()
		return this.usersService.addPackageToUser(userId, pack._id.toString())
	}
	async remove(id) {
		const isValidId = await this.usersService.validateObjectId(id)
		if (!isValidId) {
			throw new common_1.BadRequestException('Please enter a correct id')
		}
		return this.usersService.remove(id)
	}
	async removePackage(userId, packageId) {
		return this.usersService.removePackage(userId, packageId)
	}
}
exports.UsersController = UsersController
__decorate(
	[
		(0, swagger_1.ApiOperation)({ description: 'Create a new user' }),
		(0, swagger_1.ApiBody)({ type: user_dto_1.UserDTO }),
		(0, common_1.Post)(),
		(0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
		openapi.ApiResponse({
			status: common_1.HttpStatus.CREATED,
			type: require('./users.module').UsersModule,
		}),
		__param(0, (0, common_1.Body)()),
		__metadata('design:type', Function),
		__metadata('design:paramtypes', [user_dto_1.UserDTO]),
		__metadata('design:returntype', Promise),
	],
	UsersController.prototype,
	'create',
	null
)
__decorate(
	[
		(0, swagger_1.ApiOperation)({ description: 'List all users' }),
		(0, common_1.Get)(),
		(0, common_1.HttpCode)(common_1.HttpStatus.OK),
		openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: [Object] }),
		__metadata('design:type', Function),
		__metadata('design:paramtypes', []),
		__metadata('design:returntype', Promise),
	],
	UsersController.prototype,
	'findAll',
	null
)
__decorate(
	[
		(0, swagger_1.ApiOperation)({
			description: 'List all users with role Carrier',
		}),
		(0, common_1.Get)('/carriers'),
		(0, common_1.HttpCode)(common_1.HttpStatus.OK),
		openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: [Object] }),
		__metadata('design:type', Function),
		__metadata('design:paramtypes', []),
		__metadata('design:returntype', Promise),
	],
	UsersController.prototype,
	'findCarriers',
	null
)
__decorate(
	[
		(0, swagger_1.ApiOperation)({
			description: 'List a specific user based on their ID',
		}),
		(0, swagger_1.ApiParam)({
			name: 'id',
			description: 'ID of the user',
			type: String,
		}),
		(0, common_1.Get)(':id'),
		(0, common_1.HttpCode)(common_1.HttpStatus.OK),
		openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
		__param(0, (0, common_1.Param)('id')),
		__metadata('design:type', Function),
		__metadata('design:paramtypes', [String]),
		__metadata('design:returntype', Promise),
	],
	UsersController.prototype,
	'findOne',
	null
)
__decorate(
	[
		(0, swagger_1.ApiOperation)({
			description: 'Update a specific user based on their ID',
		}),
		(0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserDto }),
		(0, swagger_1.ApiParam)({
			name: 'id',
			description: 'ID of the user',
			type: String,
		}),
		(0, common_1.Put)(':id'),
		(0, common_1.HttpCode)(common_1.HttpStatus.OK),
		openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
		__param(0, (0, common_1.Param)('id')),
		__param(1, (0, common_1.Body)()),
		__metadata('design:type', Function),
		__metadata('design:paramtypes', [String, update_user_dto_1.UpdateUserDto]),
		__metadata('design:returntype', Promise),
	],
	UsersController.prototype,
	'update',
	null
)
__decorate(
	[
		(0, swagger_1.ApiOperation)({
			description: 'List a specific user associated packages, based on their ID',
		}),
		(0, swagger_1.ApiParam)({
			name: 'userId',
			description: 'ID of the user',
			type: String,
		}),
		(0, common_1.Get)('/:userId/packages'),
		(0, common_1.HttpCode)(common_1.HttpStatus.OK),
		openapi.ApiResponse({
			status: common_1.HttpStatus.OK,
			type: [require('../packages/schema/packages.schema').Package],
		}),
		__param(0, (0, common_1.Param)('userId')),
		__metadata('design:type', Function),
		__metadata('design:paramtypes', [String]),
		__metadata('design:returntype', Promise),
	],
	UsersController.prototype,
	'getPackages',
	null
)
__decorate(
	[
		(0, swagger_1.ApiOperation)({
			description: 'Add a package to a specific user, based on their ID',
		}),
		(0, swagger_1.ApiBody)({ type: add_package_dto_1.AddPackageDto }),
		(0, swagger_1.ApiParam)({
			name: 'userId',
			description: 'ID of the user',
			type: String,
		}),
		(0, common_1.Post)('/:userId/package'),
		(0, common_1.HttpCode)(common_1.HttpStatus.OK),
		openapi.ApiResponse({
			status: common_1.HttpStatus.OK,
			type: require('./schema/users.schema').User,
		}),
		__param(0, (0, common_1.Param)('userId')),
		__param(1, (0, common_1.Body)()),
		__metadata('design:type', Function),
		__metadata('design:paramtypes', [String, add_package_dto_1.AddPackageDto]),
		__metadata('design:returntype', Promise),
	],
	UsersController.prototype,
	'addPackage',
	null
)
__decorate(
	[
		(0, swagger_1.ApiOperation)({
			description: 'Delete a specific user based on their ID',
		}),
		(0, swagger_1.ApiParam)({
			name: 'id',
			description: 'ID of the user',
			type: String,
		}),
		(0, common_1.Delete)(':id'),
		(0, common_1.HttpCode)(common_1.HttpStatus.OK),
		openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
		__param(0, (0, common_1.Param)('id')),
		__metadata('design:type', Function),
		__metadata('design:paramtypes', [String]),
		__metadata('design:returntype', Promise),
	],
	UsersController.prototype,
	'remove',
	null
)
__decorate(
	[
		(0, swagger_1.ApiOperation)({
			description: 'Remove a specific package from a user, based on their ID',
		}),
		(0, swagger_1.ApiParam)({
			name: 'userId',
			description: 'ID of the user',
			type: String,
		}),
		(0, swagger_1.ApiParam)({
			name: 'packageId',
			description: 'ID of the package',
			type: String,
		}),
		(0, common_1.Patch)('/:userId/removepackage/:packageId'),
		openapi.ApiResponse({ status: 200 }),
		__param(0, (0, common_1.Param)('userId')),
		__param(1, (0, common_1.Param)('packageId')),
		__metadata('design:type', Function),
		__metadata('design:paramtypes', [String, String]),
		__metadata('design:returntype', Promise),
	],
	UsersController.prototype,
	'removePackage',
	null
)
exports.UsersController = UsersController = __decorate(
	[
		(0, swagger_1.ApiTags)('Users'),
		(0, common_1.Controller)('users'),
		__metadata('design:paramtypes', [
			users_service_1.UsersService,
			packages_service_1.PackagesService,
		]),
	],
	UsersController
)
//# sourceMappingURL=users.controller.js.map
