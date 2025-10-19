import type { FormItemType, TabbarProps } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { ElInput } from 'element-plus';

export const formItems: FormItemType[] = [
  {
    label: '关键字',
    tooltip: '支持客户编码',
    component: ElInput,
    key: 'keyword',
  },
];

export const tabbar: TabbarProps[] = [
  {
    label: '全部客户',
    key: 'all',
  },
  {
    label: '未成交',
    key: 'noOk',
  },
  {
    label: '已成交',
    key: 'ok',
  },
  {
    label: '共享给我',
    key: 'sharedMe',
  },
  {
    label: '我共享的',
    key: 'MyShare',
  },
  {
    label: '协同客户',
    key: 'coCustomer',
  },
  {
    label: '自主活动',
    key: 'free',
  },
];

export const columns: ITableColumnProps[] = [
  {
    type: 'selection',
    fixed: 'left',
  },
  {
    label: '编号',
    type: 'index',
    width: 80,
  },
  {
    label: '客户编号',
    prop: 'customerCode',
    sortable: true,
  },
  {
    label: '客户名称',
    prop: 'customerName',
    sortable: true,
  },
  {
    label: '公司名称',
    prop: 'companyName',
    sortable: true,
  },
  {
    label: '职务',
    prop: 'position',
    sortable: true,
  },
  {
    label: '标签',
    prop: 'tag',
    sortable: true,
  },
  {
    label: '已成交次数',
    prop: 'times',
    width: 120,
    sortable: true,
  },
  {
    label: '最近成交时间',
    prop: 'lastTime',
    width: 140,
    sortable: true,
  },
  {
    label: '距最近成交天数',
    prop: 'recent',
    width: 150,
    sortable: true,
  },
  {
    label: '客户级别',
    prop: 'customerLevel',
    sortable: true,
  },
  {
    label: '客户来源',
    prop: 'customerOrigin',
    sortable: true,
  },
  {
    label: '操作',
    prop: 'operator',
    sortable: true,
    fixed: 'right',
  },
];
