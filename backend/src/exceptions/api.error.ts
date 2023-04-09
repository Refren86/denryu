export default class ApiError extends Error {
  status: number; // http status
  errors: any[]; // validation fail errors (needs type!)

  constructor(status: number, message: string, errors: any[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  // static functions can be used without creating class instance
  static BadRequest(message: string, errors: any[] = []) {
    return new ApiError(400, message, errors);
  }

  static UnauthorizedError() {
    return new ApiError(401, 'User unauthorized');
  }

  static ForbiddenRequest(message: string) {
    return new ApiError(403, message);
  }

  static NotFound(message: string) {
    return new ApiError(404, message);
  }

  static Conflict(message: string) {
    return new ApiError(409, message);
  }

  static UnsupportedMediaType(message: string) {
    return new ApiError(415, message);
  }

  static WrongTemplate() {
    return new ApiError(500, 'Wrong template');
  }

  static SomethingWentWrong(message: string) {
    return new ApiError(500, message);
  }
}
