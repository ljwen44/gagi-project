import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:clipboard-list',
      order: 4,
      title: $t('page.work.title'),
      permissionCode: 'workorder:view',
    },
    name: 'WorkOrder',
    path: '/work-order',
    children: [
      {
        name: 'WorkOrderList',
        path: '/list',
        meta: {
          icon: 'lucide:list',
          title: $t('page.work.list'),
          permissionCode: 'workorder:all:view',
        },
        children: [
          {
            name: 'WorkOrderAllList',
            path: '/work-order/all',
            component: () => import('#/views/work-order/all-list/index.vue'),
            meta: {
              icon: 'lucide:archive',
              title: $t('page.work.allList'),
            },
          },
        ],
      },
      {
        name: 'WorkOrderAbnormal',
        path: '/work-order/abnormal',
        component: () => import('#/views/work-order/abnormal/index.vue'),
        meta: {
          icon: 'lucide:alert-triangle',
          title: $t('page.work.abnormal'),
          permissionCode: 'workorder:abnormal:view',
        },
      },
      {
        name: 'WorkOrderQuery',
        path: '/query',
        meta: {
          icon: 'lucide:search',
          title: $t('page.work.query'),
          permissionCode: 'workorder:query:view',
        },
        children: [
          {
            name: 'WorkOrderBrandRegister',
            path: '/work-order/brand-register',
            component: () =>
              import('#/views/work-order/brand-register/index.vue'),
            meta: {
              icon: 'lucide:copyright',
              title: $t('page.work.brandRegister'),
              permissionCode: 'workorder:query:view',
            },
          },
          {
            name: 'WorkOrderPatentApply',
            path: '/work-order/patent-apply',
            component: () =>
              import('#/views/work-order/patent-apply/index.vue'),
            meta: {
              icon: 'lucide:file-plus-2',
              title: $t('page.work.patentApply'),
              permissionCode: 'workorder:query:view',
            },
          },
          {
            name: 'WorkOrderCopyRightRegistration',
            path: '/work-order/copyright-registration',
            component: () =>
              import('#/views/work-order/copyright-registration/index.vue'),
            meta: {
              icon: 'lucide:book-marked',
              title: $t('page.work.copyRightRegistration'),
              permissionCode: 'workorder:query:view',
            },
          },
          {
            name: 'WorkOrderPatentUpdate',
            path: '/work-order/patent-update',
            component: () =>
              import('#/views/work-order/patent-update/index.vue'),
            meta: {
              icon: 'lucide:file-cog',
              title: $t('page.work.patentUpdate'),
              permissionCode: 'workorder:query:view',
            },
          },
          {
            name: 'WorkOrderBrandUpdate',
            path: '/work-order/brand-update',
            component: () =>
              import('#/views/work-order/brand-update/index.vue'),
            meta: {
              icon: 'lucide:refresh-ccw',
              title: $t('page.work.brandUpdate'),
              permissionCode: 'workorder:query:view',
            },
          },
          {
            name: 'WorkOrderBrandObjection',
            path: '/work-order/brand-objection',
            component: () =>
              import('#/views/work-order/brand-objection/index.vue'),
            meta: {
              icon: 'lucide:swords',
              title: $t('page.work.brandObjection'),
              permissionCode: 'workorder:query:view',
            },
          },
          {
            name: 'WorkOrderPatentObjection',
            path: '/work-order/patent-objection',
            component: () =>
              import('#/views/work-order/patent-objection/index.vue'),
            meta: {
              icon: 'lucide:message-square-warning',
              title: $t('page.work.patentObjection'),
              permissionCode: 'workorder:query:view',
            },
          },
          {
            name: 'WorkOrderBrandRenewal',
            path: '/work-order/brand-renewal',
            component: () =>
              import('#/views/work-order/brand-renewal/index.vue'),
            meta: {
              icon: 'lucide:calendar-clock',
              title: $t('page.work.brandRenewal'),
              permissionCode: 'workorder:query:view',
            },
          },
          {
            name: 'WorkOrderSpecialService',
            path: '/work-order/special-service',
            component: () =>
              import('#/views/work-order/special-service/index.vue'),
            meta: {
              icon: 'lucide:sparkles',
              title: $t('page.work.specialService'),
              permissionCode: 'workorder:query:view',
            },
          },
          {
            name: 'WorkOrderReviewComment',
            path: '/work-order/review-comment',
            component: () =>
              import('#/views/work-order/review-comment/index.vue'),
            meta: {
              icon: 'lucide:clipboard-edit',
              title: $t('page.work.reviewComment'),
              permissionCode: 'workorder:query:view',
            },
          },
        ],
      },
      {
        name: 'WorkOrderFollowUp',
        path: '/work-order/follow-up',
        component: () => import('#/views/work-order/follow-up/index.vue'),
        meta: {
          icon: 'lucide:phone-forwarded',
          title: $t('page.work.wordOrderFollowUp'),
        },
      },
    ],
  },
];

export default routes;
