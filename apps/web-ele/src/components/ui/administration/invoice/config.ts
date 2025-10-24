import type { IFormItem } from '#/components/common/form/index.vue';

import { VbenSelect } from '@vben-core/shadcn-ui';

export const modalFormItems: IFormItem[] = [
  {
    label: '',
    prop: 'title',
    class: 'col-span-2',
  },
  {
    label: '抬头类型',
    prop: 'type',
    component: VbenSelect,
    componentProps: {
      placeholder: '请选择抬头类型',
      options: [],
    },
  },
  {
    label: '开票抬头',
    prop: 'head',
    componentProps: {
      placeholder: '请输入开票抬头',
      maxlength: 50,
      'show-word-limit': true,
    },
  },
  {
    label: '开户银行',
    prop: 'bank',
    componentProps: {
      placeholder: '请输入开户银行',
      maxlength: 50,
      'show-word-limit': true,
    },
  },
  {
    label: '银行账号',
    prop: 'bankAccount',
    componentProps: {
      placeholder: '请输入银行账号',
      maxlength: 50,
      'show-word-limit': true,
    },
  },
  {
    label: '地址',
    prop: 'addr',
    componentProps: {
      placeholder: '请输入地址',
      maxlength: 255,
      'show-word-limit': true,
    },
  },
  {
    label: '电话',
    prop: 'phone',
    componentProps: {
      placeholder: '请输入电话',
      maxlength: 20,
      'show-word-limit': true,
    },
  },
  {
    label: '',
    prop: 'syncCustomerInfo',
    class: 'col-span-2',
  },
  {
    label: '联系人',
    prop: 'contact',
    componentProps: {
      placeholder: '请输入联系人',
      maxlength: 20,
      'show-word-limit': true,
    },
  },
  {
    label: '手机号',
    prop: 'telephone',
    componentProps: {
      placeholder: '请输入手机号',
    },
  },
  {
    label: '邮箱',
    prop: 'email',
    componentProps: {
      placeholder: '请输入邮箱',
    },
  },
  {
    label: '详细地址',
    prop: 'address',
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
  type: [{ required: true, message: '请选择抬头类型', trigger: 'change' }],
  head: [{ required: true, message: '请输入开票抬头', trigger: 'blur' }],
  contact: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
  telephone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  address: [
    {
      required: true,
      validator: (_: any, value: any, callback: any) => {
        if (!value?.city || !value?.area) {
          return callback(new Error('请完善详细地址'));
        }
        callback();
      },
    },
  ],
};
