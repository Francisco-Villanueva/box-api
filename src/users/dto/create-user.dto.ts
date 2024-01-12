//DATA TRANSFER OBJECT

// npm i --save class-validator class-transformer (sirven para transformar y validar data) ES UNA CAPA DE VALIDACION EXTRA

//en main usar app.useGlobalPipies(new ValidationPipe()); para acceder a esta clase
import { IsString, IsNotEmpty } from 'class-validator'
export class CreateUserDto {
	//POR EJEMPLO, DECLARAMOS LOS CAMPOS QUE POSEE EL SCHEMA USER;
	@IsNotEmpty()
	@IsString()
	name: string
	@IsNotEmpty()
	@IsString()
	lastName: string
	@IsNotEmpty()
	@IsString()
	email: string
}
