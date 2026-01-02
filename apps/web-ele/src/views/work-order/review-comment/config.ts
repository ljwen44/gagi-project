import type { FormItemType } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { countries } from '#/assets/constant/countries';
import ASelect from '#/components/common/select/index.vue';

export const formItems: FormItemType[] = [
  {
    label: '国家',
    key: 'keyword',
    width: 36,
    component: ASelect,
    props: {
      placeholder: '请选择',
      options: countries,
      filterable: true,
    },
  },
  {
    label: '关键字',
    tooltip:
      '支持客户编号/协议编号/异常单号模糊查询,或任一类型编号的精准多号查询,编号之间用英文逗号分割(,)',
    key: 'keyword',
    props: {
      placeholder: '客户编号/协议编号/异常单号',
      class: 'w-[220px]',
    },
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
    label: '工单编号',
    prop: 'orderNo',
    sortable: true,
  },
  {
    label: '回执时间',
    prop: 'time',
    sortable: true,
  },
  {
    label: '异常原因',
    prop: 'reason',
    sortable: true,
  },
  {
    label: '截止时间',
    prop: 'ddl',
    sortable: true,
  },
  {
    label: '处理方式',
    prop: 'handle',
    sortable: true,
  },
  {
    label: '不处理原因',
    prop: 'noHandleReason',
    sortable: true,
  },
  {
    label: '不支付原因',
    prop: 'noPayReason',
    sortable: true,
  },
  {
    label: '客户编号',
    prop: 'customerNo',
    sortable: true,
  },
  {
    label: '协议编号',
    prop: 'agreementNo',
    sortable: true,
  },
  {
    label: '国家',
    prop: 'country',
    sortable: true,
  },
  // {
  //   label: '操作',
  //   prop: 'operator',
  //   fixed: 'right',
  //   disabledFilter: true,
  // },
];
