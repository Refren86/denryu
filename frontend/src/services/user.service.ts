import { endpoints } from '../config/urls';
import { AxiosRes, axiosService } from './axios.service';

export const userService = {
  getUsers: (): AxiosRes<TUser[]> =>
    axiosService.get(endpoints.users).then((response) => response),
};
