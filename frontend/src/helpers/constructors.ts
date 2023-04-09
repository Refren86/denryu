class UserDto {
  _id;
  email;
  name;
  surname;
  username;
  phone;
  bio;
  image;
  isActivated;

  constructor(userModel: TUserDto) {
    this._id = userModel._id;
    this.email = userModel.email;
    this.username = userModel.username;
    this.isActivated = userModel?.isActivated;
    this.name = userModel?.name || '';
    this.surname = userModel?.surname || '';
    this.phone = userModel?.phone || '';
    this.bio = userModel?.bio || '';
    this.image = userModel?.image || '';
  }
}

export { UserDto };
