import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from '../users.service'
import { UsersController } from '../users.controller'
import { PackagesService } from 'src/packages/packages.service'
import { PackagesController } from 'src/packages/packages.controller'
import { BadRequestException, NotFoundException } from '@nestjs/common'

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
			_id: '65689670bc39015676f673c4',
			name: 'Agustin',
			lastName: 'Torroja',
			userName: 'atorroja1',
			email: 'atorroja18@gmail.com',
			password: '$2b$10$OqC2YGNH3hVWnjD3P4Ts7eKmGwMfBtVYyeE2yHW5GATpFcKjr.1P.',
			role: 'CARRIER',
			status: 'HABILITADO',
			__v: 0,
			packages: [
				{
					_id: '657899b280b34d8dcf61bc34',
					address: 'Jeronimo Salguero 2085',
					clientName: 'Agustin',
					weight: 5.25,
					deliverDate: '2023-12-12',
					status: 'EN CURSO',
					__v: 0,
				},
				{
					_id: '6578a992328c2adebf4b0aaf',
					address: 'Avenida Monroe 1655, Buenos Aires, Argentina',
					clientName: 'Juan',
					weight: 5.25,
					deliverDate: '2023-12-05',
					status: 'EN CURSO',
					__v: 0,
				},
				{
					_id: '6579c65b8ba290f7a6b3dfc3',
					address: 'Avenida Casares 3450, Buenos Aires, Argentina',
					clientName: 'Pepe',
					weight: 10.5,
					deliverDate: '2023-12-12',
					status: 'EN CURSO',
					__v: 0,
				},
				{
					_id: '6579c6b68ba290f7a6b3e004',
					address: 'Avenida Sarmiento 2671, Buenos Aires, Argentina',
					clientName: 'Pepe',
					weight: 2.5,
					deliverDate: '2023-12-20',
					status: 'EN CURSO',
					__v: 0,
				},
			],
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
		{
			_id: '656f741a6b1da2a30cf2c4b6',
			name: 'Dario',
			lastName: 'Beratti',
			userName: 'darioberatti',
			email: 'darioberatti@gmail.com',
			image: 'https://boxappbucket.s3.sa-east-1.amazonaws.com/images/dario.jpg',
			password: '$2b$10$w/pNLEYazZLs.zB/Ev70f.pAC2xwB/omE9AV/Aa5mUlz/zlV3xCM2',
			role: 'CARRIER',
			status: 'HABILITADO',
			__v: 0,
			packages: [
				{
					_id: '6571eae2c5cfa9c54f6149fb',
					address: 'Carlos Pellegrini 1450, Buenos Aires, Argentina',
					clientName: 'Juliana Hernancez',
					weight: 22,
					deliverDate: '2023-12-07',
					status: 'EN CURSO',
					__v: 0,
				},
				{
					_id: '65724a9ebca18abd39b41dc5',
					address: 'Avenida Belgrano 2500, Buenos Aires, Argentina',
					clientName: 'Carlos',
					weight: 1.5,
					deliverDate: '2023-12-07',
					status: 'EN CURSO',
					__v: 0,
				},
				{
					_id: '6572312fbca18abd39b41cf8',
					address: 'Avenida Belgrano 1300, Buenos Aires, Argentina',
					clientName: 'Carlos Gomez',
					weight: 1.5,
					deliverDate: '2023-12-07',
					status: 'PENDIENTE',
					__v: 0,
				},
			],
		},
		{
			_id: '6570c91995b30abad16d1c4c',
			name: 'Mateo',
			lastName: 'Navarro',
			userName: 'Mateico',
			email: 'mateo.navarro98@gmail.com',
			password: '$2b$10$txms1PSwRKgtlCyhv5GctuN.MxJlhA1DUjLzbwQg4Ndfi7CcKrVWq',
			role: 'CARRIER',
			status: 'HABILITADO',
			packages: [
				{
					_id: '6571cf4ffdb95b0a615c4aee',
					address: 'Av. del Libertador 6700, Buenos Aires, Argentina',
					clientName: 'Pedrito Lopesssss',
					weight: 4,
					deliverDate: '2013-12-7',
					status: 'EN CURSO',
					__v: 0,
				},
				{
					_id: '6564e7c7473dafad5c55c313',
					address: 'Carlos Pellegrini 1163, Buenos Aires, Argentina',
					clientName: 'Agustin Torroja',
					weight: 5,
					deliverDate: '2023-12-06',
					status: 'EN CURSO',
					__v: 0,
				},
				{
					_id: '6571e4e9c5cfa9c54f614916',
					address: 'Carlos Pellegrini 570, Buenos Aires, Argentina',
					clientName: 'Franco Perez',
					weight: 5,
					deliverDate: '2023-12-07',
					status: 'PENDIENTE',
					__v: 0,
				},
				{
					_id: '6571e4fdc5cfa9c54f614918',
					address: 'Carlos Pellegrini 1850, Buenos Aires, Argentina',
					clientName: 'Ricardo Fernandez',
					weight: 15,
					deliverDate: '2023-12-07',
					status: 'PENDIENTE',
					__v: 0,
				},
				{
					_id: '6571e8efc5cfa9c54f6149a7',
					address: 'Carlos Pellegrini 55, Buenos Aires, Argentina',
					clientName: 'Dario Fernandez',
					weight: 22,
					deliverDate: '2023-12-07',
					status: 'PENDIENTE',
					__v: 0,
				},
				{
					_id: '6571e920c5cfa9c54f6149d6',
					address: 'Carlos Pellegrini 255, Buenos Aires, Argentina',
					clientName: 'Dario Perez',
					weight: 22,
					deliverDate: '2023-12-07',
					status: 'PENDIENTE',
					__v: 0,
				},
				{
					_id: '657218ac1addbf032a974968',
					address: 'Av Rivadavia 255, Buenos Aires, Argentina',
					clientName: 'Martin Ramirez',
					weight: 15,
					deliverDate: '2023-12-07',
					status: 'PENDIENTE',
					__v: 0,
				},
			],
			__v: 0,
		},
	]

	const mockUsersService = {
		findAll: jest.fn().mockResolvedValueOnce(mockUsers),
		findById: jest.fn().mockResolvedValueOnce(mockUsers[0]),
		validateObjectId: jest.fn().mockResolvedValue(true),
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
})
