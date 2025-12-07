import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

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
