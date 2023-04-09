import { NextFunction, Response } from "express";

import userModel from "../models/user.model";
import ApiError from "../exceptions/api.error";
import { ICustomRequest } from "../interfaces/request.interface";

export default async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const username = req.body?.username;

    // check if username already has this username
    if (req.user?.username === username) {
      next();
      return;
    }

    const existingUsername = await userModel.findOne({ username });

    if (existingUsername) {
      return next(
        ApiError.BadRequest(`User with username ${username} already exists`)
      ); // token is invalid and hasn't expired
    }

    next();
  } catch (e: any) {
    return next(ApiError.SomethingWentWrong(e.message));
  }
};
