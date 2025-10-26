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
        path: '/customer/seas',
        component: () => import('#/views/customer/seas/index.vue'),
        meta: {
          icon: 'lucide:database',
          title: $t('page.customer.seas'),
        },
      },
    ],
  },
];

export default routes;
