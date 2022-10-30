import { NextFunction, Request, Response } from 'express';

import { userService } from '../services/user.service';
import { IUserRegisterForm } from '../interfaces/user.interface';

interface IRegisterBody {
  credentials: IUserRegisterForm
}

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { credentials } = req.body as IRegisterBody;
      const userData = await userService.register(credentials);
      // refresh tok. will live inside cookies for 30 days; http only - to restrict editing cookies from client side (for https - add flag "secure")
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.status(201).json(userData);
    } catch (e) {
      console.log('User creation failed', e);
      
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {}
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {}
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {}
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {}
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(['123', '456']);
    } catch (e) {}
  }
}

const userController = new UserController();

export { userController };
