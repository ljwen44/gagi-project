import type { FormItemType, TabbarProps } from '@vben/types';

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
    tooltip: '其他人共享给我的',
  },
  {
    label: '我共享的',
    key: 'MyShare',
    tooltip: '我共享出去的',
  },
  {
    label: '协同客户',
    key: 'coCustomer',
    tooltip: '渠道客户通过协同来的',
  },
  {
    label: '自主活动',
    key: 'free',
    tooltip:
      '开启自动流转公海规则,且按系统配置设置的提醒日期天数为过滤条件\n公司自主组织的活动获得的新增客户',
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
  // {
  //   label: '客户标识',
  //   prop: 'customerFlag',
  //   width: 40,
  // },
  {
    label: '客户编号',
    prop: 'customerNo',
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
    prop: 'tags',
    sortable: true,
  },
  // {
  //   label: '是否公海客户',
  //   prop: 'isPublicSea',
  //   sortable: true,
  // },
  // {
  //   label: '已成交次数',
  //   prop: 'times',
  //   sortable: true,
  // },
  // {
  //   label: '最近成交时间',
  //   prop: 'lastTime',
  //   sortable: true,
  // },
  // {
  //   label: '距最近成交天数',
  //   prop: 'recent',
  //   width: 150,
  //   sortable: true,
  // },
  {
    label: '客户级别',
    prop: 'customerLevel',
    sortable: true,
  },
  {
    label: '客户来源',
    prop: 'customerSource',
    sortable: true,
  },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
    disabledFilter: true,
    align: 'center',
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
