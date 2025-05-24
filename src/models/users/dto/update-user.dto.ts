import { IsEmail, IsOptional, IsString } from 'class-validator';
import { EStatuses } from '../../../enums/usersEnums';

export class UpdateUserDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  status?: EStatuses;
}
