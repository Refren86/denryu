import { User } from "./User";

export type ITokenModel = {
  refreshToken: string;
  user: User;
}

export type ITokens = {
  accessToken: string;
  refreshToken: string;
}
