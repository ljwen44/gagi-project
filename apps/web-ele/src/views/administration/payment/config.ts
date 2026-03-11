import type { FormItemType, TabbarProps } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

export const formItems: FormItemType[] = [];

export const tabbar: TabbarProps[] = [];

export const columns: ITableColumnProps[] = [
  {
    label: '编号',
    type: 'index',
    width: 60,
    disabledFilter: true,
  },
  {
    label: '付款单号',
    prop: 'paymentNo',
    sortable: true,
    width: 230,
  },
  {
    label: '项目名称',
    prop: 'projectName',
    sortable: true,
  },
  {
    label: '付款金额(元)',
    prop: 'paymentAmount',
    sortable: true,
    width: 150,
    format: (value: number) => value?.toFixed(2),
  },
  {
    label: '审核状态',
    prop: 'status',
    width: 120,
    sortable: true,
  },
  {
    label: '收款账户名称',
    prop: 'receiptAccountName',
    sortable: true,
    width: 160,
  },
  {
    label: '收款账号',
    prop: 'receiptAccount',
    sortable: true,
  },
  {
    label: '开户行',
    prop: 'bankName',
    sortable: true,
  },
  {
    label: '申请时间',
    prop: 'applyTime',
    width: 180,
  },
  {
    label: '备注',
    prop: 'remark',
    width: 140,
    sortable: false,
  },
  {
    label: '创建人',
    prop: 'createBy',
    sortable: true,
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: 160,
  },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
    disabledFilter: true,
  },
];
