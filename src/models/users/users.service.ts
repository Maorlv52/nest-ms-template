import { Model, Types } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUsersModel } from '../../interfaces/usersModel.interfaces';
import { errorHandler } from '../../helperFunctions/errorFunctions';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<IUsersModel>,
  ) {}

  async findAll(): Promise<IUsersModel[]> {
    return this.userModel.find().lean();
  }

  async createUser(data: Partial<IUsersModel>): Promise<IUsersModel> {
    try {
      const createdUser = new this.userModel(data);
      return await createdUser.save();
    } catch (error) {
      return errorHandler(
        error,
        'Error creating user',
        HttpStatus.I_AM_A_TEAPOT,
      );
    }
  }

  async findById(id: string): Promise<IUsersModel | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.userModel.findById(id).lean();
  }
}
