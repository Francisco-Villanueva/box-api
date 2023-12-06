import { IsNotEmpty, IsString } from 'class-validator'

export class AddPackageDto {
	@IsNotEmpty()
	@IsString()
	userId: string

	@IsNotEmpty()
	@IsString()
	packageId: string
}
