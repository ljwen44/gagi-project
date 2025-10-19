import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:file-text',
      order: 3,
      title: $t('page.protocol.title'),
    },
    name: 'Protocol',
    path: '/protocol',
    children: [
      {
        name: 'ProtocolList',
        path: '/protocol/list',
        component: () => import('#/views/protocol/list/index.vue'),
        meta: {
          icon: 'lucide:file-stack',
          title: $t('page.protocol.list'),
        },
      },
    ],
  },
];

export default routes;
