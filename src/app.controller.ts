import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('Main')
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@ApiOperation({
		description: 'Retrieve a greeting message from the application',
	})
	@Get()
	getHello(): string {
		return this.appService.getHello()
	}
}
