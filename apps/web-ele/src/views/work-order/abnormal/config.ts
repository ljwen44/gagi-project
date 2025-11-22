import type { FormItemType, TabbarProps } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { VbenSelect } from '@vben-core/shadcn-ui';

export enum MODAL_TYPE {
  ABNORMALWORKORDER = 'abnormalWorkOrder',
  CUSTOMER = 'customer',
  INIT = '',
  PROTOCOL = 'protocol',
  WORKORDER = 'workOrder',
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
    label: '待办异常',
    key: 'pending',
    tooltip: '未结单确认的异常单,包含未完结及后端驳回',
    permissionCode: 'workorder:abnormal:pending',
  },
  {
    label: '已完结',
    key: 'completed',
    tooltip: '已结单确认的异常单',
    permissionCode: 'workorder:abnormal:completed',
  },
  {
    label: '全部异常',
    key: 'all',
    permissionCode: 'workorder:abnormal:all',
  },
  {
    label: '回收站',
    key: 'recycle',
    permissionCode: 'workorder:abnormal:recycle',
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
    label: '异常单号',
    prop: 'orderNo',
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
    label: '关联工单',
    prop: 'workOrderCode',
    sortable: true,
  },
  {
    label: '审核状态',
    prop: 'auditStatus',
    sortable: true,
  },
  {
    label: '做单状态',
    prop: 'workStatus',
    sortable: true,
  },
  {
    label: '结单确认',
    prop: 'confirm',
    sortable: true,
  },
  // {
  //   label: '处理方式',
  //   prop: 'method',
  //   sortable: true,
  // },
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
  // {
  //   label: '主做单人',
  //   prop: 'owner',
  //   sortable: true,
  // },
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
    align: 'center',
  },
];
