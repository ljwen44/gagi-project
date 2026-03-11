import type { IFormItem } from '#/components/common/form/index.vue';

import AUpload from '#/components/common/upload/index.vue';

export const modalFormItems: IFormItem[] = [
  {
    label: '报销单号',
    prop: 'reimbursementNo',
    componentProps: {
      placeholder: '请输入报销单号',
      disabled: true,
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
    label: '收款账户名称',
    prop: 'accountName',
    componentProps: {
      placeholder: '请输入收款账户名称',
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
    label: '报销金额',
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
    label: '报销时间',
    prop: 'reimbursementTime',
    component: 'el-date-picker',
    componentProps: {
      placeholder: '请选择报销时间',
      type: 'datetime',
      'value-format': 'YYYY-MM-DD HH:mm:ss',
      style: {
        width: '100%',
      },
    },
  },
  {
    label: '备注',
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
      'business-type': 'reimbursement',
      'has-custom-class': false,
      'hidden-tip': true,
      drag: true,
      class: 'w-full',
    },
  },
];

export const rules = {
  reimbursementNo: [
    { required: true, message: '请输入报销单号', trigger: 'blur' },
  ],
  receiptAccount: [
    { required: true, message: '请输入收款账号', trigger: 'blur' },
  ],
  accountName: [
    { required: true, message: '请输入收款账户名称', trigger: 'blur' },
  ],
  bankName: [{ required: true, message: '请输入开户行', trigger: 'blur' }],
  // details: [
  //   {
  //     required: true,
  //     validator: (_: any, value: any, callback: any) => {
  //       if (!value || value.length === 0) {
  //         return callback(new Error('请输入报销明细'));
  //       }
  //       callback();
  //     },
  //   },
  // ],
  amount: [{ required: true, message: '请输入报销金额', trigger: 'blur' }],
  reimbursementTime: [
    { required: true, message: '请选择报销时间', trigger: 'change' },
  ],
};

export const detailColumns = [
  {
    label: '编号',
    prop: 'number',
  },
  {
    label: '报销类型',
    prop: 'type',
  },
  {
    label: '发生日期',
    prop: 'date',
  },
  {
    label: '报销金额(元)',
    prop: 'amount',
  },
  {
    label: '报销说明',
    prop: 'desc',
  },
  {
    label: '操作',
    prop: 'operator',
  },
];
