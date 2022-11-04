import axios, { AxiosResponse } from 'axios';

import { baseURL } from '../config/urls';
import { authService } from './auth.service';

export const axiosService = axios.create({
  withCredentials: true, // to make sure cookies are always attached to request
  baseURL,
});

axiosService.interceptors.request.use((config) => {
  // config = request object
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`; // attaching token to every request
  }

  return config; // same as next()
});

// accepts 2 parameters (1st - response success object, 2nd - response error object)
axiosService.interceptors.response.use(
  (config) => {
    return config; // same as next()
  },
  async (error) => {
    const initialRequest = error.config;

    // if unauthorized - send request to refresh token and save in local storage
    if (
      error.response.status === 401 &&
      initialRequest &&
      !error.config._isRetry
    ) {
      try {
        const { data } = await authService.refresh();

        if (data?.accessToken) {
          localStorage.setItem('token', data.accessToken);
          initialRequest.headers = {
            ...initialRequest.headers,
            Authorization: `Bearer ${data.accessToken}`,
          };
        }

        return axios(initialRequest); // triggering initial request one more time
      } catch (err) {
        localStorage.removeItem('token');
      }
    }

    return Promise.reject(error); // if statement wasn't triggered (error code is not 401)
  }
);

export type AxiosRes<T> = Promise<AxiosResponse<T>>;
