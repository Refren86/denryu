import { IUser } from "../interfaces/user.interface";

// DATA TRANSFER OBJECT
export default class UserDto {
  email: string;
  id: string;
  isActivated: boolean;

  constructor(model: Partial<IUser>) {
    this.email = model.email!;
    this.id = model._id!;
    this.isActivated = model.isActivated!;
  }
}