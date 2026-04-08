import type { IFormItem } from '#/components/common/form/index.vue';

import { ElDatePicker } from 'element-plus';

export const modalFormItems: IFormItem[] = [
  {
    label: '业绩结算日期',
    prop: 'performanceDate',
    component: ElDatePicker,
    class: 'col-span-2',
    componentProps: {
      type: 'datetime',
    },
  },
  {
    label: '订单编号',
    prop: 'orderNo',
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '协议编号',
    prop: 'agreementNo',
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '官费',
    prop: 'officialFee',
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '订单金额',
    prop: 'orderAmount',
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '业绩',
    prop: 'performanceAmount',
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '业务员',
    prop: 'salesmanName',
    componentProps: {
      disabled: true,
    },
  },
];

export const rules = {
  performanceDate: [
    { required: true, message: '请选择业绩结算日期', trigger: 'change' },
  ],
};
