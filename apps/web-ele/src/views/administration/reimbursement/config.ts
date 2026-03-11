import type { FormItemType, TabbarProps } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

export const formItems: FormItemType[] = [
  // {
  //   label: '报销单号',
  //   key: 'keyword',
  //   props: {
  //     placeholder:
  //       '请输入报销单号,支持多编号精准查询,编号之间用英文逗号分割(,)',
  //   },
  // },
];

export const tabbar: TabbarProps[] = [
  // {
  //   label: '全部',
  //   key: 'all',
  // },
  // {
  //   label: '明途总部',
  //   key: 'head',
  // },
  // {
  //   label: '明途厦门',
  //   key: 'xiamen',
  // },
  // {
  //   label: '明途宁波',
  //   key: 'ningbo',
  // },
  // {
  //   label: '明途泉州',
  //   key: 'quanzhou',
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
    label: '报销单号',
    prop: 'reimbursementNo',
    sortable: true,
    width: 230,
  },
  {
    label: '报销金额(元)',
    prop: 'amount',
    sortable: true,
    format: (value: number) => value?.toFixed(2),
  },
  {
    label: '收款账号',
    prop: 'receiptAccount',
    sortable: true,
  },
  {
    label: '账户名称',
    prop: 'accountName',
    sortable: true,
  },
  {
    label: '开户行',
    prop: 'bankName',
    sortable: true,
  },
  {
    label: '审核状态',
    prop: 'status',
    width: 120,
  },
  {
    label: '报销时间',
    prop: 'reimbursementTime',
    width: 160,
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
    width: 160,
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: 160,
  },
  // {
  //   label: '姓名',
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
  //   width: 100,
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
