import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:contact',
      order: 2,
      title: $t('page.customer.title'),
      permissionCode: 'customer:view',
    },
    name: 'Customer',
    path: '/customer',
    children: [
      {
        name: 'CustomerList',
        path: '/customer/list',
        component: () => import('#/views/customer/list/index.vue'),
        meta: {
          icon: 'lucide:contact',
          title: $t('page.customer.list'),
          permissionCode: 'customer:list:view',
        },
      },
      {
        name: 'CustomerChannel',
        path: '/customer/channel',
        component: () => import('#/views/customer/channel/index.vue'),
        meta: {
          icon: 'lucide:waves',
          title: $t('page.customer.channel'),
        },
      },
      {
        name: 'CustomerSeas',
        path: '/customer/pool',
        component: () => import('#/views/customer/seas/index.vue'),
        meta: {
          icon: 'lucide:database',
          title: $t('page.customer.seas'),
          permissionCode: 'customer:pool:view',
        },
      },
    ],
  },
];

export default routes;
