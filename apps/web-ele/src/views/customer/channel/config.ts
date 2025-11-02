import type { FormItemType } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { Navigation, Share2, Triangle } from '@vben/icons';

export const formItems: FormItemType[] = [
  {
    label: '关键字',
    tooltip:
      '支持客户编码/手机/客户名称/公司名称/职务/标签,或客户编号的精准多号查询,编号之间用英文逗号分割(,)',
    key: 'keyword',
    props: {
      placeholder: '请输入客户编码/手机/客户名称/公司名称/职务/标签',
    },
  },
];

export const columns: ITableColumnProps[] = [
  {
    type: 'selection',
    disabledFilter: true,
  },
  {
    label: '编号',
    type: 'index',
    width: 60,
    disabledFilter: true,
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
    label: '客户级别',
    prop: 'customerLevel',
    sortable: true,
  },
  {
    label: '客户行业',
    prop: 'customerIndustry',
    sortable: true,
  },
  {
    label: '省份',
    prop: 'province',
    sortable: true,
  },
  {
    label: '城市',
    prop: 'city',
    sortable: true,
  },
  {
    label: '县区',
    prop: 'area',
    sortable: true,
  },
  {
    label: '详细地址',
    prop: 'addr',
  },
  {
    label: '备注',
    prop: 'remark',
  },
  {
    label: '创建人',
    prop: 'createdBy',
    sortable: true,
  },
  {
    label: '创建时间',
    prop: 'createdAt',
    sortable: true,
  },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
    disabledFilter: true,
  },
];

export const customerFlagMap = {
  share: {
    component: Share2,
    props: {
      class: 'size-3 text-[#f00]',
      fill: '#f00',
    },
  },
  downRed: {
    component: Triangle,
    props: {
      class: 'size-3 text-[#f00] rotate-180',
      fill: '#f00',
    },
  },
  downGreen: {
    component: Triangle,
    props: {
      class: 'size-3 text-[#0f0] rotate-180',
      fill: '#0f0',
    },
  },
  upRed: {
    component: Triangle,
    props: {
      class: 'size-3 text-[#f00]',
      fill: '#f00',
    },
  },
  upGreen: {
    component: Triangle,
    props: {
      class: 'size-3 text-[#0f0]',
      fill: '#0f0',
    },
  },
  coordinated: {
    component: Navigation,
    props: {
      class: 'size-3 text-[#f00]',
      fill: '#f00',
    },
  },
  notCoordinated: {
    component: Navigation,
    props: {
      class: 'size-3 text-[#555b63]',
      fill: '#555b63',
    },
  },
};
