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
    },
    name: 'PersonCenter',
    path: '/person',
    children: [
      {
        name: 'PersonCenterTodoTasks',
        path: '/person/todo',
        component: () => import('#/views/person/todo/index.vue'),
        meta: {
          icon: 'lucide:list-todo',
          title: $t('page.person.todoTasks'),
        },
      },
      {
        name: 'PersonCenterWarningRemind',
        path: '/person/remind',
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
