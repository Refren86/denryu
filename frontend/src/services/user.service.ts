import { dynamicEndpoints, endpoints } from '../config/urls';
import { AxiosRes, axiosService } from './axios.service';

export const userService = {
  getUsers: (): AxiosRes<TUser[]> => axiosService.get(endpoints.users).then((response) => response),
  updateUser: ({
    userId,
    newData,
  }: {
    userId: string;
    newData: Partial<TUser>;
  }): AxiosRes<TUserDto> =>
    axiosService.patch(dynamicEndpoints.updateUser(userId), newData).then((res) => res),
  uploadAvatar: ({ userId, avatar }: { userId: string; avatar: any }): AxiosRes<TUserDto> =>
    axiosService.patch(dynamicEndpoints.uploadAvatar(userId), avatar).then((res) => res),
};
