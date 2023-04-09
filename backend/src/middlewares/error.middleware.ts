import { NextFunction, Request, Response } from "express";

import ApiError from "../exceptions/api.error";

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  // manually thrown ApiError
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err?.errors || [] })
  }
  
  return res.status(500).json({ message: 'Unexpected server error ocurred' })
}