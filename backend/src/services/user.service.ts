import { ITokens } from './../interfaces/token.interface';
import bcrypt from 'bcrypt';
import { v4 as randomString } from 'uuid';

import UserDto from '../dtos/user.dto';
import UserModel from '../models/user.model';
import ApiError from '../exceptions/api.error';
import { API_URL } from '../constants/env';
import { emailService } from './email.service';
import { emailActions } from '../config/email-action.enum';
import { tokenService } from './token.service';
import { IUser, IUserRegisterForm } from '../interfaces/user.interface';

class UserService {
  async register({
    email,
    password,
    username,
  }: IUserRegisterForm): Promise<ITokens & { user: UserDto }> {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw ApiError.BadRequest(`User with email ${email} already exist`);
    }

    const salt = await bcrypt.genSalt(10);
    const secretPassword = await bcrypt.hash(password, salt); // hashing password

    const activationLink = randomString(); // link for email to activate account

    const newUser = await UserModel.create<Partial<IUser>>({
      name: 'John',
      surname: 'Doe',
      email,
      username,
      passwordHash: secretPassword,
      activationLink,
    });

    // users clicks on randomly generated endpoint and his account is being activated
    await emailService.sendEmail(
      email,
      { link: `${API_URL}/api/activate/${activationLink}` },
      emailActions.EMAIL_ACTIVATION
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

  async activate(activationLink: string): Promise<void> {
    const user = await UserModel.findOne({ activationLink });

    // if user with specified activation link doesn't exist
    if (!user) {
      throw ApiError.BadRequest('Incorrect activation link');
    }

    user.isActivated = true;
    await user.save(); // now user is activated and email is checked
  }

  async login(
    email: string,
    password: string
  ): Promise<ITokens & { user: UserDto }> {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      throw ApiError.BadRequest('Incorrect login/password');
    }

    const isPassEqual = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!isPassEqual) {
      throw ApiError.BadRequest('Incorrect login/password');
    }

    const userDto = new UserDto(existingUser);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken); // saving refresh token in db

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken: string): Promise<void> {
    // delete token from DB
    await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string): Promise<ITokens & { user: UserDto }> {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    // validate and find token in DB
    const userData = tokenService.validateRefreshToken(refreshToken); // id, email, isActivated
    const tokenFromDB = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);

    if (!user) {
      throw ApiError.BadRequest(`User with ID ${userData.id} doesn't exist`);
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken); // saving refresh token in db

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers(): Promise<IUser[]> {
    const users = UserModel.find();
    return users;
  }
}

const userService = new UserService();

export { userService };
