import {
	Controller,
	Post,
	Body,
	UnauthorizedException,
	Patch,
	UploadedFile,
	UseInterceptors,
	Get,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginAuthDto } from './dto/login-auth.dto'
import { UserDTO } from 'src/users/dto/user.dto'
import { ResetPasswordDto } from './dto/resetPass-auth.dto'
import { UpdatePasswordDto } from './dto/updatePass-auth.dto'
import { ValidateTokenDTO } from './dto/token.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({
		description: 'Retrieve a greeting message from the application',
	})
	@Get()
	sayHello() {
		return 'Hello Packages'
	}

	@ApiOperation({ description: 'Authenticate and generate JWT for user login' })
	@ApiBody({ type: LoginAuthDto })
	@Post('login')
	async login(@Body() { user, password }: LoginAuthDto) {
		const userValidate = await this.authService.validateUser(user, password)

		if (!userValidate) {
			throw new UnauthorizedException('Data not valid')
		}

		const jwt = await this.authService.generateJWT(userValidate)

		return jwt
	}

	@ApiOperation({ description: 'Register a new user' })
	@ApiBody({ type: UserDTO })
	@Post('register')
	registerUser(@Body() userObjectRegister: UserDTO) {
		return this.authService.register(userObjectRegister)
	}

	@ApiOperation({ description: 'Retrieve user information based on JWT token' })
	@ApiBody({ type: ValidateTokenDTO })
	@Post('me')
	me(@Body() token: ValidateTokenDTO) {
		return this.authService.me(token.token)
	}

	@ApiOperation({ description: 'Reset user password' })
	@ApiBody({ type: ResetPasswordDto })
	@Post('reset-password')
	resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
		return this.authService.resetPassword(resetPasswordDto)
	}

	@ApiOperation({ description: 'Update user password' })
	@ApiBody({ type: UpdatePasswordDto })
	@Patch('update-password')
	updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
		return this.authService.updatePassword(updatePasswordDto)
	}

	//Endpoint para mandar la imagen desde el front. Le retorna al front la url de S3
	@ApiOperation({ description: 'Upload an image and get the S3 URL' })
	@Post('upload-image')
	@UseInterceptors(FileInterceptor('image'))
	async uploadImage(@UploadedFile() file: Express.Multer.File) {
		const imageUrl = await this.authService.uploadImageToS3(file)
		return { imageUrl }
	}
}
