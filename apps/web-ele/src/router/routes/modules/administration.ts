import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:briefcase',
      order: 7,
      title: $t('page.administration.title'),
    },
    name: 'Administration',
    path: '/administration',
    children: [
      {
        name: 'AdministrationReimbursement',
        path: '/administration/reimbursement',
        component: () =>
          import('#/views/administration/reimbursement/index.vue'),
        meta: {
          icon: 'lucide:receipt',
          title: $t('page.administration.reimbursement'),
        },
      },
      {
        name: 'AdministrationPayment',
        path: '/administration/payment',
        component: () => import('#/views/administration/payment/index.vue'),
        meta: {
          icon: 'lucide:send',
          title: $t('page.administration.payment'),
        },
      },
      {
        name: 'AdministrationRest',
        path: '/administration/rest',
        component: () => import('#/views/administration/rest/index.vue'),
        meta: {
          icon: 'lucide:calendar-plus',
          title: $t('page.administration.rest'),
        },
      },
      {
        name: 'AdministrationRefund',
        path: '/administration/refund',
        component: () => import('#/views/administration/refund/index.vue'),
        meta: {
          icon: 'lucide:undo',
          title: $t('page.administration.refund'),
        },
      },
      {
        name: 'AdministrationInvoice',
        path: '/administration/invoice',
        component: () => import('#/views/administration/invoice/index.vue'),
        meta: {
          icon: 'lucide:file-spreadsheet',
          title: $t('page.administration.invoice'),
        },
      },
    ],
  },
];

export default routes;
