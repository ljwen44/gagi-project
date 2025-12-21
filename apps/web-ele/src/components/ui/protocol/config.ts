import type { FormItemType } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { countries } from '#/assets/constant/countries';
import ASelect from '#/components/common/select/index.vue';

export const rules = {
  agreementTitle: [
    { required: true, message: '请选择协议抬头', trigger: 'change' },
  ],
  agreementType: [
    { required: true, message: '请选择协议类型', trigger: 'change' },
  ],
  signTitle: [{ required: true, message: '请输入签约抬头', trigger: 'blur' }],
  agreementAmount: [
    { required: true, message: '请输入协议金额', trigger: 'blur' },
  ],
  receivedAmount: [
    { required: true, message: '请输入实收金额', trigger: 'blur' },
  ],
  budgetPerformance: [
    { required: true, message: '请输入预算业绩', trigger: 'blur' },
  ],
  actualPerformance: [
    { required: true, message: '请输入实际业绩', trigger: 'blur' },
  ],
  agreementCost: [
    { required: true, message: '请输入协议成本', trigger: 'blur' },
  ],
  agreementTax: [
    { required: true, message: '请输入协议税费', trigger: 'blur' },
  ],
};

export const protocolProductColumns: ITableColumnProps[] = [
  { label: '产品名称', prop: 'productName' },
  { label: '服务分类', prop: 'categoryName' },
  { label: '国家', prop: 'country' },
  {
    label: '官费(元)',
    prop: 'officialFee',
    format: (value) => value?.toFixed(2),
  },
  {
    label: '售价(元)',
    prop: 'standardPrice',
    format: (value) => value?.toFixed(2),
  },
  {
    label: '服务价格',
    prop: 'serviceItems',
    format: (_, data) =>
      (
        data.selectServiceItems?.reduce((acc: number, cur: string) => {
          const item = data.serviceItems?.find((i: any) => i.itemName === cur);
          return acc + (item?.itemPrice || 0);
        }, 0) || 0
      ).toFixed(2),
  },
  {
    label: '服务费用',
    prop: 'serviceCost',
    format: (_, data) =>
      (
        data.selectServiceItems?.reduce((acc: number, cur: string) => {
          const item = data.serviceItems?.find((i: any) => i.itemName === cur);
          return acc + (item?.itemCost || 0);
        }, 0) || 0
      ).toFixed(2),
  },
  // { label: '数量(标)', prop: 'number' },
  // { label: '附加项', prop: 'extra' },
  { label: '操作', prop: 'operator', fixed: 'right', align: 'center' },
];

export const agreementTypeOptions = [
  { label: '普通协议', value: 'normal' },
  { label: '异常协议', value: 'abnormal' },
];

export const productColumns: ITableColumnProps[] = [
  {
    type: 'selection',
    width: 60,
  },
  {
    label: '编号',
    type: 'index',
    width: 60,
  },
  {
    label: '产品编号',
    prop: 'productNo',
    sortable: true,
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
    format: (value: number) => (value ? '是' : '否'),
  },
  {
    label: '是否认证',
    prop: 'isNotarized',
    sortable: true,
    format: (value: number) => (value ? '是' : '否'),
  },
  {
    label: '标准售价(元)',
    prop: 'standardPrice',
    sortable: true,
    format: (value: number) => value?.toFixed(2),
  },
  {
    label: '官费(元)',
    prop: 'officialFee',
    sortable: true,
    format: (value: number) => value?.toFixed(2),
  },
  {
    label: '额外服务项',
    prop: 'serviceItems',
    fixed: 'right',
    width: 240,
  },
];

export const formItems: FormItemType[] = [
  {
    label: '国家',
    key: 'country',
    width: 36,
    component: ASelect,
    props: {
      placeholder: '请输入',
      options: countries,
      filterable: true,
    },
  },
  {
    label: '产品名称',
    key: 'productName',
    props: {
      placeholder: '请输入产品名称',
    },
  },
];
