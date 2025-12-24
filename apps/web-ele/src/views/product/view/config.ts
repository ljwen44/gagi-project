import type { FormItemType } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { countries } from '#/assets/constant/countries';
import ASelect from '#/components/common/select/index.vue';

export const formItems: FormItemType[] = [
  {
    label: '国家',
    key: 'country',
    // width: 36,
    component: ASelect,
    props: {
      placeholder: '请选择',
      options: countries,
      filterable: true,
    },
  },
  {
    label: '产品编号',
    key: 'productNo',
    // tooltip:
    //   '支持产品编号/产品名称,或产品编号/产品名称的精准多号查询,编号之间用英文逗号分割(,)',
    props: {
      placeholder: '请输入产品编号',
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
    label: '产品编号',
    prop: 'productNo',
    sortable: true,
    disabledFilter: true,
  },
  {
    label: '服务分类',
    prop: 'categoryName',
    sortable: true,
  },
  {
    label: '国家',
    prop: 'country',
    width: 120,
    sortable: true,
    disabledFilter: true,
  },
  {
    label: '产品名称',
    prop: 'productName',
    width: 140,
    sortable: true,
  },
  {
    label: '是否公证',
    prop: 'isCertified',
    sortable: true,
    disabledFilter: true,
  },
  {
    label: '是否认证',
    prop: 'isNotarized',
    sortable: true,
    disabledFilter: true,
  },
  // {
  //   label: '标准售价(元)',
  //   prop: 'standardPrice',
  //   sortable: true,
  //   disabledFilter: true,
  //   format: (value: number) => value?.toFixed(2),
  // },
  // {
  //   label: '官费(元)',
  //   prop: 'officialFee',
  //   sortable: true,
  //   disabledFilter: true,
  //   format: (value: number) => value?.toFixed(2),
  // },
  // {
  //   label: '备注',
  //   prop: 'remark',
  // },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
    disabledFilter: true,
    align: 'center',
  },
];
