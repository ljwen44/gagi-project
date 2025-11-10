import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: $t('page.dashboard.title'),
      permissionCode: 'dashboard:view',
    },
    name: 'Dashboard',
    path: '/',
    children: [
      {
        name: 'Analytics',
        path: '/home/analytics',
        component: () => import('#/views/dashboard/analytics/index.vue'),
        meta: {
          // affixTab: true,
          // icon: 'lucide:area-chart',
          icon: 'carbon:workspace',
          title: $t('page.dashboard.workspace'),
          permissionCode: 'dashboard:performance:view',
        },
      },
    ],
  },
];

export default routes;
