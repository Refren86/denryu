export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  username: string;
  phone: string;
  bio: string;
  image: string;
  friends: User[];
}

export type UserRegisterForm = {
  name: string;
  surname: string;
  email: string;
  username: string;
  phone: string;
  password: string;
};

export type UserDto = {
  email: string;
  id: string;
  isActivated: boolean;
};