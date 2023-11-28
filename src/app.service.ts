import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
	getHello(): string {
		return 'BOX APP // CO-WORKERS'
	}
}
