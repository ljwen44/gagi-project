import type { IFormItem } from '#/components/common/form/index.vue';

import ASelect from '#/components/common/select/index.vue';

export const modalFormItems: IFormItem[] = [
  {
    label: '客户编号',
    prop: 'customerNo',
    componentProps: {
      placeholder: '请输入客户编号',
      disabled: true,
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
        { label: '行业展会', value: '行业展会' },
        { label: '供应商大会', value: '供应商大会' },
        { label: '客户转介绍', value: '客户转介绍' },
        { label: '行业协会推荐', value: '行业协会推荐' },
        { label: '线上招商平台', value: '线上招商平台' },
        { label: '线下拜访', value: '线下拜访' },
        { label: '行业峰会', value: '行业峰会' },
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
        { label: '钻石', value: '钻石' },
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
        { label: '物流', value: '物流' },
        { label: '零售', value: '零售' },
        { label: '新能源', value: '新能源' },
        { label: '餐饮', value: '餐饮' },
        { label: '文旅', value: '文旅' },
        { label: '医疗健康', value: '医疗健康' },
        { label: '制造业', value: '制造业' },
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

export const mockTags = [
  { label: '大宗运输', value: '大宗运输' },
  { label: '区域合作', value: '区域合作' },
  { label: '快消品', value: '快消品' },
  { label: '全国连锁', value: '全国连锁' },
  { label: '技术合作', value: '技术合作' },
  { label: '研发项目', value: '研发项目' },
  { label: '连锁品牌', value: '食材采购' },
  { label: '团队游', value: '团队游' },
  { label: '长期合作', value: '长期合作' },
  { label: '紧急需求', value: '紧急需求' },
];
