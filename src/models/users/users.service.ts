import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUsersModel } from '../../interfaces/usersModel.interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<IUsersModel>,
  ) {}

  async findAll(): Promise<IUsersModel[]> {
    return this.userModel.find().lean();
  }

  async createUser(data: Partial<IUsersModel>): Promise<IUsersModel> {
    const createdUser = new this.userModel(data);
    return createdUser.save();
  }

  async findById(id: string): Promise<IUsersModel | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.userModel.findById(id).lean();
  }
}
