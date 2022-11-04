import { IUser } from "../interfaces/user.interface";

// DATA TRANSFER OBJECT
export default class UserDto {
  email: string;
  id: string;
  username: string;
  isActivated: boolean;

  constructor(model: Partial<IUser>) {
    this.email = model.email!;
    this.id = model._id!;
    this.username = model.username!;
    this.isActivated = model.isActivated!;
  }
}