import { AxiosRes, axiosService } from './axios.service';

import { ITokens } from '../types/Token';
import { UserDto, UserRegisterForm } from '../types/User';
import { dynamicEndpoints, endpoints } from '../config/urls';

export type RegistrationCredentials = {
  credentials: UserRegisterForm;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export const authService = {
  register: (
    credentials: RegistrationCredentials
  ): AxiosRes<ITokens & { user: UserDto }> =>
    axiosService
      .post<ITokens & { user: UserDto }>(endpoints.register, credentials)
      .then((response) => response),
  login: (
    credentials: LoginCredentials
  ): AxiosRes<ITokens & { user: UserDto }> =>
    axiosService
      .post<ITokens & { user: UserDto }>(endpoints.login, credentials)
      .then((response) => response),
  logout: (): AxiosRes<{ message: string }> =>
    axiosService
      .post<{ message: string }>(endpoints.logout)
      .then((response) => response),
  activate: (link: string) =>
    axiosService
      .get(dynamicEndpoints.activate(link))
      .then((response) => response),
  refresh: (): AxiosRes<ITokens & { user: UserDto }> =>
    axiosService
      .get<ITokens & { user: UserDto }>(endpoints.refresh)
      .then((response) => response),
};
