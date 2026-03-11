import type { IFormItem } from '#/components/common/form/index.vue';

import { getCustomerList } from '#/api/core/customer';
import { getAgreementList } from '#/api/core/protocol';
import ASelect from '#/components/common/select/index.vue';
import AUpload from '#/components/common/upload/index.vue';

export const modalFormItems: IFormItem[] = [
  // {
  //   label: '',
  //   prop: 'title',
  //   class: 'col-span-2',
  // },
  {
    label: '发票单号',
    prop: 'invoiceNo',
    componentProps: {
      placeholder: '请输入发票单号',
      disabled: true,
    },
  },
  {
    label: '开票金额',
    prop: 'invoiceAmount',
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
    label: '抬头类型',
    prop: 'titleType',
    component: ASelect,
    componentProps: {
      placeholder: '请选择抬头类型',
      style: {
        width: '100%',
      },
      options: [
        { label: '个人', value: '个人' },
        { label: '企业', value: '企业' },
        { label: '事业单位', value: '事业单位' },
        { label: '政府机关', value: '政府机关' },
      ],
    },
  },
  {
    label: '发票抬头',
    prop: 'invoiceTitle',
    component: ASelect,
    componentProps: {
      placeholder: '请选择发票抬头',
      style: {
        width: '100%',
      },
      options: [
        {
          label: '深圳市驰威知识产权服务有限公司',
          value: '深圳市驰威知识产权服务有限公司',
        },
        {
          label: '深圳市驰威科创知识产权代理有限公司',
          value: '深圳市驰威科创知识产权代理有限公司',
        },
      ],
    },
  },
  {
    label: '开票类型',
    prop: 'invoiceType',
    component: ASelect,
    componentProps: {
      placeholder: '请选择开票类型',
      style: {
        width: '100%',
      },
      options: [
        { label: '增值税专用发票', value: '增值税专用发票' },
        { label: '增值税普通发票', value: '增值税普通发票' },
        { label: '电子普通发票', value: '电子普通发票' },
      ],
    },
  },
  {
    label: '签约主体抬头',
    prop: 'signTitle',
    component: ASelect,
    componentProps: {
      placeholder: '请选择签约主体抬头',
      style: {
        width: '100%',
      },
      api: () => getCustomerList({ pageSize: 999, pageNum: 1 }),
      afterGetOptions: (data: any) => data.records,
      labelKey: 'companyName',
      valueKey: 'companyName',
    },
  },
  {
    label: '协议编号',
    prop: 'agreementNo',
    component: ASelect,
    componentProps: {
      placeholder: '请选择协议编号',
      style: {
        width: '100%',
      },
      api: () => getAgreementList({ pageSize: 999, pageNum: 1 }),
      afterGetOptions: (data: any) => data.records,
      labelKey: 'agreementNo',
      valueKey: 'agreementNo',
    },
  },
  {
    label: '快递单号',
    prop: 'expressNo',
    componentProps: {
      placeholder: '请输入快递单号',
    },
  },
  {
    label: '电子发票',
    prop: 'electronicInvoice',
    componentProps: {
      placeholder: '请输入电子发票',
    },
  },
  {
    label: '是否含税',
    prop: 'isTaxIncluded',
    component: ASelect,
    componentProps: {
      style: {
        width: '100%',
      },
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
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
      'business-type': 'invoiceManage',
      'has-custom-class': false,
      'hidden-tip': true,
      drag: true,
      class: 'w-full',
    },
  },
];

export const rules = {
  titleType: [{ required: true, message: '请选择抬头类型', trigger: 'change' }],
  invoiceType: [
    { required: true, message: '请选择开票类型', trigger: 'change' },
  ],
  invoiceTitle: [
    { required: true, message: '请选择发票抬头', trigger: 'change' },
  ],
  agreementNo: [
    { required: true, message: '请选择协议编号', trigger: 'change' },
  ],
  invoiceAmount: [
    { required: true, message: '请输入开票金额', trigger: 'blur' },
  ],
  isTaxIncluded: [
    { required: true, message: '请选择是否含税', trigger: 'change' },
  ],
  signTitle: [
    { required: true, message: '请选择签约主体抬头', trigger: 'change' },
  ],
};
