import { EStatuses } from '../enums/usersEnums';

export interface IUsersModel {
  name: string;
  email: string;
  status: EStatuses;
}
