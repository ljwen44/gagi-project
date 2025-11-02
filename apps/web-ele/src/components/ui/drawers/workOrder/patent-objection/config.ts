import type { IComponent } from '../../common/type';

import type { IFormItem } from '#/components/common/form/index.vue';
import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { defineAsyncComponent } from 'vue';

export enum PatentObjectionTabEnum {
  attachment = 'attachment',
  confirm = 'confirm',
  detail = 'detail',
  followRecord = 'followRecord',
  operatorRecord = 'operatorRecord',
  protocol = 'protocol',
  share = 'share',
}

export const drawerFormItems: IFormItem[] = [
  { label: '工单编号', prop: 'number' },
  { label: '工单类型', prop: 'type' },
  { label: '工单状态', prop: 'status', class: 'col-span-2' },
  { label: '客户编号', prop: 'customerCode' },
  { label: '协议编号', prop: 'protocolCode', class: 'col-span-3' },
  { label: '国家', prop: 'country' },
  { label: '产品名称', prop: 'productName' },
  { label: '所属人', prop: 'owner', class: 'col-span-2' },
  { label: '', prop: 'finalStatus', class: 'col-span-4' },
  { label: '状态', prop: 'status' },
  { label: '是否完结', prop: 'finished' },
  { label: '状态备注', prop: 'remark', class: 'col-span-2' },
  { label: '证书类型', prop: 'type' },
  { label: '证书附件', prop: 'attachment', class: 'col-span-3' },
];

export const patentObjectionTabs = [
  { label: '工单详情', key: PatentObjectionTabEnum.detail },
  { label: '工单确认书', key: PatentObjectionTabEnum.confirm },
  { label: '工单附件', key: PatentObjectionTabEnum.attachment },
  { label: '关联协议', key: PatentObjectionTabEnum.protocol },
  { label: '跟进记录', key: PatentObjectionTabEnum.followRecord },
  { label: '共享人员', key: PatentObjectionTabEnum.share },
  { label: '操作记录', key: PatentObjectionTabEnum.operatorRecord },
];

export const componentsMap: Record<any, IComponent> = {
  [PatentObjectionTabEnum.followRecord]: {
    component: defineAsyncComponent(
      () => import('../../common/FollowUpRecord.vue'),
    ),
  },
  [PatentObjectionTabEnum.share]: {
    component: defineAsyncComponent(
      () => import('../../common/SharePerson.vue'),
    ),
  },
  [PatentObjectionTabEnum.operatorRecord]: {
    component: defineAsyncComponent(
      () => import('../../common/OperatorRecord.vue'),
    ),
    props: {
      records: [],
    },
  },
  [PatentObjectionTabEnum.detail]: {
    component: defineAsyncComponent(
      () => import('./components/OrderDetail.vue'),
    ),
  },
  [PatentObjectionTabEnum.confirm]: {
    component: defineAsyncComponent(
      () => import('./components/OrderConfirm.vue'),
    ),
  },
  [PatentObjectionTabEnum.attachment]: {
    component: defineAsyncComponent(
      () => import('./components/OrderAttachment.vue'),
    ),
  },
  [PatentObjectionTabEnum.protocol]: {
    component: defineAsyncComponent(
      () => import('./components/ProtocolTable.vue'),
    ),
  },
};

export const detailFormItems: IFormItem[] = [
  { label: '目标申请号/注册号 ', prop: 'targetRegister', class: 'col-span-2' },
  { label: '说明', prop: 'description', class: 'col-span-2' },
];

export const orderConfirmColumns: ITableColumnProps[] = [
  { label: '编号', type: 'index', fixed: 'left', width: 60 },
  { label: '确认书名称', prop: 'name' },
  { label: '确认书阶段', prop: 'stage' },
  { label: '确认书来源', prop: 'origin' },
  { label: '文件大小', prop: 'size' },
  { label: '上传时间', prop: 'time' },
  { label: '操作', prop: 'operator', fixed: 'right' },
];

export const orderAttachmentColumns: ITableColumnProps[] = [
  { label: '编号', type: 'index', fixed: 'left', width: 60 },
  { label: '文件名称', prop: 'name' },
  { label: '文件类型', prop: 'type' },
  { label: '文件大小', prop: 'size' },
  { label: '上传人', prop: 'user' },
  { label: '上传时间', prop: 'time' },
  { label: '操作', prop: 'operator', fixed: 'right' },
];

export const protocolDetailColumns: ITableColumnProps[] = [
  { label: '产品名称', prop: 'productName' },
  { label: '服务分类', prop: 'servieType' },
  { label: '国家', prop: 'country' },
  { label: '售价(元)', prop: 'price' },
  { label: '官费(元)', prop: 'fee' },
  { label: '数量(标)', prop: 'quantities' },
  { label: '附加项', prop: 'attach' },
  { label: '销售额(元)', prop: 'sale' },
  { label: '销售业绩(元)', prop: 'performance' },
];

export const abnormalOrderColumns: ITableColumnProps[] = [
  { label: '编号', type: 'index', width: 60 },
  { label: '异常单号', prop: 'number', sortable: true },
  { label: '客户名称', prop: 'customerName', sortable: true },
  { label: '客户编号', prop: 'customerCode', sortable: true },
  { label: '协议编号', prop: 'protocolCode', sortable: true },
  { label: '客户确认', prop: 'customerConfirm', sortable: true },
  { label: '接单状态', prop: 'orderStatus', sortable: true },
  { label: '做单状态', prop: 'acceptStatus', sortable: true },
  { label: '结单确认', prop: 'confirm', sortable: true },
  { label: '处理方式', prop: 'method', sortable: true },
  { label: '所属人', prop: 'username' },
  { label: '真实名', prop: 'username' },
  { label: '所属部门', prop: 'group' },
  { label: '部门负责人', prop: 'leader', width: 100 },
  { label: '所属公司', prop: 'belongCompany' },
  { label: '主做单人', prop: 'owner', sortable: true },
  { label: '创建人', prop: 'createdBy', sortable: true },
  { label: '创建时间', prop: 'createdTime', sortable: true },
  { label: '操作', prop: 'operator', fixed: 'right' },
];
