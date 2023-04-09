import { NextFunction, Response } from "express";

import ApiError from "../exceptions/api.error";
import { tokenService } from "../services/token.service";
import { ICustomRequest } from "../interfaces/request.interface";

export default (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    // extract authorization header from request and get access token
    const authHeader = req.headers?.authorization;

    if (!authHeader) {
      return next(ApiError.UnauthorizedError()); // header is empty
    }

    const accessToken = authHeader.split(' ')[1];

    if (!accessToken) {
      return next(ApiError.UnauthorizedError()); // Bearer is empty
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.UnauthorizedError()); // token is invalid and hasn't expired
    }

    req.user = userData; // put user data from token in request and pass it next (to the routes)
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};