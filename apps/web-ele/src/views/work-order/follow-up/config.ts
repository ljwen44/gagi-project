import type { FormItemType, TabbarProps } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { VbenSelect } from '@vben-core/shadcn-ui';

export enum MODAL_TYPE {
  CUSTOMER = 'customer',
  FOLLOWUP = 'follow-up',
  INIT = '',
  PROTOCOL = 'protocol',
}

export const formItems: FormItemType[] = [
  {
    label: '国家',
    key: 'keyword',
    width: 36,
    component: VbenSelect,
    props: {
      placeholder: '请选择国家',
      options: [],
    },
  },
  {
    label: '关键字',
    tooltip:
      '支持客户编号/协议编号/异常单号,或任一类型编号的精准多号查询,编号之间用英文逗号分割(,)',
    key: 'keyword',
    props: {
      placeholder: '客户编号/协议编号/异常单号',
      class: 'w-[220px]',
    },
  },
];

export const tabbar: TabbarProps[] = [
  {
    label: '全部工单',
    key: 'all',
    permissionCode: 'workorder:query:productA:all',
  },
  {
    label: '未备注',
    key: 'unremark',
    permissionCode: 'workorder:query:productA:unremark',
  },
  {
    label: '审核中',
    key: 'reviewing',
    permissionCode: 'workorder:query:productA:reviewing',
  },
  {
    label: '公示中',
    key: 'publicing',
    permissionCode: 'workorder:query:productA:publicing',
  },
  {
    label: '异常',
    key: 'abnormal',
    permissionCode: 'workorder:query:productA:abnormal',
  },
  {
    label: '暂停',
    key: 'paused',
    permissionCode: 'workorder:query:productA:paused',
  },
  {
    label: '电子证书',
    key: 'electronic',
    permissionCode: 'workorder:query:productA:electronic',
  },
  {
    label: '纸质证书',
    key: 'paper',
    permissionCode: 'workorder:query:productA:paper',
  },
  {
    label: '失败',
    key: 'failed',
    permissionCode: 'workorder:query:productA:failed',
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
    label: '工单编号',
    prop: 'orderNo',
    sortable: true,
  },
  {
    label: '工单类型',
    prop: 'orderType',
    sortable: true,
  },
  {
    label: '国家',
    prop: 'country',
    sortable: true,
  },
  {
    label: '产品名称',
    prop: 'productName',
    sortable: true,
  },
  {
    label: '客户名称',
    prop: 'customerName',
    sortable: true,
  },
  {
    label: '回执时间',
    prop: 'time',
    sortable: true,
  },
  {
    label: '最终状态',
    prop: 'status',
    sortable: true,
  },
  {
    label: '证书类型',
    prop: 'certType',
    sortable: true,
  },
  {
    label: '证书附件',
    prop: 'certAttachment',
    sortable: true,
  },
  {
    label: '快递单号',
    prop: 'expressNumber',
    sortable: true,
  },
  {
    label: '状态备注',
    prop: 'statusRemark',
    sortable: true,
  },
  {
    label: '客户编号',
    prop: 'customerNo',
    sortable: true,
  },
  {
    label: '协议编号',
    prop: 'agreementNo',
    sortable: true,
  },
  {
    label: '当月跟进次数',
    prop: 'currentMonthTimes',
    sortable: true,
  },
  {
    label: '最后跟进时间',
    prop: 'lastTime',
    sortable: true,
  },
  {
    label: '所属人',
    prop: 'username',
  },
  {
    label: '真实名',
    prop: 'username',
  },
  // {
  //   label: '所属部门',
  //   prop: 'group',
  // },
  // {
  //   label: '部门负责人',
  //   prop: 'leader',
  //   width: 100,
  // },
  // {
  //   label: '所属公司',
  //   prop: 'belongCompany',
  // },
  {
    label: '主做单人',
    prop: 'owner',
    sortable: true,
  },
  {
    label: '创建人',
    prop: 'createdBy',
    sortable: true,
  },
  {
    label: '创建时间',
    prop: 'createdTime',
    sortable: true,
  },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
    disabledFilter: true,
  },
];
