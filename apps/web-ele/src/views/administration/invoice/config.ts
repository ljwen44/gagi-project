import type { FormItemType } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

export const MODAL_TYPE = {
  INIT: 'init',
  PROTOCOL: 'protocol',
  INVOICE: 'invoice',
};

export const formItems: FormItemType[] = [
  {
    label: '关键字',
    key: 'keyword',
    tooltip:
      '支持发票编号/协议编号/开票抬头/纳税人识别号/身份证号码/收件人名称/收件人手机/收件人邮箱,或发票编号/协议编号的精准多号查询,编号之间用英文逗号分割(,)',
    props: {
      placeholder:
        '请输入发票单号,支持多编号精准查询,编号之间用英文逗号分割(,)',
    },
  },
];

export const columns: ITableColumnProps[] = [
  {
    label: '编号',
    type: 'index',
    width: 60,
    disabledFilter: true,
  },
  {
    label: '发票单号',
    prop: 'number',
    sortable: true,
  },
  {
    label: '关联协议',
    prop: 'protocol',
    sortable: true,
  },
  {
    label: '签约抬头',
    prop: 'title',
    sortable: true,
    width: 150,
  },
  {
    label: '开票类型',
    prop: 'type',
    width: 120,
    sortable: true,
  },
  {
    label: '审核状态',
    prop: 'status',
    width: 120,
    sortable: true,
  },
  {
    label: '开票抬头',
    prop: 'title1',
    sortable: true,
    width: 150,
  },
  {
    label: '抬头类型',
    prop: 'titleType',
    sortable: true,
    width: 150,
  },
  {
    label: '开票金额(元)',
    prop: 'amount',
    sortable: true,
    width: 150,
  },
  {
    label: '开票金额(元)',
    prop: 'amount',
    sortable: true,
    width: 150,
  },
  {
    label: '是否含税',
    prop: 'tax',
    sortable: true,
    width: 120,
  },
  {
    label: '快递单号',
    prop: 'express',
    sortable: true,
    width: 120,
  },
  {
    label: '电子发票',
    prop: 'eleInvoice',
    sortable: true,
    width: 120,
  },
  {
    label: '申请人',
    prop: 'apply',
    sortable: true,
  },
  {
    label: '申请时间',
    prop: 'time',
    width: 140,
    sortable: true,
  },
  {
    label: '真实名',
    prop: 'username',
    width: 100,
  },
  {
    label: '所属部门',
    prop: 'group',
  },
  {
    label: '部门负责人',
    prop: 'leader',
    width: 120,
  },
  {
    label: '所属公司',
    prop: 'company',
  },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
    disabledFilter: true,
  },
];
