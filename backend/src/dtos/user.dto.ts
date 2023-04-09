import { IUser } from "../interfaces/user.interface";

// DATA TRANSFER OBJECT
export default class UserDto {
  _id;
  email;
  name;
  surname;
  username;
  phone;
  bio;
  image;
  isActivated;

  constructor(model: Partial<IUser>) {
    this._id = model._id!;
    this.email = model.email!;
    this.username = model.username!;
    this.isActivated = model.isActivated!;
    this.name = model?.name || '';
    this.surname = model?.surname || '';
    this.phone = model?.phone || '';
    this.bio = model?.bio || '';
    this.image = model?.image || '';
  }
}