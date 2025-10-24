import type { IFormItem } from '#/components/common/form/index.vue';

import AUpload from '#/components/common/upload/index.vue';

export const modalFormItems: IFormItem[] = [
  {
    label: '报销单号',
    prop: 'number',
    componentProps: {
      placeholder: '请输入报销单号',
      disabled: (form: any) => !!form.id,
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
    prop: 'type',
    componentProps: {
      placeholder: '请输入开户行',
      maxlength: 50,
      'show-word-limit': true,
    },
  },
  {
    label: '报销明细',
    prop: 'details',
    class: 'col-span-2',
  },
  {
    label: '总计',
    prop: 'total',
    component: 'el-input-number',
    componentProps: {
      'controls-position': 'right',
      precision: 2,
      style: {
        width: '220px',
      },
    },
  },
  {
    label: '报销凭证',
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
    label: '备注',
    prop: 'remark',
    class: 'col-span-2',
    component: 'el-input',
    componentProps: {
      placeholder: '请输入备注',
      maxlength: 500,
      'show-word-limit': true,
      type: 'textarea',
    },
  },
];

export const rules = {
  number: [{ required: true, message: '请输入报销单号', trigger: 'blur' }],
  account: [{ required: true, message: '请输入收款账号', trigger: 'blur' }],
  accountName: [
    { required: true, message: '请输入收款账户名称', trigger: 'blur' },
  ],
  type: [{ required: true, message: '请输入开户行', trigger: 'blur' }],
  details: [
    {
      required: true,
      validator: (_: any, value: any, callback: any) => {
        if (!value || value.length === 0) {
          return callback(new Error('请输入报销明细'));
        }
        callback();
      },
    },
  ],
  total: [{ required: true, message: '请输入总计', trigger: 'blur' }],
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
