import type { IComponent } from '../../common/type';

import type { IFormItem } from '#/components/common/form/index.vue';

import { defineAsyncComponent } from 'vue';

import { orderAttachmentColumns } from '@vben/constants';

export enum ReviewCommentTabEnum {
  attachment = 'attachment',
  detail = 'detail',
  followRecord = 'followRecord',
  operatorRecord = 'operatorRecord',
  protocol = 'protocol',
  share = 'share',
  workOrder = 'workOrder',
}

export const drawerFormItems: IFormItem[] = [
  { label: '异常单号', prop: 'orderNo' },
  { label: '工单状态', prop: 'workStatus' },
  { label: '客户编号', prop: 'customerNo' },
  { label: '协议编号', prop: 'agreementNo' },
  { label: '国家', prop: 'country' },
  { label: '产品名称', prop: 'productName' },
  { label: '所属人', prop: 'username' },
  // { label: '', prop: 'finalStatus', class: 'col-span-4' },
  // { label: '状态', prop: 'status' },
  // { label: '是否完结', prop: 'finished' },
  // { label: '状态备注', prop: 'remark', class: 'col-span-2' },
  // { label: '证书类型', prop: 'type' },
  // { label: '证书附件', prop: 'attachment', class: 'col-span-3' },
];

export const reviewCommentTabs = [
  { label: '异常单详情', key: ReviewCommentTabEnum.detail },
  { label: '异常单附件', key: ReviewCommentTabEnum.attachment },
  { label: '原工单', key: ReviewCommentTabEnum.workOrder },
  { label: '原协议', key: ReviewCommentTabEnum.protocol },
  { label: '跟进记录', key: ReviewCommentTabEnum.followRecord },
  { label: '共享人员', key: ReviewCommentTabEnum.share },
  { label: '操作记录', key: ReviewCommentTabEnum.operatorRecord },
];

export const componentsMap: Record<any, IComponent> = {
  [ReviewCommentTabEnum.followRecord]: {
    component: defineAsyncComponent(
      () => import('../../common/FollowUpRecord.vue'),
    ),
  },
  [ReviewCommentTabEnum.share]: {
    component: defineAsyncComponent(
      () => import('../../common/SharePerson.vue'),
    ),
  },
  [ReviewCommentTabEnum.operatorRecord]: {
    component: defineAsyncComponent(
      () => import('../../common/OperatorRecord.vue'),
    ),
  },
  [ReviewCommentTabEnum.detail]: {
    component: defineAsyncComponent(
      () => import('../../common/WorkOrderDetail.vue'),
    ),
  },
  [ReviewCommentTabEnum.workOrder]: {
    component: defineAsyncComponent(
      () => import('./components/AbnormalWorkOrder.vue'),
    ),
  },
  [ReviewCommentTabEnum.protocol]: {
    component: defineAsyncComponent(
      () => import('./components/AbnormalProtocol.vue'),
    ),
  },
  [ReviewCommentTabEnum.attachment]: {
    component: defineAsyncComponent(
      () => import('../../common/OrderAttachment.vue'),
    ),
    props: {
      columns: orderAttachmentColumns,
    },
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
