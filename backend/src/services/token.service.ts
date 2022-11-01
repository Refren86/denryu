import UserDto from '../dtos/user.dto';
import TokenModel from '../models/token.model';
import { generateToken, verifyToken } from '../helpers/token';
import { ITokenModel, ITokens } from './../interfaces/token.interface';
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../constants/env';
import { JwtPayload } from 'jsonwebtoken';

// User registers/logs in, then token pair is generated and refresh token is saved to the db
class TokenService {
  generateTokens(payload: UserDto): ITokens {
    const accessToken = generateToken(payload, JWT_ACCESS_SECRET!, '30m');
    const refreshToken = generateToken(payload, JWT_REFRESH_SECRET!, '30d');

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

  async removeToken(refreshToken: string) {
    await TokenModel.deleteOne({ refreshToken });
  }

  async findToken(refreshToken: string) {
    const tokenData = await TokenModel.findOne({ refreshToken });

    return tokenData;
  }

  validateAccessToken(accessToken: string) {
    try {
      const userData = verifyToken(accessToken, JWT_ACCESS_SECRET!);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(refreshToken: string) {
    try {
      const userData = verifyToken(refreshToken, JWT_REFRESH_SECRET!);
      return userData;
    } catch (e) {
        return null
    }
  }
}

const tokenService = new TokenService();

export { tokenService };
