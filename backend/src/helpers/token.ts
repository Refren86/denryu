import jwt from 'jsonwebtoken';

import UserDto from '../dtos/user.dto';

const generateToken = (payload: UserDto, secretKey: string, expiresIn: string) => {
  return jwt.sign(
    payload,
    secretKey, // secret key
    {
      expiresIn, // how long will be valid
    }
  );
};

const verifyToken = (token: string, secretKey: string): UserDto => {
  const userData = jwt.verify(token, secretKey);
  return userData as UserDto;
}

export {
  generateToken,
  verifyToken,
}
