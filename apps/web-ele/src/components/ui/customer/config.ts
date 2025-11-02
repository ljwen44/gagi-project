import type { IFormItem } from '#/components/common/form/index.vue';

import ASelect from '#/components/common/select/index.vue';

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
    component: ASelect,
    componentProps: {
      placeholder: '请选择客户来源',
      options: [],
      width: '100%',
    },
  },
  {
    label: '客户级别',
    prop: 'customerLevel',
    component: ASelect,
    componentProps: {
      placeholder: '请选择客户级别',
      options: [],
      width: '100%',
    },
  },
  {
    label: '客户行业',
    prop: 'customerIndustry',
    component: ASelect,
    componentProps: {
      placeholder: '请选择客户行业',
      options: [],
      width: '100%',
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
    component: ASelect,
    componentProps: {
      placeholder: '请选择/输入标签',
      options: [],
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
    component: 'el-input',
    componentProps: {
      placeholder: '请输入备注',
      maxlength: 200,
      'show-word-limit': true,
      type: 'textarea',
    },
  },
];

export const rules = {
  customerName: [
    { required: true, message: '请输入客户名称', trigger: 'blur' },
  ],
  customerOrigin: [
    { required: true, message: '请选择客户来源', trigger: 'change' },
  ],
  customerLevel: [
    { required: true, message: '请选择客户级别', trigger: 'change' },
  ],
  customerPhone: [
    { required: true, message: '请输入客户手机', trigger: 'blur' },
  ],
};
