import type { IFormItem } from '#/components/common/form/index.vue';

import AUpload from '#/components/common/upload/index.vue';

export const modalFormItems: IFormItem[] = [
  {
    label: '付款单号',
    prop: 'number',
    componentProps: {
      placeholder: '请输入付款单号',
      disabled: (form: any) => !!form.id,
    },
  },
  {
    label: '项目名称',
    prop: 'projectName',
    componentProps: {
      placeholder: '请输入项目名称',
      maxlength: 50,
      'show-word-limit': true,
    },
  },
  {
    label: '付款金额 ',
    prop: 'amount',
    component: 'el-input-number',
    componentProps: {
      'controls-position': 'right',
      precision: 2,
      style: {
        width: '100%',
      },
    },
  },
  {
    label: '收款账户名称',
    prop: 'accountName',
    componentProps: {
      placeholder: '请输入收款账户名称',
      maxlength: 50,
      'show-word-limit': true,
    },
  },
  {
    label: '收款账号',
    prop: 'account',
    componentProps: {
      placeholder: '请输入收款账号',
      maxlength: 50,
      'show-word-limit': true,
    },
  },
  {
    label: '开户行',
    prop: 'type',
    componentProps: {
      placeholder: '请输入开户行',
      maxlength: 50,
      'show-word-limit': true,
    },
  },
  {
    label: '合同文件',
    prop: 'attachments',
    class: 'col-span-2',
    component: AUpload,
    componentProps: {
      mutiple: true,
      drag: true,
      class: 'w-full',
    },
  },
  {
    label: '付款说明',
    prop: 'remark',
    class: 'col-span-2',
    component: 'el-input',
    componentProps: {
      placeholder: '请输入付款说明',
      maxlength: 500,
      'show-word-limit': true,
      type: 'textarea',
    },
  },
];

export const rules = {
  number: [{ required: true, message: '请输入付款单号', trigger: 'blur' }],
  projectName: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
  amount: [{ required: true, message: '请输入付款金额', trigger: 'blur' }],
  accountName: [
    { required: true, message: '请输入收款账户名称', trigger: 'blur' },
  ],
  account: [{ required: true, message: '请输入收款账号', trigger: 'blur' }],
  type: [{ required: true, message: '请输入开户行', trigger: 'blur' }],
};
