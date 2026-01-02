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
      permissionCode: 'admin:view',
      // hideInMenu: true,
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
          icon: 'lucide:hand-coins',
          title: $t('page.administration.reimbursement'),
          permissionCode: 'admin:expense:view',
        },
      },
      {
        name: 'AdministrationPayment',
        path: '/administration/payment',
        component: () => import('#/views/administration/payment/index.vue'),
        meta: {
          icon: 'lucide:send',
          title: $t('page.administration.payment'),
          permissionCode: 'admin:payment:view',
        },
      },
      {
        name: 'AdministrationRest',
        path: '/administration/rest',
        component: () => import('#/views/administration/rest/index.vue'),
        meta: {
          icon: 'lucide:calendar-plus',
          title: $t('page.administration.rest'),
          permissionCode: 'admin:leave:view',
        },
      },
      {
        name: 'AdministrationRefund',
        path: '/administration/refund',
        component: () => import('#/views/administration/refund/index.vue'),
        meta: {
          icon: 'lucide:undo',
          title: $t('page.administration.refund'),
          permissionCode: 'admin:refund:view',
        },
      },
      {
        name: 'AdministrationInvoice',
        path: '/administration/invoice',
        component: () => import('#/views/administration/invoice/index.vue'),
        meta: {
          icon: 'lucide:file-spreadsheet',
          title: $t('page.administration.invoice'),
          permissionCode: 'admin:invoice:view',
        },
      },
    ],
  },
];

export default routes;
