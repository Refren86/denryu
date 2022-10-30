import jwt from 'jsonwebtoken';

export const generateToken = (id: string) => {
  return jwt.sign(
    {
      _id: id, // payload
    },
    `${process.env.SECRET}`, // secret key
    {
      expiresIn: '7d', // how long will be valid
    }
  );
};
