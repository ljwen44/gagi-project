import type { FormItemType, TabbarProps } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

export const MODAL_TYPE = {
  INIT: 'init',
  PROTOCOL: 'protocol',
  CUSTOMER: 'customer',
  REFUND: 'refund',
};

export const formItems: FormItemType[] = [
  {
    label: '关键字',
    key: 'keyword',
    tooltip:
      '支持退款编号/协议编号/客户编号,或退款编号/协议编号/客户编号的精准多号查询,编号之间用英文逗号分割(,)',
    props: {
      placeholder:
        '请输入退款单号,支持多编号精准查询,编号之间用英文逗号分割(,)',
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
    disabledFilter: true,
  },
  {
    label: '退款单号',
    prop: 'number',
    sortable: true,
  },
  {
    label: '协议编号',
    prop: 'protocol',
    sortable: true,
  },
  {
    label: '客户编号',
    prop: 'customerCode',
    sortable: true,
    width: 150,
  },
  {
    label: '退款类型',
    prop: 'type',
    width: 120,
    sortable: true,
  },
  {
    label: '退款金额(元)',
    prop: 'amount',
    sortable: true,
    width: 160,
  },
  {
    label: '审核状态',
    prop: 'status',
    width: 120,
    sortable: true,
  },
  {
    label: '申请人',
    prop: 'apply',
    sortable: true,
  },
  {
    label: '申请时间',
    prop: 'time',
    width: 140,
    sortable: true,
  },
  {
    label: '真实名',
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
    disabledFilter: true,
  },
];
