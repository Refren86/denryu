import jwt from 'jsonwebtoken';

import UserDto from '../dtos/user.dto';
import TokenModel from '../models/token.model';
import { ITokenModel, ITokens } from './../interfaces/token.interface';
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../constants/env';

// User registers/logs in, then token pair is generated and refresh token is saved to the db
class TokenService {
  generateTokens(payload: UserDto): ITokens {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET!, {
      expiresIn: '30m',
    });

    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET!, {
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: string, refreshToken: string): Promise<ITokenModel> {
    // before saving token, find it in the db, if it exists - overwrite it with new token
    const tokenData = await TokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    // if user logins for first time:
    const token = await TokenModel.create({ user: userId, refreshToken });

    return token;
  }
}

const tokenService = new TokenService();

export { tokenService };
