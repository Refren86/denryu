import { AxiosRes, axiosService } from './axios.service';

import { ITokens } from '../types/Token';
import { UserDto } from '../types/User';
import { baseURL, dynamicEndpoints, endpoints } from '../config/urls';
import axios from 'axios';

export type RegistrationCredentials = {
  email: string;
  username: string;
  password: string;
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
    axios
      .get<ITokens & { user: UserDto }>(`${baseURL}${endpoints.refresh}`, {
        withCredentials: true,
      })
      .then((response) => response),
};
