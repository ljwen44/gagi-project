import type { FormItemType } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

export const formItems: FormItemType[] = [
  // {
  //   label: '请假单号',
  //   key: 'keyword',
  //   props: {
  //     placeholder:
  //       '请输入请假单号,支持多编号精准查询,编号之间用英文逗号分割(,)',
  //   },
  // },
];

export const columns: ITableColumnProps[] = [
  {
    label: '编号',
    type: 'index',
    width: 60,
    disabledFilter: true,
  },
  {
    label: '请假单号',
    prop: 'leaveNo',
    sortable: true,
    width: 230,
  },
  {
    label: '请假性质',
    prop: 'leaveNature',
    sortable: true,
  },
  {
    label: '审核状态',
    prop: 'status',
    width: 120,
    sortable: true,
  },
  {
    label: '开始时间',
    prop: 'startTime',
    width: 180,
    sortable: true,
  },
  {
    label: '截止时间',
    prop: 'endTime',
    width: 180,
    sortable: true,
  },
  {
    label: '请假天数(天)',
    prop: 'leaveDays',
    width: 140,
    sortable: true,
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
  // {
  //   label: '申请人',
  //   prop: 'apply',
  //   width: 100,
  //   sortable: true,
  // },
  // {
  //   label: '申请时间',
  //   prop: 'applyTime',
  //   sortable: true,
  // },
  // {
  //   label: '真实名',
  //   prop: 'username',
  //   width: 120,
  // },
  // {
  //   label: '所属部门',
  //   prop: 'group',
  // },
  // {
  //   label: '部门负责人',
  //   prop: 'leader',
  //   width: 120,
  // },
  // {
  //   label: '所属公司',
  //   prop: 'company',
  // },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
    disabledFilter: true,
  },
];
