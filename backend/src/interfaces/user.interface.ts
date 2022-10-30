export interface IUser {
  _id?: string;
  name: string;
  surname: string;
  email: string;
  username: string;
  passwordHash: string;
  phone: string;
  bio?: string;
  image?: string;
  friends?: IUser[];
  isActivated?: boolean;
  activationLink?: string;
}

export interface IUserRegisterForm {
  name: string;
  surname: string;
  email: string;
  username: string;
  phone: string;
  password: string;
}
