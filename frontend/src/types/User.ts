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

export type UserDto = {
  email: string;
  id: string;
  isActivated: boolean;
};