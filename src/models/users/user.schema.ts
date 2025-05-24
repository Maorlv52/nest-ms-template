import { Schema } from 'mongoose';
import { EStatuses } from '../../enums/usersEnums';
import { IUsersModel } from '../../interfaces/usersModel.interfaces';

export const UserSchema = new Schema<IUsersModel>(
  {
    name: { type: String },
    email: { type: String, unique: true },
    status: { type: String, enum: Object.values(EStatuses), required: true },
  },
  { timestamps: true, strict: true, versionKey: false },
);
