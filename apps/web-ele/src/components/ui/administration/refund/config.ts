import type { IFormItem } from '#/components/common/form/index.vue';

import { getCustomerList } from '#/api/core/customer';
import { getAgreementList } from '#/api/core/protocol';
import ASelect from '#/components/common/select/index.vue';

export const modalFormItems: IFormItem[] = [
  {
    label: '退款单号',
    prop: 'refundNo',
    componentProps: {
      placeholder: '请输入退款单号',
      disabled: true,
    },
  },
  {
    label: '退款类型',
    prop: 'refundType',
    component: ASelect,
    componentProps: {
      placeholder: '请选择退款类型',
      style: {
        width: '100%',
      },
      options: [
        { label: '全部退款', value: '全部退款' },
        { label: '部分退款', value: '部分退款' },
      ],
    },
  },
  {
    label: '客户编号',
    prop: 'customerNo',
    component: ASelect,
    componentProps: {
      placeholder: '请选择客户编号',
      style: {
        width: '100%',
      },
      api: () => getCustomerList({ pageSize: 999, pageNum: 1 }),
      afterGetOptions: (data: any) => data.records,
      labelKey: 'customerNo',
      valueKey: 'customerNo',
    },
  },
  {
    label: '协议编号',
    prop: 'agreementNo',
    component: ASelect,
    componentProps: {
      placeholder: '请输入协议编号',
      style: {
        width: '100%',
      },
      api: () => getAgreementList({ pageSize: 999, pageNum: 1 }),
      afterGetOptions: (data: any) => data.records,
      labelKey: 'agreementNo',
      valueKey: 'agreementNo',
    },
  },
  {
    label: '退款金额',
    prop: 'refundAmount',
    component: 'el-input-number',
    componentProps: {
      'controls-position': 'right',
      precision: 2,
      style: {
        width: '100%',
      },
    },
  },
];

export const rules = {
  refundType: [
    { required: true, message: '请选择退款类型', trigger: 'change' },
  ],
  refundAmount: [
    { required: true, message: '请输入退款金额', trigger: 'blur' },
  ],
  customerNo: [
    { required: true, message: '请选择客户编号', trigger: 'change' },
  ],
  agreementNo: [
    { required: true, message: '请选择协议编号', trigger: 'change' },
  ],
};
