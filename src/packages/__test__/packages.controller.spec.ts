import { Test, TestingModule } from '@nestjs/testing'
import { PackagesService } from '../packages.service'
import { PackagesController } from '../packages.controller'
import { PackageDto } from '../dto/package.dto'
import { BadRequestException, NotFoundException } from '@nestjs/common'

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
		isShownToAdmin: true,
		isShownToCarrier: true,
	}

	const mockPackage = [
		{
			_id: '6571e920c5cfa9c54f6149d6',
			address: 'Carlos Pellegrini 255, Buenos Aires, Argentina',
			clientName: 'Juan Rodriguez',
			weight: 5,
			deliverDate: '2023-12-14',
			status: 'NO ASIGNADO',
			isShownToAdmin: true,
			isShownToCarrier: true,
		},
		{
			_id: '2671e920c5cfa9c54f6149f0',
			address: 'Carlos Pellegrini 500, Buenos Aires, Argentina',
			clientName: 'Pedro Gonzalez',
			weight: 2,
			deliverDate: '2023-12-13',
			status: 'PENDIENTE',
			isShownToAdmin: true,
			isShownToCarrier: true,
		},
		{
			_id: '9071e920c5cfa9c54f6149p3',
			address: 'Carlos Pellegrini 800, Buenos Aires, Argentina',
			clientName: 'Juan Moralez',
			weight: 3,
			deliverDate: '2023-12-13',
			status: 'PENDIENTE',
			isShownToAdmin: true,
			isShownToCarrier: true,
		},
	]

	const mockPackageService = {
		findAll: jest.fn().mockResolvedValueOnce(mockPackage),
		create: jest.fn(),
		findByID: jest.fn().mockResolvedValueOnce(mockPackageObject),
		update: jest.fn(),
		findByStatus: jest
			.fn()
			.mockResolvedValueOnce([mockPackage[1], mockPackage[2]]),
		validateObjectId: jest.fn().mockResolvedValue(true),
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
				isShownToAdmin: true,
				isShownToCarrier: true,
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

			expect(packageService.validateObjectId).toHaveBeenCalledWith(
				mockPackageObject._id
			)
			expect(packageService.findByID).toHaveBeenCalledWith(mockPackageObject._id)
			expect(result).toEqual(mockPackageObject)
		})

		it('should return BadRequestException with an invalid id', async () => {
			const id = 'invalid-id'
			mockPackageService.validateObjectId.mockResolvedValueOnce(false)

			await expect(packageController.findBy(id)).rejects.toThrow(
				BadRequestException
			)

			expect(packageService.validateObjectId).toHaveBeenCalledWith(id)
		})

		it('should return NotFoundException with an incorrect id', async () => {
			const notFoundId = '6571e920c5cfa9c54f6149d7'
			await expect(packageController.findBy(notFoundId)).rejects.toThrow(
				NotFoundException
			)
			expect(packageService.findByID).toHaveBeenCalledWith(notFoundId)
		})
	})

	describe('getPackageByStatus', () => {
		it('should get a package by status', async () => {
			const status = 'PENDIENTE'
			const result = await packageController.findByStatus(status)
			expect(packageService.findByStatus).toHaveBeenCalled()
			expect(result).toEqual([mockPackage[1], mockPackage[2]])
		})

		it('should return BadRequestException with an invalid id', async () => {
			const invlaidStatus = 'INVALID'

			await expect(packageController.findByStatus(invlaidStatus)).rejects.toThrow(
				BadRequestException
			)

			expect(packageService.findByStatus).toHaveBeenCalled()
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
