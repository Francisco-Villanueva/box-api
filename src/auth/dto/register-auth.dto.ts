import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { isEmail, isNotEmpty } from 'class-validator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {

}
