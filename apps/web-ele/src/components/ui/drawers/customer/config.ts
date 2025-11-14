import type { TabbarProps } from '@vben/types';

import type { IComponent } from '../common/type';

import type { IFormItem } from '#/components/common/form/index.vue';
import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { defineAsyncComponent } from 'vue';

export enum CustomerTabEnum {
  // 活动记录
  activityRecord = 'activityRecord',
  // 活动效果
  activityResult = 'activityResult',
  // 商机记录
  businessRecord = 'businessRecord',
  followRecord = 'followRecord',
  // 知产清单
  intellectualProperty = 'intellectualProperty',
  // 发票抬头
  invoiceTitle = 'invoiceTitle',
  // 操作记录
  operatorRecord = 'operatorRecord',
  // 订单记录
  orderRecord = 'orderRecord',
  // 检索记录
  searchRecord = 'searchRecord',
  // 检索统计
  searchStatistics = 'searchStatistics',
  // 共享人员
  share = 'share',
  // 工单记录
  workOrderRecord = 'workOrderRecord',
}

export const drawerFormItems: IFormItem[] = [
  {
    label: '客户编号',
    prop: 'customerNo',
  },
  {
    label: '客户名称',
    prop: 'customerName',
  },
  {
    label: '所属人',
    prop: 'owner',
  },
  {
    label: '公司名称',
    prop: 'companyName',
  },
  {
    label: '职务',
    prop: 'position',
    class: 'col-span-2',
  },
  {
    label: '客户来源',
    prop: 'customerSource',
  },
  {
    label: '客户级别',
    prop: 'customerLevel',
  },
  {
    label: '客户行业',
    prop: 'customerIndustry',
  },
  {
    label: '客户手机',
    prop: 'phone',
  },
  {
    label: '微信/QQ',
    prop: 'wechatQq',
  },
  {
    label: '客户邮箱',
    prop: 'email',
  },
  {
    label: '联系地址',
    prop: 'address',
    class: 'col-span-3',
  },
  {
    label: '标签',
    prop: 'tags',
    class: 'col-span-3',
  },
  // {
  //   label: '可选标签',
  //   prop: 'optionalTags',
  //   class: 'col-span-3',
  // },
  {
    label: '备注',
    prop: 'remark',
    class: 'col-span-3',
  },
];

export const customerTabs = [
  { label: '跟进记录', key: CustomerTabEnum.followRecord },
  { label: '商机记录', key: CustomerTabEnum.businessRecord },
  { label: '订单记录', key: CustomerTabEnum.orderRecord },
  { label: '工单记录', key: CustomerTabEnum.workOrderRecord },
  { label: '知产清单', key: CustomerTabEnum.intellectualProperty },
  { label: '发票抬头', key: CustomerTabEnum.invoiceTitle },
  { label: '共享人员', key: CustomerTabEnum.share },
  { label: '检索记录', key: CustomerTabEnum.searchRecord },
  { label: '检索统计', key: CustomerTabEnum.searchStatistics },
  { label: '活动记录', key: CustomerTabEnum.activityRecord },
  { label: '活动效果', key: CustomerTabEnum.activityResult },
  { label: '操作记录', key: CustomerTabEnum.operatorRecord },
];

export const componentsMap: Record<any, IComponent> = {
  [CustomerTabEnum.followRecord]: {
    component: defineAsyncComponent(
      () => import('../common/FollowUpRecord.vue'),
    ),
  },
  [CustomerTabEnum.share]: {
    component: defineAsyncComponent(() => import('../common/SharePerson.vue')),
    props: {
      showShareToForm: true,
    },
  },
  [CustomerTabEnum.operatorRecord]: {
    component: defineAsyncComponent(
      () => import('../common/OperatorRecord.vue'),
    ),
    props: {
      records: [],
    },
  },
  [CustomerTabEnum.businessRecord]: {
    component: defineAsyncComponent(
      () => import('./components/BusinessRecord.vue'),
    ),
  },
  [CustomerTabEnum.orderRecord]: {
    component: defineAsyncComponent(
      () => import('./components/OrderRecord.vue'),
    ),
  },
  [CustomerTabEnum.workOrderRecord]: {
    component: defineAsyncComponent(
      () => import('./components/WorkOrderRecord.vue'),
    ),
  },
  [CustomerTabEnum.intellectualProperty]: {
    component: defineAsyncComponent(
      () => import('./components/IntellectualProperty.vue'),
    ),
  },
  [CustomerTabEnum.invoiceTitle]: {
    component: defineAsyncComponent(
      () => import('./components/InvoiceTitle.vue'),
    ),
  },
  [CustomerTabEnum.searchStatistics]: {
    component: defineAsyncComponent(
      () => import('./components/SearchStatistics.vue'),
    ),
  },
  [CustomerTabEnum.activityRecord]: {
    component: defineAsyncComponent(
      () => import('./components/ActivityRecord.vue'),
    ),
  },
  [CustomerTabEnum.activityResult]: {
    component: defineAsyncComponent(
      () => import('./components/ActivityResult.vue'),
    ),
  },
  [CustomerTabEnum.searchRecord]: {
    component: defineAsyncComponent(
      () => import('./components/SearchRecord.vue'),
    ),
  },
};

export const businessRecordColumns: ITableColumnProps[] = [
  { type: 'selection', fixed: 'left' },
  { label: '编号', type: 'index', fixed: 'left', width: 60 },
  { label: '商机名称', prop: 'businessName', sortable: true },
  { label: '转化状态', prop: 'status', sortable: true },
  { label: '是否含税', prop: 'hasTax', sortable: true },
  { label: '商机金额', prop: 'amount', sortable: true },
  { label: '预算业绩', prop: 'performance', sortable: true },
  { label: '预成交日期', prop: 'date', sortable: true },
  { label: '备注', prop: 'remark', sortable: true },
  { label: '所属人', prop: 'owner', sortable: true },
  { label: '创建时间', prop: 'createdAt', sortable: true },
  { label: '更新时间', prop: 'updatedAt', sortable: true },
  { label: '操作', prop: 'operator', fixed: 'right' },
];

export const orderRecordColumns: ITableColumnProps[] = [
  { label: '编号', type: 'index', fixed: 'left', width: 60 },
  { label: '协议编号', prop: 'protocolCode', sortable: true },
  { label: '审核状态', prop: 'auditStatus', sortable: true },
  { label: '工单状况', prop: 'workOrder', sortable: true },
  { label: '回款状况', prop: 'collection', sortable: true },
  { label: '业绩分配', prop: 'performanceAllocation', sortable: true },
  { label: '是否含税', prop: 'hasTax', sortable: true },
  { label: '协议金额', prop: 'protocolAmount', sortable: true },
  { label: '实收金额', prop: 'amount', sortable: true },
  { label: '预算业绩', prop: 'preAmount', sortable: true },
  { label: '协议类型', prop: 'protocolType', sortable: true },
  { label: '实际业绩', prop: 'actualPerformance', sortable: true },
  { label: '操作', prop: 'operator', fixed: 'right' },
];

export const workOrderRecordColumns: ITableColumnProps[] = [
  { label: '编号', type: 'index', fixed: 'left', width: 60 },
  { label: '工单编号', prop: 'number', sortable: true },
  { label: '工单类型', prop: 'type', sortable: true },
  { label: '国家', prop: 'country', sortable: true },
  { label: '产品名称', prop: 'productName', sortable: true },
  { label: '协议编号', prop: 'protocolCode', sortable: true },
  { label: '审核状态', prop: 'status', sortable: true },
  { label: '客户确认', prop: 'customerConfirm', sortable: true },
  { label: '接单状态', prop: 'acceptStatus', sortable: true },
  { label: '做单状态', prop: 'orderStatus', sortable: true },
  { label: '结单确认', prop: 'finishConfirm', sortable: true },
  { label: '所属人', prop: 'owner' },
  { label: '真实名', prop: 'username' },
  { label: '所属部门', prop: 'group' },
  { label: '部门负责人', prop: 'leader', width: 110 },
  { label: '所属公司', prop: 'belongCompany' },
  { label: '操作', prop: 'operator', fixed: 'right' },
];

export const intellectualPropertyColumns: ITableColumnProps[] = [
  { label: '编号', type: 'index', fixed: 'left', width: 60 },
  { label: '工单编号', prop: 'number', sortable: true },
  { label: '知识产权类', prop: 'type', sortable: true },
  { label: '国家', prop: 'country', sortable: true },
  { label: '知识产权名', prop: 'name' },
  { label: '回执号', prop: 'receiptNumber' },
  { label: '类目', prop: 'item' },
  { label: '客户确认', prop: 'customerConfirm', sortable: true },
  { label: '备注', prop: 'remark', sortable: true },
];

export const invoiceTitleColumns: ITableColumnProps[] = [
  { type: 'selection', fixed: 'left' },
  { label: '编号', type: 'index', fixed: 'left', width: 60 },
  { label: '抬头类型', prop: 'type' },
  { label: '联系人', prop: 'contact' },
  { label: '联系电话', prop: 'phone', sortable: true },
  { label: '联系地址', prop: 'addr' },
  { label: '开票抬头', prop: 'head', sortable: true },
  { label: '身份证号', prop: 'idcard', sortable: true },
  { label: '纳税人识别号', prop: 'owner', sortable: true },
  { label: '开户银行', prop: 'bank', sortable: true },
  { label: '银行账号', prop: 'account', sortable: true },
  { label: '操作', prop: 'operator', fixed: 'right' },
];

export const searchStatisticsColumns: ITableColumnProps[] = [
  { label: '检索类型', prop: 'type' },
  { label: '未提交', prop: 'uncommit' },
  { label: '已提交', prop: 'commit' },
  { label: '已接单', prop: 'resolve' },
  { label: '驳回', prop: 'reject' },
  { label: '后端暂存', prop: 'backendStack' },
  { label: '已完结', prop: 'finished' },
  { label: '已确认', prop: 'confirm' },
  { label: '小计', prop: 'total' },
];

export const activityRecordColumns: ITableColumnProps[] = [
  { label: '编号', type: 'index', fixed: 'left', width: 60 },
  { label: '活动名称', prop: 'name', sortable: true },
  { label: '活动类型', prop: 'type', sortable: true },
  { label: '活动状态', prop: 'status', sortable: true },
  { label: '开始时间', prop: 'startTime', sortable: true },
  { label: '结束时间', prop: 'endTime', sortable: true },
  { label: '活动地点', prop: 'addr' },
  { label: '活动人数(个)', prop: 'persons', sortable: true },
  { label: '授权邀约人', prop: 'visitors', width: 100 },
  { label: '活动目的', prop: 'purpose' },
  { label: '活动内容', prop: 'content' },
  { label: '活动预期', prop: 'expect' },
  { label: '目标人群', prop: 'targetPerson' },
  { label: '备注', prop: 'remark' },
  { label: '创建人', prop: 'createdBy', sortable: true },
  { label: '真实名', prop: 'username', width: 100 },
  { label: '所属部门', prop: 'group' },
  { label: '部门负责人', prop: 'leader', width: 120 },
  { label: '所属公司', prop: 'company' },
  { label: '创建时间', prop: 'createdTime', sortable: true },
  { label: '创建人', prop: 'createdBy', sortable: true },
  { label: '操作', prop: 'operator', fixed: 'right' },
];

export const activityRecordJoinedColumns: ITableColumnProps[] = [
  { label: '编号', type: 'index', fixed: 'left', width: 60 },
  { label: '', prop: 'flag', width: 60 },
  { label: '活动名称', prop: 'name', sortable: true },
  { label: '活动类型', prop: 'type', sortable: true },
  { label: '活动状态', prop: 'status', sortable: true },
  { label: '参与类型', prop: 'status', sortable: true },
  { label: '是否到场', prop: 'hasLive', sortable: true },
  { label: '到场时间', prop: 'liveTime', sortable: true },
  { label: '是否评价', prop: 'hasEvaluate', sortable: true },
  { label: '评价时间', prop: 'evaluateTime', sortable: true },
  { label: '邀请时间', prop: 'inviteTime', sortable: true },
  { label: '邀请人', prop: 'inviter', sortable: true },
  { label: '操作', prop: 'operator', fixed: 'right' },
];

export const ActivityResultColumns: ITableColumnProps[] = [
  { label: '活动名称', prop: 'name', sortable: true },
  { label: '活动类型', prop: 'type', sortable: true },
  { label: '新增协议数(个)', prop: 'addNumber', sortable: true, width: 150 },
  { label: '已成交协议数(个)', prop: 'dealNumber', sortable: true, width: 160 },
  { label: '协议成交率(%)', prop: 'dealRate', sortable: true, width: 150 },
  { label: '协议总金额(元)', prop: 'totalAmount', sortable: true, width: 150 },
  { label: '可成交业绩(元)', prop: 'canEvaluate', sortable: true, width: 150 },
  { label: '已成交业绩(元)', prop: 'evaluate', sortable: true, width: 150 },
  { label: '待提交数(个)', prop: 'uncommit', sortable: true },
  { label: '提交审核数(个)', prop: 'commit', sortable: true, width: 150 },
  { label: '经理审核数(个)', prop: 'inviter', sortable: true, width: 150 },
];

export const searchRecordTabbar: TabbarProps[] = [
  { label: '商标检索', key: 'brand' },
  { label: '外观专利申请检索', key: 'appearance' },
  { label: '发明/实用新型专利申请检索', key: 'invent' },
  { label: '外观专利风险排查', key: 'risk' },
  { label: '发明/实用侵权分析', key: 'analysis' },
];

export const searchRecordColumns: ITableColumnProps[] = [
  { label: '编号', type: 'index', fixed: 'left', width: 60 },
  { label: '检索编号', prop: 'number', sortable: true },
  { label: '检索状态', prop: 'status', sortable: true },
  { label: '商标类型', prop: 'type', sortable: true },
  { label: '商标文字', prop: 'text', sortable: true },
  { label: '商标图片', prop: 'image', sortable: true },
  { label: '申请大类', prop: 'item', sortable: true },
  { label: '保护产品', prop: 'product', sortable: true },
  { label: '申请国家', prop: 'country', sortable: true },
  { label: '操作', prop: 'operator', fixed: 'right' },
];

export const searchRecordFinishedColumns: ITableColumnProps[] = [
  { label: '编号', type: 'index', fixed: 'left', width: 60 },
  { label: '检索编号', prop: 'number', sortable: true },
  { label: '检索状态', prop: 'status', sortable: true },
  { label: '检索结果', prop: 'result', sortable: true },
  { label: '检索耗时', prop: 'time', sortable: true },
  { label: '总耗时', prop: 'totalTime', sortable: true },
  { label: '商标类型', prop: 'type', sortable: true },
  { label: '商标文字', prop: 'text', sortable: true },
  { label: '商标图片', prop: 'image', sortable: true },
  { label: '申请大类', prop: 'item', sortable: true },
  { label: '保护产品', prop: 'product', sortable: true },
  { label: '申请国家', prop: 'country', sortable: true },
  { label: '操作', prop: 'operator', fixed: 'right' },
];
