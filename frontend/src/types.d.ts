// for module imports of type .svg, apply rules in brackets

declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// General
type TStatus = 'loading' | 'idle';

type TChildrenType = {
  children: React.ReactNode;
};

// Errors
type TErrorRes = {
  message: string;
};

type TRejectValue = {
  message: string;
  status: number;
};

// User
type TUser = {
  id: number;
  name: string;
  surname: string;
  email: string;
  username: string;
  phone: string;
  bio: string;
  image: string;
  friends: TUser[];
};

type TUserDto = {
  email: string;
  username: string;
  id: string;
  isActivated: boolean;
};

// Tokens
type TTokenModel = {
  refreshToken: string;
  user: User;
};

type TTokens = {
  accessToken: string;
  refreshToken: string;
};