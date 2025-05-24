import { Model, Types } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUsersModel } from '../../interfaces/usersModel.interfaces';
import { errorHandler } from '../../helperFunctions/errorFunctions';
import logger from '../../configs/logger';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<IUsersModel>,
  ) {}

  async findAll(): Promise<IUsersModel[]> {
    try {
      return this.userModel.find().lean();
    } catch (error) {
      return errorHandler(
        error,
        'Error fetching users',
        HttpStatus.I_AM_A_TEAPOT,
      );
    }
  }

  async createUser(data: Partial<IUsersModel>): Promise<IUsersModel> {
    try {
      const createdUser = new this.userModel(data);
      logger.info(`Creating user with data: ${JSON.stringify(data)}`);
      const update = await createdUser.save();

      logger.info(`User created successfully: ${JSON.stringify(update)}`);

      return update;
    } catch (error) {
      return errorHandler(
        error,
        'Error creating user',
        HttpStatus.I_AM_A_TEAPOT,
      );
    }
  }

  async findById(id: string): Promise<IUsersModel | null> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        return errorHandler(
          new Error('Invalid ID'),
          'Invalid ID',
          HttpStatus.BAD_REQUEST,
        );
      }
      const user = await this.userModel.findById(id).lean();
      if (!user) {
        return errorHandler(
          new Error('User not found'),
          'User not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    } catch (error) {
      return errorHandler(
        error,
        'Error fetching user by ID',
        HttpStatus.I_AM_A_TEAPOT,
      );
    }
  }

  async updateUser(
    id: string,
    data: Partial<IUsersModel>,
  ): Promise<IUsersModel> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        return errorHandler(
          new Error('Invalid ID'),
          'Invalid ID',
          HttpStatus.BAD_REQUEST,
        );
      }

      const updated = await this.userModel.findByIdAndUpdate(id, data, {
        new: true,
        lean: true,
      });
      if (!updated) {
        return errorHandler(
          new Error('User not found'),
          'User not found',
          HttpStatus.NOT_FOUND,
        );
      }

      logger.info(`User updated successfully: ${JSON.stringify(updated)}`);

      return updated;
    } catch (error) {
      return errorHandler(
        error,
        'Error updating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    if (!Types.ObjectId.isValid(id)) {
      errorHandler(
        new Error('Invalid ID'),
        'Invalid ID',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const result = await this.userModel.findByIdAndDelete(id);
      if (!result) {
        errorHandler(
          new Error('User not found'),
          'User not found',
          HttpStatus.NOT_FOUND,
        );
      }

      logger.info(`User deleted successfully: ${JSON.stringify(result)}`);

      return { message: `User with ID ${id} deleted successfully` };
    } catch (error) {
      return errorHandler(
        error,
        'Error deleting user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteAllUsers(): Promise<{ message: string }> {
    try {
      await this.userModel.deleteMany({});
      logger.info('All users deleted successfully');
      return { message: 'All users deleted successfully' };
    } catch (error) {
      return errorHandler(
        error,
        'Error deleting all users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
