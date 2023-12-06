import { IsString, IsOptional, IsNumber } from 'class-validator'

export class UpdatePackageDto {
	@IsString()
	@IsOptional()
	address: string
	@IsString()
	@IsOptional()
	clientName: string
	@IsNumber()
	@IsOptional()
	weight: number
	@IsString()
	@IsOptional()
	deliverDate: string
	@IsString()
	@IsOptional()
	status: string
}
