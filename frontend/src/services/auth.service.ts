import axios from 'axios';

import { AxiosRes, axiosService } from './axios.service';
import { baseURL, dynamicEndpoints, endpoints } from '../config/urls';

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
  ): AxiosRes<TTokens & { user: TUserDto }> =>
    axiosService
      .post<TTokens & { user: TUserDto }>(endpoints.register, credentials)
      .then((response) => response),
  login: (
    credentials: LoginCredentials
  ): AxiosRes<TTokens & { user: TUserDto }> =>
    axiosService
      .post<TTokens & { user: TUserDto }>(endpoints.login, credentials)
      .then((response) => response),
  logout: (): AxiosRes<{ message: string }> =>
    axiosService
      .post<{ message: string }>(endpoints.logout)
      .then((response) => response),
  activate: (link: string) =>
    axiosService
      .get(dynamicEndpoints.activate(link))
      .then((response) => response),
  refresh: (): AxiosRes<TTokens & { user: TUserDto }> =>
    axios
      .get<TTokens & { user: TUserDto }>(`${baseURL}${endpoints.refresh}`, {
        withCredentials: true,
      })
      .then((response) => response),
};
