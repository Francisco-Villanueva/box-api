import { Test, TestingModule } from '@nestjs/testing'
import { PackagesService } from '../packages.service'
import { PackagesController } from '../packages.controller'
import { PackageDto } from '../dto/package.dto'

describe('PackagesController', () => {
	let packageService: PackagesService
	let packageController: PackagesController

	const mockPackageObject = {
		_id: '6571e920c5cfa9c54f6149d6',
		address: 'Carlos Pellegrini 255, Buenos Aires, Argentina',
		clientName: 'Juan Rodriguez',
		weight: 5,
		deliverDate: '2023-12-14',
		status: 'NO ASIGNADO',
	}

	const mockPackage = [
		{
			_id: '6571e920c5cfa9c54f6149d6',
			address: 'Carlos Pellegrini 255, Buenos Aires, Argentina',
			clientName: 'Juan Rodriguez',
			weight: 5,
			deliverDate: '2023-12-14',
			status: 'NO ASIGNADO',
		},
		{
			_id: '2671e920c5cfa9c54f6149f0',
			address: 'Carlos Pellegrini 500, Buenos Aires, Argentina',
			clientName: 'Pedro Gonzalez',
			weight: 2,
			deliverDate: '2023-12-13',
			status: 'PENDIENTE',
		},
		{
			_id: '9071e920c5cfa9c54f6149p3',
			address: 'Carlos Pellegrini 800, Buenos Aires, Argentina',
			clientName: 'Juan Moralez',
			weight: 3,
			deliverDate: '2023-12-13',
			status: 'PENDIENTE',
		},
	]

	const mockPackageService = {
		findAll: jest.fn().mockResolvedValueOnce(mockPackage),
		create: jest.fn(),
		findByID: jest.fn().mockResolvedValueOnce(mockPackageObject),
		update: jest.fn(),
	}

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [PackagesController],
			providers: [
				{
					provide: PackagesService,
					useValue: mockPackageService,
				},
			],
		}).compile()

		packageService = app.get<PackagesService>(PackagesService)
		packageController = app.get<PackagesController>(PackagesController)
	})

	it('should be defined', async () => {
		expect(packageController).toBeDefined()
	})

	describe('getAllPackages', () => {
		it('should get all packages', async () => {
			const result = await packageController.findAll()
			expect(packageService.findAll).toHaveBeenCalled()
			expect(result).toEqual(mockPackage)
		})
	})

	describe('createAPackage', () => {
		it('should create a package', async () => {
			const newPackage = {
				_id: '6571e920c5cfa9c54f6149d6',
				address: 'Carlos Pellegrini 255, Buenos Aires, Argentina',
				clientName: 'Juan Rodriguez',
				weight: 5,
				deliverDate: '2023-12-14',
				status: 'NO ASIGNADO',
			}

			mockPackageService.create = jest.fn().mockResolvedValueOnce(mockPackage[0])

			const result = await packageController.create(newPackage as PackageDto)
			expect(packageService.create).toHaveBeenCalled()
			expect(result).toEqual(mockPackage[0])
		})
	})

	describe('getPackageById', () => {
		it('should get a package by ID', async () => {
			const result = await packageController.findBy(mockPackageObject._id)
			expect(packageService.findByID).toHaveBeenCalled()
			expect(result).toEqual(mockPackageObject)
		})
	})

	describe('updatePackage', () => {
		it('should update a package', async () => {
			const updatedPackage = { ...mockPackageObject, status: 'PENDIENTE' }
			const newPackage = { ...mockPackageObject, status: 'PENDIENTE' }

			mockPackageService.update = jest.fn().mockResolvedValueOnce(updatedPackage)

			const result = await packageController.update(
				mockPackageObject._id,
				newPackage
			)
			expect(packageService.update).toHaveBeenCalled()
			expect(result).toEqual(updatedPackage)
		})
	})
})
