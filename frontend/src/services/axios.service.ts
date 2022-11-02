import axios, { AxiosResponse } from 'axios';

import { baseURL } from '../config/urls';

export const axiosService = axios.create({
  // withCredentials SHOULD BE TRUE!
  withCredentials: false, // to make sure cookies are always attached to request
  baseURL,
  // REDUNDANT ???
  headers: {
    'Access-Control-Request-Private-Network': true,
    'Access-Control-Allow-Origin': true,
  },
});

axiosService.interceptors.request.use((config) => {
  // config = request object
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`; // attaching token to every request
  }

  return config;
});

export type AxiosRes<T> = Promise<AxiosResponse<T>>;
