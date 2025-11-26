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
      // permissionCode: 'agreement:view',
    },
    name: 'Protocol',
    path: '/agreement',
    children: [
      {
        name: 'ProtocolList',
        path: '/agreement/list',
        component: () => import('#/views/protocol/list/index.vue'),
        meta: {
          icon: 'lucide:file-stack',
          title: $t('page.protocol.list'),
          // permissionCode: 'agreement:list:view',
        },
      },
    ],
  },
];

export default routes;
