import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:package',
      order: 5,
      title: $t('page.product.title'),
      permissionCode: 'product:view',
    },
    name: 'Product',
    path: '/product',
    children: [
      {
        name: 'ProductView',
        path: '/product/view',
        component: () => import('#/views/product/view/index.vue'),
        meta: {
          icon: 'lucide:shopping-bag',
          title: $t('page.product.view'),
          permissionCode: 'product:list:view',
        },
      },
    ],
  },
];

export default routes;
