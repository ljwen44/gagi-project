import type { FormItemType, TabbarProps } from '@vben/types';

import type { IFormItem } from '#/components/common/form/index.vue';
import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { Navigation, Share2, Triangle } from '@vben/icons';
import { VbenSelect } from '@vben-core/shadcn-ui';

export const formItems: FormItemType[] = [
  {
    label: '关键字',
    tooltip:
      '支持协议编号/客户编码/客户抬头/联系人/联系手机,或协议编号/客户编号的精准多号查询,编号之间用英文逗号分割(,)',
    key: 'keyword',
  },
];

export const tabbar: TabbarProps[] = [
  {
    label: '全部协议',
    key: 'all',
  },
  {
    label: '普通协议',
    key: 'normal',
  },
  {
    label: '异常协议',
    key: 'abnormal',
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
    label: '协议编号',
    prop: 'protocolNumber',
    sortable: true,
    width: 180,
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
    label: '审核状态',
    prop: 'status',
    sortable: true,
  },
  {
    label: '工单状况',
    prop: 'workOrderStatus',
    sortable: true,
  },
  {
    label: '回款状态',
    prop: 'amountStatus',
    sortable: true,
  },
  {
    label: '业绩分配',
    prop: 'allocation',
    sortable: true,
  },
  {
    label: '协议金额',
    prop: 'protocolAmount',
  },
  {
    label: '实收金额',
    prop: 'amount',
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

export const modalFormItems: IFormItem[] = [
  {
    label: '客户编号',
    prop: 'customerCode',
    componentProps: {
      placeholder: '请输入客户编号',
    },
  },
  {
    label: '客户名称',
    prop: 'customerName',
    componentProps: {
      placeholder: '请输入客户名称',
      maxlength: 50,
      'show-word-limit': true,
    },
  },
  {
    label: '公司名称',
    prop: 'company',
    componentProps: {
      placeholder: '请输入公司名称',
      maxlength: 100,
      'show-word-limit': true,
    },
  },
  {
    label: '职务',
    prop: 'position',
    componentProps: {
      placeholder: '请输入职务',
      maxlength: 50,
      'show-word-limit': true,
    },
  },
  {
    label: '客户来源',
    prop: 'customerOrigin',
    component: VbenSelect,
    componentProps: {
      placeholder: '请选择客户来源',
      options: [],
    },
  },
  {
    label: '客户级别',
    prop: 'customerLevel',
    component: VbenSelect,
    componentProps: {
      placeholder: '请选择客户级别',
      options: [],
    },
  },
  {
    label: '客户行业',
    prop: 'customerIndustry',
    component: VbenSelect,
    componentProps: {
      placeholder: '请选择客户行业',
      options: [],
    },
  },
  {
    label: '客户邮箱',
    prop: 'email',
    componentProps: {
      placeholder: '请输入客户邮箱',
    },
  },
  {
    label: '客户手机',
    prop: 'customerPhone',
    componentProps: {
      placeholder: '请输入客户手机',
    },
  },
  {
    label: '微信/QQ',
    prop: 'contact',
    componentProps: {
      placeholder: '请输入微信/QQ',
    },
  },
  {
    label: '详细地址',
    prop: 'address',
    class: 'col-span-2',
  },
  {
    label: '标签',
    prop: 'tags',
    class: 'col-span-2',
    component: VbenSelect,
    componentProps: {
      class: 'w-[200px]',
      placeholder: '请选择/输入标签',
    },
  },
  {
    label: '可选标签',
    prop: 'optionalTags',
    class: 'col-span-2',
  },
  {
    label: '备注',
    prop: 'remark',
    class: 'col-span-2',
    componentProps: {
      placeholder: '请输入备注',
      maxlength: 200,
      'show-word-limit': true,
      type: 'textarea',
    },
  },
];
