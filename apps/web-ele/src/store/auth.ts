import type { Recordable, UserInfo } from '@vben/types';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { DEFAULT_HOME_PATH, LOGIN_PATH } from '@vben/constants';
import { resetAllStores, useAccessStore, useUserStore } from '@vben/stores';
import { extractPermissionCodes } from '@vben/utils';

import { defineStore } from 'pinia';

import { getAccessCodesApi, getUserInfoApi, loginApi, logoutApi } from '#/api';

export const useAuthStore = defineStore('auth', () => {
  const accessStore = useAccessStore();
  const userStore = useUserStore();
  const router = useRouter();

  const loginLoading = ref(false);

  /**
   * 异步处理登录操作
   * Asynchronously handle the login process
   * @param params 登录表单数据
   */
  async function authLogin(
    params: Recordable<any>,
    onSuccess?: () => Promise<void> | void,
  ) {
    // 异步处理用户登录操作并获取 accessToken
    const userInfo: any | UserInfo = {
      username: params.username as string,
      roles: [],
    };
    try {
      loginLoading.value = true;
      await loginApi(params);
      const data = await getAccessCodesApi();
      const roles = extractPermissionCodes(data);
      userInfo.roles = roles;
      accessStore.setAccessToken(params.password);
      userStore.setUserInfo(userInfo);
      accessStore.setAccessCodes(data);
      onSuccess ? await onSuccess?.() : await toHomePage();
      // const { accessToken } = await loginApi(params);

      // 如果成功获取到 accessToken
      // if (accessToken) {
      //   // 将 accessToken 存储到 accessStore 中
      //   accessStore.setAccessToken(accessToken);

      //   // 获取用户信息并存储到 accessStore 中
      //   const [fetchUserInfoResult, accessCodes] = await Promise.all([
      //     fetchUserInfo(),
      //     getAccessCodesApi(),
      //   ]);

      //   userInfo = fetchUserInfoResult;

      //   userStore.setUserInfo(userInfo);
      //   accessStore.setAccessCodes(accessCodes);

      //   if (accessStore.loginExpired) {
      //     accessStore.setLoginExpired(false);
      //   } else {
      //     onSuccess
      //       ? await onSuccess?.()
      //       : await router.push(userInfo.homePath || DEFAULT_HOME_PATH);
      //   }

      //   if (userInfo?.realName) {
      //     ElNotification({
      //       message: `${$t('authentication.loginSuccessDesc')}:${userInfo?.realName}`,
      //       title: $t('authentication.loginSuccess'),
      //       type: 'success',
      //     });
      //   }
      // }
    } finally {
      loginLoading.value = false;
    }

    return {
      userInfo,
    };
  }

  async function toHomePage() {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
    router.push(DEFAULT_HOME_PATH);
  }

  async function logout(redirect: boolean = true) {
    try {
      await logoutApi();
    } catch {
      // 不做任何处理
    }
    resetAllStores();
    accessStore.setLoginExpired(false);

    // 回登录页带上当前路由地址
    await router.replace({
      path: LOGIN_PATH,
      query: redirect
        ? {
            redirect: encodeURIComponent(router.currentRoute.value.fullPath),
          }
        : {},
    });
  }

  async function getUserPermissions() {
    try {
      const data = await getAccessCodesApi();
      return extractPermissionCodes(data);
    } catch {
      return [];
    }
  }

  async function fetchUserInfo() {
    let userInfo: any | UserInfo = null;
    userInfo = await getUserInfoApi();
    userStore.setUserInfo(userInfo);
    return userInfo;
  }

  function $reset() {
    loginLoading.value = false;
  }

  return {
    $reset,
    authLogin,
    fetchUserInfo,
    getUserPermissions,
    loginLoading,
    logout,
  };
});
