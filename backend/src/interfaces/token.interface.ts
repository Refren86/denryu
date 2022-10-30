import { IUser } from './user.interface';

export interface ITokenModel {
  refreshToken: string;
  user: IUser;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
