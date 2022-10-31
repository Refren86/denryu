import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

import ApiError from '../exceptions/api.error';
import { CLIENT_URL } from '../constants/env';
import { userService } from '../services/user.service';
import { IUserRegisterForm } from '../interfaces/user.interface';

interface IRegisterBody {
  credentials: IUserRegisterForm;
}

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req); // body will be extracted automatically from request

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Registration form validation error', errors.array()));
      }

      const { credentials } = req.body as IRegisterBody;
      const userData = await userService.register(credentials);
      // refresh tok. will live inside cookies for 30 days; http only - to restrict editing cookies from client side (for https - add flag "secure")
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.status(201).json(userData);
    } catch (e) {
      next(e); // API error instance goes to middleware
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const { link: activationLink } = req.params;
      await userService.activate(activationLink);

      // redirect on frontend page
      return res.redirect(CLIENT_URL!);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(['123', '456']);
    } catch (e) {
      next(e);
    }
  }
}

const userController = new UserController();

export { userController };
