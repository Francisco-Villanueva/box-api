import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserDTO } from './dto/user.dto'

//Esto se crea con npx nest g controller <name>
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body() body: UserDTO) {
		return this.usersService.create(body)
	}

	@Get()
	findAll() {
		return this.usersService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findById(id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(+id)
	}
}
