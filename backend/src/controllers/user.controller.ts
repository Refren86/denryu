import { UploadedFile } from 'express-fileupload';
import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

import ApiError from '../exceptions/api.error';
import { CLIENT_URL } from '../constants/env';
import { userService } from '../services/user.service';
import { IUser, IUserRegisterForm } from '../interfaces/user.interface';
import { s3Service } from '../services/s3.service';

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req); // body will be extracted automatically from request

      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest(
            'Registration form validation error',
            errors.array()
          )
        );
      }

      const { email, password, username } = req.body as IUserRegisterForm;
      const userData = await userService.register({
        email,
        password,
        username,
      });
      // refresh tok. will live inside cookies for 30 days; http only - to restrict editing cookies from client side (for https - add flag "secure")
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });

      return res.status(201).json(userData);
    } catch (e) {
      next(e); // API error instance goes to middleware
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const credentials = req.body as {
        email: string;
        password: string;
      };
      const { email, password } = credentials;

      const userData = await userService.login(email, password);

      // refresh tok. will live inside cookies for 30 days; http only - to restrict editing cookies from client side (for https - add flag "secure")
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies as { refreshToken: string };
      await userService.logout(refreshToken);

      res.clearCookie('refreshToken'); // clearing cookie from response headers
      return res.json({ message: 'Refresh token was successfully deleted' });
    } catch (e) {
      next(e);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const { link: activationLink } = req.params;
      await userService.activate(activationLink);

      // redirect on frontend page
      return res.redirect(`${CLIENT_URL}?activated=true`);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies as { refreshToken: string };

      const userData = await userService.refresh(refreshToken);

      // refresh tok. will live inside cookies for 30 days; http only - to restrict editing cookies from client side (for https - add flag "secure")
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const updateData: Partial<IUser> = req.body;

      const updatedUser = await userService.updateUser(userId, updateData);
      return res.status(201).json(updatedUser);
    } catch (e) {
      next(e);
    }
  }

  async uploadUserAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      console.log(`req.files >>>`, req.files);
      
      const uploadedData = await s3Service.uploadPublicFile(
        req.files!.avatar as UploadedFile,
        'users', // folder name
        userId
      ); // uploads on S3

      const updatedUser = await userService.updateUser(userId, {
        image: uploadedData.Location,
      });

      return res.status(201).json(updatedUser);
    } catch (e) {
      next(e);
    }
  }
}

const userController = new UserController();

export { userController };
