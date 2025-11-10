import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:user',
      order: 1,
      title: $t('page.person.title'),
      permissionCode: 'profile:view',
    },
    name: 'PersonCenter',
    path: '/profile',
    children: [
      {
        name: 'PersonCenterTodoTasks',
        path: '/profile/todo',
        component: () => import('#/views/person/todo/index.vue'),
        meta: {
          icon: 'lucide:list-todo',
          title: $t('page.person.todoTasks'),
          permissionCode: 'profile:todo:view',
        },
      },
      {
        name: 'PersonCenterWarningRemind',
        path: '/profile/remind',
        component: () => import('#/views/person/remind/index.vue'),
        meta: {
          icon: 'lucide:bell-ring',
          title: $t('page.person.warningRemind'),
        },
      },
    ],
  },
];

export default routes;
