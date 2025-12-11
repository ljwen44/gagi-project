import type { IFormItem } from '#/components/common/form/index.vue';

import { getCategoryList } from '#/api/core/product';
import { countries } from '#/assets/constant/countries';
import ARadio from '#/components/common/radio/index.vue';
import ASelect from '#/components/common/select/index.vue';

export const modalFormItems: IFormItem[] = [
  {
    label: '产品编号',
    prop: 'productNo',
    componentProps: {
      placeholder: '请输入产品编号',
      disabled: true,
    },
  },
  {
    label: '产品名称',
    prop: 'productName',
    componentProps: {
      placeholder: '请输入产品名称',
    },
  },
  {
    label: '国家',
    prop: 'country',
    component: ASelect,
    componentProps: {
      placeholder: '请输入国家',
      options: countries,
      filterable: true,
      style: {
        width: '100%',
      },
    },
  },
  {
    label: '服务分类',
    prop: 'categoryId',
    component: ASelect,
    componentProps: {
      placeholder: '请输入服务分类',
      api: getCategoryList,
      labelKey: 'categoryName',
      valueKey: 'id',
      style: {
        width: '100%',
      },
    },
  },
  {
    label: '官费(元)',
    prop: 'officialFee',
    component: 'el-input-number',
    componentProps: {
      placeholder: '请输入官费',
      'controls-position': 'right',
      style: 'width: 100%',
      precision: 2,
      min: 0,
    },
  },
  {
    label: '标准售价(元)',
    prop: 'standardPrice',
    component: 'el-input-number',
    componentProps: {
      placeholder: '请输入标准售价',
      'controls-position': 'right',
      style: 'width: 100%',
      precision: 2,
      min: 0,
    },
  },
  {
    label: '是否认证',
    prop: 'isCertified',
    class: 'col-span-2',
    component: ARadio,
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
  },
  {
    label: '是否公证',
    prop: 'isNotarized',
    component: ARadio,
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
  },
];

export const rules = {
  productNo: [{ required: true, message: '请输入产品编号', trigger: 'blur' }],
  productName: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
  country: [{ required: true, message: '请输入国家', trigger: 'blur' }],
  categoryId: [{ required: true, message: '请输入服务分类', trigger: 'blur' }],
  officialFee: [{ required: true, message: '请输入官费', trigger: 'blur' }],
  standardPrice: [
    { required: true, message: '请输入标准售价', trigger: 'blur' },
  ],
};
