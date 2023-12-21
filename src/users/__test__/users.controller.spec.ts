import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from '../users.service'
import { UsersController } from '../users.controller'
import { PackagesService } from 'src/packages/packages.service'
import { PackagesController } from 'src/packages/packages.controller'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { UserDTO } from '../dto/user.dto'

describe('Users Controller', () => {
	let usersService: UsersService
	let usersController: UsersController
	// let packagesServices: PackagesService
	// let model: Model<User>

	const mockUsers = [
		{
			_id: '656726cb084a9990fd8b31ca',
			name: 'Francisco',
			lastName: 'Villanueva',
			userName: 'panchov',
			email: 'pancho@gmail.com',
			password: '$2b$10$qdetHfSUYA4VqqBu36jchuAXwH3m/4mIinzynGkZfsKtJeXdw5.56',
			role: 'CARRIER',
			status: 'HABILITADO',
			__v: 0,
			packages: [],
		},
		{
			packages: [],
			_id: '656747d7ac012b7820e24f97',
			name: 'Admin',
			lastName: 'Admin',
			userName: 'Admin',
			email: 'admin@gmail.com',
			password: '$2b$10$Xxep7k5wr.AyTaACdrldgOgq4sLeTVtfzYVUdqtlhRHtB2pboYjH2',
			role: 'ADMIN',
			status: 'HABILITADO',
			__v: 0,
			image: 'https://boxappbucket.s3.sa-east-1.amazonaws.com/images/admin.jpg',
		},
		{
			packages: [],
			_id: '656f687fca92ea1424504f35',
			name: 'Braian',
			lastName: 'Barrientos',
			userName: 'Braianbts',
			email: 'braianbts@gmail.com',
			image: '',
			password: '$2b$10$AzMQ5FOAyHcFcF45JLuPaeJMiUoahrkWkSTEl1vJn/u1VIgQkbcre',
			role: 'CARRIER',
			status: 'HABILITADO',
			__v: 0,
		},
	]

	const mockUsersService = {
		findAll: jest.fn().mockResolvedValueOnce(mockUsers),
		findById: jest.fn().mockResolvedValueOnce(mockUsers[0]),
		validateObjectId: jest.fn().mockResolvedValue(true),
		create: jest.fn(),
		update: jest.fn(),
		findCarriers: jest
			.fn()
			.mockResolvedValue(mockUsers.filter((user) => user.role === 'CARRIER')),
		remove: jest.fn(),
	}
	const mockPackagesService = {}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController, PackagesController],
			providers: [
				PackagesService,
				{
					provide: UsersService,
					useValue: mockUsersService,
				},
				{
					provide: PackagesService,
					useValue: mockPackagesService,
				},
			],
		}).compile()

		usersService = module.get<UsersService>(UsersService)
		usersController = module.get<UsersController>(UsersController)
		// packagesServices = module.get<PackagesService>(PackagesService)
		// model = module.get<Model<User>>(getModelToken(User.name))
	})

	it('Should be defined', () => {
		expect(usersController).toBeDefined()
	})

	describe('findAll', () => {
		it('Should get all users', async () => {
			const result = await usersController.findAll()

			expect(usersService.findAll).toHaveBeenCalled()
			expect(result).toEqual(mockUsers)
		})
	})

	describe('findOne', () => {
		it('Should get a user by ID', async () => {
			const userId = '656726cb084a9990fd8b31ca'
			const result = await usersController.findOne(userId)

			expect(usersService.validateObjectId).toHaveBeenCalledWith(userId)
			expect(usersService.findById).toHaveBeenCalledWith(userId)
			expect(result).toEqual(mockUsers[0])
		})

		it('Should handle invalid ObjectId', async () => {
			const userId = 'invalidObjectId'
			mockUsersService.validateObjectId.mockResolvedValueOnce(false)

			await expect(usersController.findOne(userId)).rejects.toThrow(
				BadRequestException
			)

			expect(usersService.validateObjectId).toHaveBeenCalledWith(userId)
		})

		it('Should handle user not found', async () => {
			const userId = '656726cb084a9990fd8b00ca'
			mockUsersService.findById.mockResolvedValueOnce(null)

			await expect(usersController.findOne(userId)).rejects.toThrow(
				NotFoundException
			)

			expect(usersService.validateObjectId).toHaveBeenCalledWith(userId)
			expect(usersService.findById).toHaveBeenCalledWith(userId)
		})
	})

	describe('create', () => {
		it('Should create and return a user', async () => {
			const mockNewUser: UserDTO = {
				name: 'John',
				lastName: 'Doe',
				userName: 'johndoe',
				email: 'john.doe@example.com',
				password: 'securepassword',
				image: 'image',
			}

			const mockCreatedUser = {
				__v: 0,
				_id: '657c6eb63a3c5eed02880c66',
				email: 'john.doe@example.com',
				image: 'image',
				lastName: 'Doe',
				name: 'John',
				packages: [],
				password: 'securepassword',
				role: 'CARRIER',
				status: 'HABILITADO',
				userName: 'johndoe',
			}

			jest.spyOn(mockUsersService, 'create').mockResolvedValueOnce(mockCreatedUser)

			const result = await usersController.create(mockNewUser)

			expect(usersService.create).toHaveBeenCalled()
			expect(result).toEqual(mockCreatedUser)
			expect(result).toBeDefined()
		})

		it('Should throw BadRequestException for missing required fields', async () => {
			const mockNewUser: UserDTO = {
				name: 'John',
				lastName: '',
				userName: '',
				email: 'john.doe@example.com',
				password: 'securepassword',
				image: 'image',
			}

			await expect(usersController.create(mockNewUser)).rejects.toThrow(
				BadRequestException
			)
		})
	})

	describe('update', () => {
		it('Should update a user', async () => {
			const userId = '656f687fca92ea1424504f35'

			const updateUserDto = {
				name: 'Brai',
			}

			const updatedUserMock = {
				packages: [],
				_id: '656f687fca92ea1424504f35',
				name: 'Brai',
				lastName: 'Barrientos',
				userName: 'Braianbts',
				email: 'braianbts@gmail.com',
				image: '',
				password: '$2b$10$AzMQ5FOAyHcFcF45JLuPaeJMiUoahrkWkSTEl1vJn/u1VIgQkbcre',
				role: 'CARRIER',
				status: 'HABILITADO',
				__v: 0,
			}

			jest.spyOn(mockUsersService, 'update').mockResolvedValueOnce(updatedUserMock)

			const result = await usersController.update(userId, updateUserDto)

			expect(mockUsersService.validateObjectId).toHaveBeenCalledWith(userId)
			expect(mockUsersService.update).toHaveBeenCalledWith(userId, updateUserDto)
			expect(result).toEqual(updatedUserMock)
		})

		it('Should throw BadRequestException for invalid ObjectId', async () => {
			const userId = 'invalidObjectId'
			const updateUserDto = {
				name: 'Brai',
			}
			mockUsersService.validateObjectId.mockResolvedValueOnce(false)

			await expect(usersController.update(userId, updateUserDto)).rejects.toThrow(
				BadRequestException
			)

			expect(usersService.validateObjectId).toHaveBeenCalledWith(userId)
			expect(mockUsersService.validateObjectId).toHaveBeenCalledWith(userId)
		})

		it('Should throw NotFoundException if user not found', async () => {
			const userId = '656f687fca92ea1424504f00'
			const updateUserDto = {
				name: 'Brai',
			}
			jest.spyOn(mockUsersService, 'update').mockResolvedValueOnce(null)

			await expect(usersController.update(userId, updateUserDto)).rejects.toThrow(
				NotFoundException
			)

			expect(mockUsersService.validateObjectId).toHaveBeenCalledWith(userId)
			expect(mockUsersService.update).toHaveBeenCalledWith(userId, updateUserDto)
		})

		it('Should throw BadRequestException for missing update keys in UpdateUserDto', async () => {
			const userId = '656f687fca92ea1424504f35'

			const updateUserDto = {}

			await expect(usersController.update(userId, updateUserDto)).rejects.toThrow(
				BadRequestException
			)
			expect(mockUsersService.validateObjectId).toHaveBeenCalledWith(userId)
		})
	})

	describe('findCarriers', () => {
		it('Should get all users with role: carrier', async () => {
			const result = await usersController.findCarriers()
			const expectedCarriers = mockUsers.filter((user) => user.role === 'CARRIER')

			expect(usersService.findCarriers).toHaveBeenCalled()
			expect(result).toEqual(expectedCarriers)
		})
	})

	describe('remove', () => {
		it('Should delete a user by ID ', async () => {
			const userId = '656726cb084a9990fd8b31ca'
			const deletedUser = {
				_id: '656726cb084a9990fd8b31ca',
				name: 'Francisco',
				lastName: 'Villanueva',
				userName: 'panchov',
				email: 'pancho@gmail.com',
				password: '$2b$10$qdetHfSUYA4VqqBu36jchuAXwH3m/4mIinzynGkZfsKtJeXdw5.56',
				role: 'CARRIER',
				status: 'HABILITADO',
				__v: 0,
				packages: [],
			}

			jest.spyOn(mockUsersService, 'remove').mockResolvedValueOnce(deletedUser)

			const result = await usersController.remove(userId)
			expect(mockUsersService.remove).toHaveBeenCalledWith(userId)
			expect(result).toEqual(deletedUser)
		})

		it('Should throw BadRequestException for invalid ObjectId', async () => {
			const userId = 'invalidObjectId'

			mockUsersService.validateObjectId.mockResolvedValueOnce(false)

			await expect(usersController.remove(userId)).rejects.toThrow(
				BadRequestException
			)

			expect(usersService.validateObjectId).toHaveBeenCalledWith(userId)
			expect(mockUsersService.validateObjectId).toHaveBeenCalledWith(userId)
		})
	})
})
