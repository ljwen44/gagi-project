import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

export interface UpdateUser {
  userId: number;
  username: string;
  realName: string;
  email: string;
  phone: string;
}

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>('/user/current');
}

/**
 * 更新密码
 */
export async function userUpdatePwd(data: any) {
  return requestClient.post<UserInfo>('/user/updatePwd', data);
}

/**
 * 修改信息
 */
export async function userUpdateInfo(data: any) {
  return requestClient.post<UpdateUser>('/user/updateUser', data);
}
