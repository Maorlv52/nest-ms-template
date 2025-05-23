import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EStatuses } from '../../../enums/usersEnums';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(EStatuses)
  status: EStatuses;
}
