import { Controller, Get, Post, Patch, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUsersModel } from '../../interfaces/usersModel.interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<IUsersModel[]> {
    return await this.usersService.findAll();
  }

  @Post('createUser')
  async createUser(@Body() body: CreateUserDto): Promise<IUsersModel> {
    return await this.usersService.createUser(body);
  }

  @Post('getUserById')
  async getUserById(@Body('id') id: string): Promise<IUsersModel | null> {
    return await this.usersService.findById(id);
  }

  @Patch('updateUser')
  async updateUser(
    @Body('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<IUsersModel> {
    return await this.usersService.updateUser(id, body);
  }

  @Delete('deleteUser')
  async deleteUser(@Body() body: DeleteUserDto): Promise<{ message: string }> {
    return this.usersService.deleteUser(body.id);
  }

  @Delete('deleteAllUsers')
  async deleteAllUsers(): Promise<{ message: string }> {
    return this.usersService.deleteAllUsers();
  }
}
