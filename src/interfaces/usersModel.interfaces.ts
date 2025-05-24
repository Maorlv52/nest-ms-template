import { EStatuses } from '../enums/usersEnums';

export interface IUsersModel {
  id: string;
  name: string;
  email: string;
  status: EStatuses;
}
