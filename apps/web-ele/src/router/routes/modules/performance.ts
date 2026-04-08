import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:chart-column-big',
      order: 2,
      title: $t('page.performance.title'),
      permissionCode: 'performance:manage',
    },
    name: 'Performance',
    path: '/performance',
    children: [
      {
        name: 'PerformanceList',
        path: '/performance/list',
        component: () => import('#/views/performance/list/index.vue'),
        meta: {
          icon: 'lucide:rows-3',
          title: $t('page.performance.list'),
          permissionCode: 'performance:manage:list',
        },
      },
    ],
  },
];

export default routes;
