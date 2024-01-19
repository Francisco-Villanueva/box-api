import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator'

export class PackageDto {
	@IsString()
	@IsNotEmpty()
	address: string
	@IsString()
	@IsNotEmpty()
	clientName: string
	@IsNumber()
	@IsNotEmpty()
	weight: number
	@IsString()
	@IsNotEmpty()
	deliverDate: string
	@IsString()
	@IsOptional()
	status: string
}
