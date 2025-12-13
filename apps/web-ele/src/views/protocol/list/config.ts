import type { FormItemType, TabbarProps } from '@vben/types';

import type { IFormItem } from '#/components/common/form/index.vue';
import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { Navigation, Share2, Triangle } from '@vben/icons';
import { VbenSelect } from '@vben-core/shadcn-ui';

export enum MODAL_TYPE {
  CUSTOMER = 'customer',
  INIT = '',
  PROTOCOL = 'protocol',
}

export const formItems: FormItemType[] = [
  {
    label: '协议编号',
    // tooltip:
    //   '支持协议编号/客户编码/客户抬头/联系人/联系手机,或协议编号/客户编号的精准多号查询,编号之间用英文逗号分割(,)',
    key: 'agreementNo',
    props: {
      // placeholder: '请输入协议编号/客户编码/客户抬头/联系人/联系手机',
      placeholder: '请输入协议编号',
    },
  },
  {
    label: '协议标题',
    key: 'agreementTitle',
    props: {
      placeholder: '请输入协议标题',
    },
  },
];

export const tabbar: TabbarProps[] = [
  {
    label: '全部协议',
    key: 'all',
    permissionCode: 'agreement:list:all',
  },
  {
    label: '普通协议',
    key: 'normal',
    permissionCode: 'agreement:list:normal',
  },
  {
    label: '异常协议',
    key: 'abnormal',
    permissionCode: 'agreement:list:abnormal',
  },
];

export const statusTypeMap: Record<string, string> = {
  暂存: 'info',
  已完结: 'success',
  已驳回: 'danger',
};

export const columns: ITableColumnProps[] = [
  {
    label: '编号',
    type: 'index',
    width: 60,
    disabledFilter: true,
  },
  {
    label: '协议编号',
    prop: 'agreementNo',
    sortable: true,
    width: 150,
  },
  {
    label: '客户编号',
    prop: 'customerNo',
    sortable: true,
  },
  {
    label: '客户名称',
    prop: 'customerName',
    sortable: true,
  },
  {
    label: '公司名称',
    prop: 'custTitle',
    sortable: true,
  },
  {
    label: '审核状态',
    prop: 'status',
    sortable: true,
    width: 150,
  },
  // {
  //   label: '工单状况',
  //   prop: 'workOrderStatus',
  //   sortable: true,
  // },
  // {
  //   label: '回款状况',
  //   prop: 'amountStatus',
  //   sortable: true,
  // },
  // {
  //   label: '业绩分配',
  //   prop: 'allocation',
  //   sortable: true,
  // },
  {
    label: '协议金额',
    prop: 'agreementAmount',
    format: (value) => value?.toFixed(2),
    width: 150,
  },
  {
    label: '实收金额',
    prop: 'receivedAmount',
    sortable: true,
    format: (value) => value?.toFixed(2),
    width: 150,
  },
  {
    label: '协议税额',
    prop: 'agreementTax',
    sortable: true,
    format: (value) => value?.toFixed(2),
    width: 150,
  },
  // {
  //   label: '是否开票',
  //   prop: 'hasTicket',
  //   sortable: true,
  // },
  // {
  //   label: '是否修正',
  //   prop: 'hasUpdate',
  //   sortable: true,
  // },
  {
    label: '预算业绩',
    prop: 'budgetPerformance',
    format: (value) => value?.toFixed(2),
    width: 150,
  },
  {
    label: '实际业绩',
    prop: 'actualPerformance',
    sortable: true,
    format: (value) => value?.toFixed(2),
    width: 150,
  },
  // {
  //   label: '到款金额',
  //   prop: 'receivedAmount',
  //   sortable: true,
  // },
  // {
  //   label: '到款时间',
  //   prop: 'timeToAccount',
  //   sortable: true,
  // },
  // {
  //   label: '折扣金额',
  //   prop: 'disacountAmount',
  //   sortable: true,
  // },
  {
    label: '销售成本',
    prop: 'salesCost',
    sortable: true,
    format: (value) => value?.toFixed(2),
    width: 150,
  },
  // {
  //   label: '协议类型',
  //   prop: 'protocolType',
  //   sortable: true,
  // },
  // {
  //   label: '客户抬头',
  //   prop: 'customerHead',
  //   sortable: true,
  // },
  {
    label: '订单备注',
    prop: 'orderRemark',
    sortable: true,
  },
  {
    label: '协议备注',
    prop: 'agreementRemark',
    sortable: true,
  },
  {
    label: '所属人',
    prop: 'username',
  },
  {
    label: '真实名',
    prop: 'realName',
  },
  // {
  //   label: '所属部门',
  //   prop: 'group',
  // },
  // {
  //   label: '部门负责人',
  //   prop: 'leader',
  //   width: 120,
  // },
  // {
  //   label: '所属公司',
  //   prop: 'belongCompany',
  // },
  {
    label: '创建时间',
    prop: 'createTime',
    width: 180,
  },
  {
    label: '更新时间',
    prop: 'updateTime',
    width: 180,
  },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
    disabledFilter: true,
    align: 'center',
  },
];

export const customerFlagMap = {
  share: {
    component: Share2,
    props: {
      class: 'size-3 text-[#f00]',
      fill: '#f00',
    },
  },
  downRed: {
    component: Triangle,
    props: {
      class: 'size-3 text-[#f00] rotate-180',
      fill: '#f00',
    },
  },
  downGreen: {
    component: Triangle,
    props: {
      class: 'size-3 text-[#0f0] rotate-180',
      fill: '#0f0',
    },
  },
  upRed: {
    component: Triangle,
    props: {
      class: 'size-3 text-[#f00]',
      fill: '#f00',
    },
  },
  upGreen: {
    component: Triangle,
    props: {
      class: 'size-3 text-[#0f0]',
      fill: '#0f0',
    },
  },
  coordinated: {
    component: Navigation,
    props: {
      class: 'size-3 text-[#f00]',
      fill: '#f00',
    },
  },
  notCoordinated: {
    component: Navigation,
    props: {
      class: 'size-3 text-[#555b63]',
      fill: '#555b63',
    },
  },
};

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
    component: VbenSelect,
    componentProps: {
      placeholder: '请选择客户来源',
      options: [],
    },
  },
  {
    label: '客户级别',
    prop: 'customerLevel',
    component: VbenSelect,
    componentProps: {
      placeholder: '请选择客户级别',
      options: [],
    },
  },
  {
    label: '客户行业',
    prop: 'customerIndustry',
    component: VbenSelect,
    componentProps: {
      placeholder: '请选择客户行业',
      options: [],
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
    component: VbenSelect,
    componentProps: {
      class: 'w-[200px]',
      placeholder: '请选择/输入标签',
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
    componentProps: {
      placeholder: '请输入备注',
      maxlength: 200,
      'show-word-limit': true,
      type: 'textarea',
    },
  },
];

export const detailColumns: ITableColumnProps[] = [
  { label: '产品名称', prop: 'productName', width: '150' },
  { label: '服务分类', prop: 'categoryName', width: '100' },
  { label: '国家', prop: 'country', width: '100' },
  { label: '售价(元)', prop: 'standardPrice', width: '100' },
  { label: '官费(元)', prop: 'officialFee', width: '100' },
  // { label: '数量(标)', prop: 'quantity', width: '80' },
  // { label: '附加项', prop: 'attachment', width: '300' },
  // { label: '销售额(元)', prop: 'salePrice', width: '100' },
  // { label: '销售业绩(元)', prop: 'performance', width: '120' },
];
