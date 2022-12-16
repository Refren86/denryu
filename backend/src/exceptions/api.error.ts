export default class ApiError extends Error {
  status: number; // http status
  errors: any[]; // validation fail errors (needs type!)

  constructor(status: number, message: string, errors: any[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  // static functions can be used without creating class instance
  static UnauthorizedError() {
    return new ApiError(401, 'User unauthorized');
  }

  static BadRequest(message: string, errors: any[] = []) {
    return new ApiError(403, message, errors);
  }

  static WrongTemplate() {
    return new ApiError(500, 'Wrong template')
  }
}
