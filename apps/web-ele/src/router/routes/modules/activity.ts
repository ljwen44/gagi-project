import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:megaphone',
      order: 6,
      title: $t('page.activity.title'),
    },
    name: 'Activity',
    path: '/activity',
    children: [
      {
        name: 'ActivityView',
        path: '/activity/list',
        component: () => import('#/views/activity/list/index.vue'),
        meta: {
          icon: 'lucide:book-copy',
          title: $t('page.activity.list'),
        },
      },
    ],
  },
];

export default routes;
