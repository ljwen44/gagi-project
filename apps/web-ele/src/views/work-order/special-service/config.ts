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
      '支持客户编号/协议编号/工单编号模糊查询,或任一类型编号的精准多号查询,编号之间用英文逗号分割(,)',
    key: 'keyword',
    props: {
      placeholder: '客户编号/协议编号/工单编号',
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
  {
    label: '说明',
    prop: 'desc',
    sortable: true,
  },
  {
    label: '所属人',
    prop: 'username',
    sortable: true,
  },
  {
    label: '真实名',
    prop: 'realName',
    width: 100,
  },
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
    label: '创建时间',
    prop: 'createTime',
  },
  // {
  //   label: '操作',
  //   prop: 'operator',
  //   fixed: 'right',
  //   disabledFilter: true,
  // },
];
