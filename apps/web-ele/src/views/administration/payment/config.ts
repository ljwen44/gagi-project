import type { FormItemType, TabbarProps } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { ElInput } from 'element-plus';

export const formItems: FormItemType[] = [
  {
    label: '付款单号',
    component: ElInput,
    key: 'keyword',
    props: {
      placeholder:
        '请输入付款单号,支持多编号精准查询,编号之间用英文逗号分割(,)',
    },
  },
];

export const tabbar: TabbarProps[] = [
  {
    label: '全部',
    key: 'all',
  },
  {
    label: '明途总部',
    key: 'head',
  },
  {
    label: '明途厦门',
    key: 'xiamen',
  },
  {
    label: '明途宁波',
    key: 'ningbo',
  },
  {
    label: '明途泉州',
    key: 'quanzhou',
  },
];

export const columns: ITableColumnProps[] = [
  {
    label: '编号',
    type: 'index',
    width: 60,
  },
  {
    label: '付款单号',
    prop: 'number',
    sortable: true,
  },
  {
    label: '项目名称',
    prop: 'project',
    sortable: true,
  },
  {
    label: '付款金额(元)',
    prop: 'amount',
    sortable: true,
    width: 150,
  },
  {
    label: '审核状态',
    prop: 'status',
    width: 120,
    sortable: true,
  },
  {
    label: '收款账户名称',
    prop: 'name',
    sortable: true,
    width: 160,
  },
  {
    label: '收款账号',
    prop: 'account',
    sortable: true,
  },
  {
    label: '开户行',
    prop: 'type',
    sortable: true,
  },
  {
    label: '申请时间',
    prop: 'time',
    width: 140,
    sortable: true,
  },
  {
    label: '姓名',
    prop: 'username',
    width: 100,
  },
  {
    label: '所属部门',
    prop: 'group',
  },
  {
    label: '部门负责人',
    prop: 'leader',
    width: 120,
  },
  {
    label: '所属公司',
    prop: 'company',
  },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
  },
];
