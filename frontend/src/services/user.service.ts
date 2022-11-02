import { User } from '../types/User';
import { endpoints } from '../config/urls';
import { AxiosRes, axiosService } from './axios.service';

export const adminService = {
  getUsers: (): AxiosRes<User[]> =>
    axiosService.get(endpoints.users).then((response) => response),
};
