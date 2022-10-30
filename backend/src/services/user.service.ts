import { ITokens } from './../interfaces/token.interface';
import bcrypt from 'bcrypt';
import { v4 as randomString } from 'uuid';

import UserDto from '../dtos/user.dto';
import UserModel from '../models/user.model';
import { API_URL } from '../constants/env';
import { emailService } from './email.service';
import { tokenService } from './token.service';
import { IUser, IUserRegisterForm } from '../interfaces/user.interface';

class UserService {
  async register(
    credentials: IUserRegisterForm
  ): Promise<ITokens & { user: UserDto }> {
    const { email, name, password, phone, surname, username } = credentials;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new Error(`User with email ${email} already exist`);
    }

    const salt = await bcrypt.genSalt(10);
    const secretPassword = await bcrypt.hash(password, salt); // hashing password

    const activationLink = randomString(); // link for email to activate account

    const newUser = await UserModel.create<IUser>({
      name,
      surname,
      email,
      phone,
      username,
      passwordHash: secretPassword,
      activationLink,
    });

    // users clicks on randomly generated endpoint and his account is being activated
    await emailService.sendActivationMail(
      email,
      `${API_URL}/api/activate/${activationLink}`
    );

    // using Dto we're getting rid of unnecessary fields
    const userDto = new UserDto(newUser); // id, email, isActivated

    const tokens = tokenService.generateTokens({ ...userDto }); // turning class instance into plain js object to generate tokens
    await tokenService.saveToken(userDto.id, tokens.refreshToken); // saving refresh token in db

    return {
      ...tokens,
      user: userDto,
    };
  }
}

const userService = new UserService();

export { userService };
