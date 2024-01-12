import { IsNotEmpty, IsString } from 'class-validator'

export class AddPackageDto {
	@IsNotEmpty()
	@IsString()
	packageId: string
}
