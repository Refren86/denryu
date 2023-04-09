import { Request } from "express";
import { IncomingHttpHeaders } from "http";

import UserDto from "../dtos/user.dto";

export interface ICustomRequest extends Request {
  user?: UserDto;
  headers: IncomingHttpHeaders & {
    authorization?: string;
  };
}
