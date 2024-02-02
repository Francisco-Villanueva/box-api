import {
	IsString,
	IsOptional,
	IsNotEmpty,
	IsNumber,
	IsBoolean,
} from 'class-validator'

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
	@IsBoolean()
	@IsOptional()
	isShownToAdmin: boolean
	@IsBoolean()
	@IsOptional()
	isShownToCarrier: boolean
}
