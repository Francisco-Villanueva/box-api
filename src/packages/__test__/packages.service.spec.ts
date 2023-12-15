import { Test, TestingModule } from '@nestjs/testing'
import { PackagesService } from '../packages.service'
import { getModelToken } from '@nestjs/mongoose'
import { Package } from '../schema/packages.schema'
import mongoose, { Model } from 'mongoose'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { PackageDto } from '../dto/package.dto'

describe('PackagesController', () => {
	let packageService: PackagesService
	let model: Model<Package>

	const mockPackageArr = [
		{
			_id: '6571e920c5cfa9c54f6149d6',
			address: 'Carlos Pellegrini 255, Buenos Aires, Argentina',
			clientName: 'Juan Rodriguez',
			weight: 5,
			deliverDate: '2023-12-14',
			status: 'NO ASIGNADO',
		},
		{
			_id: '6571cf4ffdb95b0a615c4aee',
			address: 'Carlos Pellegrini 500, Buenos Aires, Argentina',
			clientName: 'Pedro Gonzalez',
			weight: 2,
			deliverDate: '2023-12-13',
			status: 'PENDIENTE',
		},
		{
			_id: '6571e4e9c5cfa9c54f614916',
			address: 'Carlos Pellegrini 800, Buenos Aires, Argentina',
			clientName: 'Juan Moralez',
			weight: 3,
			deliverDate: '2023-12-13',
			status: 'PENDIENTE',
		},
	]

	const mockPackageService = {
		findById: jest.fn(),
		find: jest.fn(),
		create: jest.fn(),
		findOneAndUpdate: jest.fn(),
	}

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [
				PackagesService,
				{
					provide: getModelToken(Package.name),
					useValue: mockPackageService,
				},
			],
		}).compile()

		packageService = app.get<PackagesService>(PackagesService)
		model = app.get<Model<Package>>(getModelToken(Package.name))
	})

	describe('findAll', () => {
		it('should return an array of Packages', async () => {
			jest.spyOn(model, 'find').mockResolvedValue(mockPackageArr)
			const result = await packageService.findAll()
			expect(model.find).toHaveBeenCalled()
			expect(result).toEqual(mockPackageArr)
			expect(result.length).toEqual(3)
		})
	})

	describe('findById', () => {
		it('should find and return a Package by ID', async () => {
			jest.spyOn(model, 'findById').mockResolvedValue(mockPackageArr[2])
			const result = await packageService.findByID(mockPackageArr[2]._id)
			expect(model.findById).toHaveBeenCalledWith(mockPackageArr[2]._id)
			expect(result).toEqual(mockPackageArr[2])
		})

		it('should return BadRequestException with an invalid id', async () => {
			const id = 'invalid-id'
			const isValidObjectIdMock = jest
				.spyOn(mongoose, 'isValidObjectId')
				//REVISAR PORQUE ACA VA TRUE
				.mockReturnValue(false)

			await expect(packageService.findByID(id)).rejects.toThrow(
				BadRequestException
			)
			expect(isValidObjectIdMock).toHaveBeenCalledWith(id)
			isValidObjectIdMock.mockRestore()
		})

		it('should return NotFoundException with an incorrect id', async () => {
			const notFoundId = '6571e920c5cfa9c54f6149d7'
			jest.spyOn(model, 'findById').mockResolvedValue(null)
			await expect(packageService.findByID(notFoundId)).rejects.toThrow(
				NotFoundException
			)
			expect(model.findById).toHaveBeenCalledWith(notFoundId)
		})
	})

	describe('findByStatus', () => {
		it('should find and return a Package by status', async () => {
			jest.spyOn(model, 'find').mockResolvedValue([mockPackageArr[0]])
			const result = await packageService.findByStatus(mockPackageArr[0].status)
			expect(model.find).toHaveBeenCalledWith({ status: mockPackageArr[0].status })
			expect(result).toEqual([mockPackageArr[0]])
		})

		it('should find and return 2 packages with status = "PENDIENTE"', async () => {
			jest
				.spyOn(model, 'find')
				.mockResolvedValue([mockPackageArr[1], mockPackageArr[2]])
			const pendingPackages = await packageService.findByStatus('PENDIENTE')
			expect(model.find).toHaveBeenCalledWith({ status: 'PENDIENTE' })
			expect(pendingPackages).toEqual([mockPackageArr[1], mockPackageArr[2]])
			expect(pendingPackages.length).toBe(2)
		})

		it('should find and return 0 packages with status = "ENTREGADO"', async () => {
			jest.spyOn(model, 'find').mockResolvedValue([])
			const deliveredPackages = await packageService.findByStatus('ENTREGADO')
			expect(model.find).toHaveBeenCalledWith({ status: 'ENTREGADO' })
			expect(deliveredPackages).toEqual([])
			expect(deliveredPackages.length).toBe(0)
		})

		it('should return BadRequestException if the status doesnt exist', async () => {
			const status = 'ESTADO FALSO'

			await expect(packageService.findByStatus(status)).rejects.toThrow(
				BadRequestException
			)
		})
	})

	describe('create', () => {
		it('should create and return a Package', async () => {
			const mockNewPackage: PackageDto = {
				address: 'Carlos Pellegrini 255, Buenos Aires, Argentina',
				clientName: 'Dario Perez',
				weight: 22,
				deliverDate: '2023-12-07',
				status: 'NO ASIGNADO',
			}

			const mockCreatedPackage = {
				_id: '6571e920c5cfa9c54f6149d6',
				address: 'Carlos Pellegrini 255, Buenos Aires, Argentina',
				clientName: 'Dario Perez',
				weight: 22,
				deliverDate: '2023-12-07',
				status: 'NO ASIGNADO',
				__v: 0,
			}

			jest.spyOn(packageService, 'create').mockResolvedValue(mockCreatedPackage)
			const result = await packageService.create(mockNewPackage)

			expect(result).toEqual(mockCreatedPackage)
		})
	})

	describe('updateByID', () => {
		it('should update and return a Package', async () => {
			const updatedPackage = { ...mockPackageArr[0], status: 'PENDIENTE' }
			const newPackage = { ...mockPackageArr[0], status: 'PENDIENTE' }
			jest.spyOn(model, 'findOneAndUpdate').mockResolvedValueOnce(updatedPackage)
			const result = await packageService.update(mockPackageArr[0]._id, newPackage)
			expect(model.findOneAndUpdate).toHaveBeenCalledWith(
				{ _id: mockPackageArr[0]._id },
				newPackage,
				{
					returnOriginal: false,
				}
			)
			expect(result.status).toEqual('PENDIENTE')
		})
	})
})
