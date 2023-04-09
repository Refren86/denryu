import { NextFunction, Request, Response } from 'express';

import ApiError from '../exceptions/api.error';
import { UploadedFile } from 'express-fileupload';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    // req.files = object with objects
    if (!req.files) {
      return next(ApiError.BadRequest('No file provided'));
    }

    const AVATAR_MAX_SIZE = 20 * 1024 * 1024; // 20 mb,
    const AVATAR_MIMETYPES = [
      'video/mp4',
      'video/quicktime',
      'video/x-msvideo',
      'video/x-ms-wmv',
      'video/x-flv',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/svg+xml',
      'image/bmp',
    ];

    const imagesToUpload = Object.values(req.files); // all files as objects from form data

    for (let img of imagesToUpload as UploadedFile[]) {
      const { name, size, mimetype } = img;

      if (size > AVATAR_MAX_SIZE) {
        return next(ApiError.BadRequest(`File ${name} size is too big`));
      }

      if (!AVATAR_MIMETYPES.includes(mimetype)) {
        return next(ApiError.BadRequest(`File ${name} has invalid format`));
      }
    }

    next();
  } catch (e: any) {
    return next(ApiError.SomethingWentWrong(e.message));
  }
};
