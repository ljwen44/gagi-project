import type { IFormItem } from '#/components/common/form/index.vue';

import ASelect from '#/components/common/select/index.vue';

export const modalFormItems: IFormItem[] = [
  {
    label: '客户编号',
    prop: 'customerNo',
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
    prop: 'companyName',
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
    prop: 'customerSource',
    component: ASelect,
    componentProps: {
      placeholder: '请选择客户来源',
      options: [
        { label: '线上推广', value: '线上推广' },
        { label: '线下推广', value: '线下推广' },
        { label: '朋友介绍', value: '朋友介绍' },
      ],
      width: '100%',
    },
  },
  {
    label: '客户级别',
    prop: 'customerLevel',
    component: ASelect,
    componentProps: {
      placeholder: '请选择客户级别',
      options: [
        { label: '普通客户', value: '普通客户' },
        { label: 'VIP', value: 'VIP' },
      ],
      width: '100%',
    },
  },
  {
    label: '客户行业',
    prop: 'customerIndustry',
    component: ASelect,
    componentProps: {
      placeholder: '请选择客户行业',
      options: [
        { label: '互联网', value: '互联网' },
        { label: '房地产', value: '房地产' },
        { label: '农业', value: '农业' },
      ],
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
    prop: 'phone',
    componentProps: {
      placeholder: '请输入客户手机',
    },
  },
  {
    label: '微信/QQ',
    prop: 'wechatQq',
    componentProps: {
      placeholder: '请输入微信/QQ',
    },
  },
  {
    label: '详细地址',
    prop: 'detailAddress',
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
      multiple: true,
      filterable: true,
      'allow-create': true,
      'collapse-tags': true,
      'collapse-tags-tooltip': true,
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
  customerNo: [
    { required: true, message: '客户编号不能为空', trigger: 'blur' },
  ],
  customerName: [
    { required: true, message: '请输入客户名称', trigger: 'blur' },
  ],
  customerSource: [
    { required: true, message: '请选择客户来源', trigger: 'change' },
  ],
  customerLevel: [
    { required: true, message: '请选择客户级别', trigger: 'change' },
  ],
  phone: [
    {
      required: true,
      trigger: 'blur',
      validator: (_: any, value: any, cb: any) => {
        if (!value) {
          return cb(new Error('请输入客户手机'));
        }
        const phoneReg = /^1[3-9]\d{9}$/;
        if (!phoneReg.test(value)) {
          return cb(new Error('请输入正确的手机号码'));
        }
        return cb();
      },
    },
  ],
  email: [
    {
      trigger: 'blur',
      validator: (_: any, value: any, cb: any) => {
        const emailReg = /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        if (value && !emailReg.test(value)) {
          return cb(new Error('请输入正确的邮箱格式'));
        }
        return cb();
      },
    },
  ],
};
