import {
  Body,
  Controller,
  Get,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUsersModel } from '../../interfaces/usersModel.interfaces';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<IUsersModel[]> {
    return this.usersService.findAll();
  }

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<IUsersModel> {
    return this.usersService.createUser(body);
  }

  @Post('by-id')
  async getUserByIdFromBody(@Body('id') id: string): Promise<IUsersModel> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
