import type { IComponent } from '../common/type';

import type { IFormItem } from '#/components/common/form/index.vue';
import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { defineAsyncComponent } from 'vue';

export enum ProtocolTabEnum {
  allocationRecord = 'allocationRecord',
  amountRecord = 'amountRecord',
  file = 'file',
  followRecord = 'followRecord',
  invoice = 'invoice',
  operatorRecord = 'operatorRecord',
  protocol = 'protocol',
  share = 'share',
  workOrderRecord = 'workOrderRecord',
}

export const protocolFormItems: IFormItem[] = [
  {
    label: '协议编号',
    prop: 'agreementNo',
  },
  {
    label: '协议抬头',
    prop: 'pHead',
  },
  {
    label: '协议类型',
    prop: 'pType',
  },
  {
    label: '客户编号',
    prop: 'customerNo',
  },
  {
    label: '客户名称',
    prop: 'customerName',
  },
  {
    label: '签约抬头',
    prop: 'head',
  },
  {
    label: '联系人',
    prop: 'contact',
  },
  {
    label: '联系电话',
    prop: 'phone',
  },
  {
    label: '联系地址',
    prop: 'addr',
  },
  {
    label: '协议金额',
    prop: 'agreementAmount',
  },
  {
    label: '实收金额',
    prop: 'receivedAmount',
  },
  {
    label: '协议成本',
    prop: 'pCost',
  },
  {
    label: '是否含税',
    prop: 'hasTax',
  },
  {
    label: '税率',
    prop: 'tax',
  },
  {
    label: '协议税费',
    prop: 'agreementTax',
  },
  {
    label: '预算业绩',
    prop: 'budgetPerformance',
  },
  {
    label: '实际业绩',
    prop: 'actualPerformance',
  },
  {
    label: '业绩分配',
    prop: 'performanceAllocation',
  },
  {
    label: '销售成本',
    prop: 'salesCost',
    class: 'col-span-3',
  },
  {
    label: '已回款',
    prop: 'returned',
  },
  {
    label: '未回款',
    prop: 'unReturen',
    class: 'col-span-2',
  },
  {
    label: '所属人',
    prop: 'owner',
  },
  {
    label: '签订日期',
    prop: 'date',
  },
  {
    label: '到款时间',
    prop: 'time',
  },
  {
    label: '真实名',
    prop: 'realName',
  },
  {
    label: '所属部门',
    prop: 'dept',
  },
  {
    label: '所属公司',
    prop: 'company',
  },
];

export const protocolTabs = [
  { label: '协议内容', key: ProtocolTabEnum.protocol },
  { label: '合同文件', key: ProtocolTabEnum.file },
  { label: '工单记录', key: ProtocolTabEnum.workOrderRecord },
  { label: '回款记录', key: ProtocolTabEnum.amountRecord },
  { label: '发票记录', key: ProtocolTabEnum.invoice },
  { label: '分配记录', key: ProtocolTabEnum.allocationRecord },
  { label: '跟进记录', key: ProtocolTabEnum.followRecord },
  { label: '共享人员', key: ProtocolTabEnum.share },
  { label: '操作记录', key: ProtocolTabEnum.operatorRecord },
];

export const protocolDetailColumns: ITableColumnProps[] = [
  {
    label: '产品名称',
    prop: 'productName',
  },
  {
    label: '服务分类',
    prop: 'servieType',
  },
  {
    label: '国家',
    prop: 'country',
  },
  {
    label: '售价(元)',
    prop: 'price',
  },
  {
    label: '官费(元)',
    prop: 'fee',
  },
  {
    label: '数量(标)',
    prop: 'quantities',
  },
  {
    label: '附加项',
    prop: 'attach',
  },
  {
    label: '销售额(元)',
    prop: 'sale',
  },
  {
    label: '销售业绩(元)',
    prop: 'performance',
  },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
  },
];

export const fileColumns: ITableColumnProps[] = [
  {
    label: '编号',
    prop: 'number',
    fixed: 'left',
  },
  {
    label: '协议名称',
    prop: 'name',
  },
  {
    label: '协议阶段',
    prop: 'stage',
  },
  {
    label: '协议来源',
    prop: 'origin',
  },
  {
    label: '文件大小',
    prop: 'size',
  },
  {
    label: '上传时间',
    prop: 'time',
  },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
    width: 80,
    align: 'center',
  },
];

export const workOrderColumns: ITableColumnProps[] = [
  {
    label: '编号',
    type: 'index',
    width: 60,
  },
  {
    label: '工单编号',
    prop: 'number',
    sortable: true,
  },
  {
    label: '工单类型',
    prop: 'type',
    sortable: true,
  },
  {
    label: '审核状态',
    prop: 'status',
    sortable: true,
  },
  {
    label: '接单状态',
    prop: 'acceptStatus',
    sortable: true,
  },
  {
    label: '做单状态',
    prop: 'orderStatus',
    sortable: true,
  },
  {
    label: '结单确认',
    prop: 'finishConfirm',
    sortable: true,
  },
  {
    label: '国家',
    prop: 'country',
    sortable: true,
  },
  {
    label: '产品名称',
    prop: 'productName',
    sortable: true,
  },
  {
    label: '所属人',
    prop: 'username',
  },
  {
    label: '主做单人',
    prop: 'owner',
    sortable: true,
  },
  {
    label: '创建人',
    prop: 'createdBy',
    sortable: true,
  },
  {
    label: '创建时间',
    prop: 'createdTime',
    sortable: true,
  },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
    align: 'center',
  },
];

export const collectionRecordColumns: ITableColumnProps[] = [
  {
    label: '编号',
    type: 'index',
    width: 60,
    fixed: 'right',
  },
  {
    label: '回款编号',
    prop: 'number',
    sortable: true,
  },
  {
    label: '回款金额',
    prop: 'type',
    sortable: true,
  },
  {
    label: '回款方式',
    prop: 'acceptStatus',
    sortable: true,
  },
  {
    label: '回款时间',
    prop: 'time',
    sortable: true,
  },
  {
    label: '是否确认',
    prop: 'hasConfirm',
    sortable: true,
  },
  {
    label: '凭证编号',
    prop: 'voucherNumber',
    sortable: true,
  },
  {
    label: '凭证图',
    prop: 'voucherPic',
    sortable: true,
  },
  {
    label: '凭证文件',
    prop: 'voucherFile',
    sortable: true,
  },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
    align: 'center',
  },
];

export const allocationRecordColumns: ITableColumnProps[] = [
  {
    label: '编号',
    type: 'index',
    width: 60,
  },
  {
    label: '姓名',
    prop: 'name',
    sortable: true,
  },
  {
    label: '分配金额',
    prop: 'amount',
    sortable: true,
  },
  {
    label: '是否主单人',
    prop: 'isOwner',
    sortable: true,
    align: 'center',
    width: 120,
  },
  {
    label: '所属部门',
    prop: 'dept',
  },
  {
    label: '部门负责人',
    prop: 'leader',
  },
  {
    label: '所属公司',
    prop: 'company',
  },
];

export const invoiceColumns: ITableColumnProps[] = [
  { label: '编号', type: 'index', width: 60 },
  { label: '发票单号', prop: 'number' },
  { label: '开票类型', prop: 'type' },
  { label: '审核状态', prop: 'status' },
  { label: '开票抬头', prop: 'head' },
  { label: '抬头类型', prop: 'headType' },
  { label: '申请人', prop: 'apply' },
  { label: '申请时间', prop: 'time' },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
    align: 'center',
    width: 80,
  },
];

export const componentsMap: Record<any, IComponent> = {
  [ProtocolTabEnum.protocol]: {
    component: defineAsyncComponent(
      () => import('./components/ProtocolTable.vue'),
    ),
  },
  [ProtocolTabEnum.file]: {
    component: defineAsyncComponent(() => import('./components/FileTable.vue')),
  },
  [ProtocolTabEnum.workOrderRecord]: {
    component: defineAsyncComponent(
      () => import('./components/WorkOrderTable.vue'),
    ),
  },
  [ProtocolTabEnum.amountRecord]: {
    component: defineAsyncComponent(
      () => import('./components/CollectionTable.vue'),
    ),
  },
  [ProtocolTabEnum.allocationRecord]: {
    component: defineAsyncComponent(
      () => import('./components/AllocationTable.vue'),
    ),
  },
  [ProtocolTabEnum.followRecord]: {
    component: defineAsyncComponent(
      () => import('../common/FollowUpRecord.vue'),
    ),
  },
  [ProtocolTabEnum.share]: {
    component: defineAsyncComponent(() => import('../common/SharePerson.vue')),
  },
  [ProtocolTabEnum.operatorRecord]: {
    component: defineAsyncComponent(
      () => import('../common/OperatorRecord.vue'),
    ),
    props: {
      records: [],
    },
  },
  [ProtocolTabEnum.invoice]: {
    component: defineAsyncComponent(() => import('./components/Invoice.vue')),
  },
};
