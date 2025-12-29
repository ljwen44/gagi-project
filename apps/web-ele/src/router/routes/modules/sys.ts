import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:settings',
      order: 9,
      title: $t('page.setting.title'),
      permissionCode: 'system',
    },
    name: 'System',
    path: '/sys',
    children: [
      {
        name: 'SystemUser',
        path: '/sys/user',
        component: () => import('#/views/system/user/index.vue'),
        meta: {
          icon: 'lucide:users',
          title: $t('page.setting.userList'),
          permissionCode: 'system:user:manage',
        },
      },
      {
        name: 'SystemRoles',
        path: '/sys/role',
        component: () => import('#/views/system/role/index.vue'),
        meta: {
          icon: 'lucide:user',
          title: $t('page.setting.roleList'),
          permissionCode: 'system:role:manage',
        },
      },
    ],
  },
];

export default routes;
