import type { IComponent } from '../../common/type';

import type { IFormItem } from '#/components/common/form/index.vue';

import { defineAsyncComponent } from 'vue';

export enum AbnormalWorkOrderEnum {
  attachment = 'attachment',
  detail = 'detail',
  followRecord = 'followRecord',
  operatorRecord = 'operatorRecord',
  protocol = 'protocol',
  share = 'share',
  workOrder = 'workOrder',
}

export const drawerFormItems: IFormItem[] = [
  { label: '异常单号', prop: 'number' },
  { label: '工单状态', prop: 'status' },
  { label: '客户编号', prop: 'customerCode' },
  { label: '协议编号', prop: 'protocolCode' },
  { label: '国家', prop: 'country' },
  { label: '产品名称', prop: 'productName' },
  { label: '所属人', prop: 'owner' },
];

export const abnormalWorkOrderTabs = [
  { label: '异常单详情', key: AbnormalWorkOrderEnum.detail },
  { label: '异常单附件', key: AbnormalWorkOrderEnum.attachment },
  { label: '原工单', key: AbnormalWorkOrderEnum.workOrder },
  { label: '原协议', key: AbnormalWorkOrderEnum.protocol },
  { label: '跟进记录', key: AbnormalWorkOrderEnum.followRecord },
  { label: '共享人员', key: AbnormalWorkOrderEnum.share },
  { label: '操作记录', key: AbnormalWorkOrderEnum.operatorRecord },
];

export const componentsMap: Record<any, IComponent> = {
  [AbnormalWorkOrderEnum.followRecord]: {
    component: defineAsyncComponent(
      () => import('../../common/FollowUpRecord.vue'),
    ),
  },
  [AbnormalWorkOrderEnum.share]: {
    component: defineAsyncComponent(
      () => import('../../common/SharePerson.vue'),
    ),
  },
  [AbnormalWorkOrderEnum.operatorRecord]: {
    component: defineAsyncComponent(
      () => import('../../common/OperatorRecord.vue'),
    ),
    props: {
      records: [],
    },
  },
  [AbnormalWorkOrderEnum.detail]: {
    component: defineAsyncComponent(
      () => import('./components/AbnormalDetail.vue'),
    ),
  },
  [AbnormalWorkOrderEnum.workOrder]: {
    component: defineAsyncComponent(
      () => import('./components/AbnormalWorkOrder.vue'),
    ),
  },
  [AbnormalWorkOrderEnum.protocol]: {
    component: defineAsyncComponent(
      () => import('./components/AbnormalProtocol.vue'),
    ),
  },
  [AbnormalWorkOrderEnum.attachment]: {
    component: defineAsyncComponent(
      () => import('./components/AbnormalAttachment.vue'),
    ),
  },
};

export const detailFormItems: IFormItem[] = [
  { label: '异常原因', prop: 'reason' },
  { label: '处理方案', prop: 'plan' },
  { label: '推荐产品', prop: 'recommendProduct' },
  { label: '截止日期', prop: 'deadline' },
  { label: '说明', prop: 'description' },
  { label: '处理方式', prop: 'method' },
];
