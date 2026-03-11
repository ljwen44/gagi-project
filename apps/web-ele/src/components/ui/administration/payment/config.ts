import type { IFormItem } from '#/components/common/form/index.vue';

import AUpload from '#/components/common/upload/index.vue';

export const modalFormItems: IFormItem[] = [
  {
    label: '付款单号',
    prop: 'paymentNo',
    componentProps: {
      placeholder: '请输入付款单号',
      disabled: true,
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
    prop: 'paymentAmount',
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
    prop: 'receiptAccountName',
    componentProps: {
      placeholder: '请输入收款账户名称',
      maxlength: 50,
      'show-word-limit': true,
    },
  },
  {
    label: '收款账号',
    prop: 'receiptAccount',
    componentProps: {
      placeholder: '请输入收款账号',
      maxlength: 50,
      'show-word-limit': true,
    },
  },
  {
    label: '开户行',
    prop: 'bankName',
    componentProps: {
      placeholder: '请输入开户行',
      maxlength: 50,
      'show-word-limit': true,
    },
  },
  {
    label: '申请时间',
    prop: 'applyTime',
    component: 'el-date-picker',
    componentProps: {
      placeholder: '请选择申请时间',
      type: 'datetime',
      'value-format': 'YYYY-MM-DD HH:mm:ss',
      style: {
        width: '100%',
      },
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
  {
    label: '附件',
    prop: 'fileIds',
    class: 'col-span-2',
    component: AUpload,
    componentProps: {
      'business-type': 'paymentApply',
      'has-custom-class': false,
      'hidden-tip': true,
      drag: true,
      class: 'w-full',
    },
  },
];

export const rules = {
  paymentNo: [{ required: true, message: '请输入付款单号', trigger: 'blur' }],
  projectName: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
  paymentAmount: [
    { required: true, message: '请输入付款金额', trigger: 'blur' },
  ],
  receiptAccountName: [
    { required: true, message: '请输入收款账户名称', trigger: 'blur' },
  ],
  receiptAccount: [
    { required: true, message: '请输入收款账号', trigger: 'blur' },
  ],
  bankName: [{ required: true, message: '请输入开户行', trigger: 'blur' }],
  applyTime: [{ required: true, message: '请选择申请时间', trigger: 'change' }],
};
