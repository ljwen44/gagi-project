import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

export interface UpdateUser {
  userId: number;
  username: string;
  realName: string;
  email: string;
  phone: string;
}

export interface SysRole {
  description: string;
  roleCod: string;
  roleName: string;
}

export interface UpdateRole {
  description: string;
  permissionIds: number[];
  roleId: number;
  roleName: string;
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

/**
 * 新增用户
 */
export async function addUpdateInfo(data: any) {
  return requestClient.post<UpdateUser>('/user/addUser', data);
}

/**
 * 分页条件查询用户列表
 */
export const getUserList = (params: any) =>
  requestClient.get(`/user/list`, { params });

/**
 * 删除用户
 */
export const deleteUser = (id: string) => requestClient.delete(`/user/${id}`);

/**
 * 分页条件查询角色列表
 */
export const getRoleDetailList = (params: any) =>
  requestClient.get(`/user/roleDetailList`, { params });

/**
 * 获取角色列表
 */
export const getRoleList = (params: any) =>
  requestClient.get(`/user/roleList`, { params });

/**
 * 新增角色
 */
export async function addRole(data: any) {
  return requestClient.post<SysRole>('/user/addRole', data);
}

/**
 * 修改角色
 */
export async function roleUpdateInfo(data: any) {
  return requestClient.post<UpdateRole>('/user/updateRolePermission', data);
}
