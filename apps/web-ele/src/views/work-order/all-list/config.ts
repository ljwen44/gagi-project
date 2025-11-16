import type { FormItemType, TabbarProps } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

import ASelect from '#/components/common/select/index.vue';

import {
  AuditStatusMap,
  ReceiveStatusMap,
  WorkStatusMap,
} from '../commonConfig';

export enum MODAL_TYPE {
  CUSTOMER = 'customer',
  INIT = '',
  PROTOCOL = 'protocol',
  WORKORDER = 'workOrder',
}

export const formItems: FormItemType[] = [
  {
    label: '国家',
    key: 'country',
    width: 36,
    // component: VbenSelect,
    props: {
      placeholder: '请输入',
      // options: [],
    },
  },
  {
    label: '工单编号',
    // tooltip:
    //   '支持工单编号/协议编号/客户编号,或任一类型编号的精准多号查询,编号之间用英文逗号分割(,)',
    key: 'orderNo',
    props: {
      placeholder: '工单编号',
      // placeholder: '工单编号/协议编号/客户编号',
      class: 'w-[220px]',
    },
  },
];

export const tabbar: TabbarProps[] = [
  {
    label: '待办工单',
    key: 'pending',
    tooltip: '未结单确认的工单,包含未完结及后端驳回',
    permissionCode: 'workorder:all:pending',
  },
  {
    label: '已完结',
    key: 'completed',
    tooltip: '已结单确认的工单',
    permissionCode: 'workorder:all:completed',
  },
  {
    label: '全部工单',
    key: 'all',
    permissionCode: 'workorder:all:all',
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
    disabledFilter: true,
  },
  // {
  //   label: '工单类型',
  //   prop: 'type',
  //   sortable: true,
  // },
  {
    label: '国家',
    prop: 'country',
    sortable: true,
    disabledFilter: true,
  },
  {
    label: '产品名称',
    prop: 'productName',
    sortable: true,
    disabledFilter: true,
  },
  {
    label: '客户名称',
    prop: 'customerName',
    sortable: true,
    disabledFilter: true,
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
    label: '审核状态',
    prop: 'auditStatus',
    sortable: true,
    component: ASelect,
    componentProps: {
      options: Object.entries(AuditStatusMap).map((item) => ({
        label: item[1],
        value: item[0],
      })),
    },
    filterFormat: (value) => AuditStatusMap[value],
  },
  {
    label: '客户确认',
    prop: 'customerConfirm',
    sortable: true,
    disabledFilter: true,
  },
  {
    label: '接单状态',
    prop: 'receiveStatus',
    sortable: true,
    component: ASelect,
    componentProps: {
      options: Object.entries(ReceiveStatusMap).map((item) => ({
        label: item[1],
        value: item[0],
      })),
    },
    filterFormat: (value) => ReceiveStatusMap[value],
  },
  {
    label: '做单状态',
    prop: 'workStatus',
    sortable: true,
    component: ASelect,
    componentProps: {
      options: Object.entries(WorkStatusMap).map((item) => ({
        label: item[1],
        value: item[0],
      })),
    },
    filterFormat: (value) => WorkStatusMap[value],
  },
  // {
  //   label: '结单确认',
  //   prop: 'finishConfirm',
  //   sortable: true,
  // },
  {
    label: '所属人',
    prop: 'username',
    disabledFilter: true,
  },
  {
    label: '真实名',
    prop: 'realName',
    disabledFilter: true,
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
    disabledFilter: true,
  },
  {
    label: '创建时间',
    prop: 'createdTime',
    sortable: true,
    disabledFilter: true,
  },
  // {
  //   label: '客户确认时间',
  //   prop: 'customerConfirmTime',
  //   sortable: true,
  // },
  // {
  //   label: '接单时间',
  //   prop: 'orderTime',
  //   sortable: true,
  // },
  // {
  //   label: '结单时间',
  //   prop: 'finishTime',
  //   sortable: true,
  // },
  // {
  //   label: '结单确认时间',
  //   prop: 'finishConfirmTime',
  //   sortable: true,
  // },
  // {
  //   label: '前置项接单时间',
  //   prop: 'preOrderTime',
  //   sortable: true,
  //   width: 160,
  // },
  // {
  //   label: '前置项结项时间',
  //   prop: 'preFinishTime',
  //   sortable: true,
  //   width: 160,
  // },
  // {
  //   label: '附加项分配时间',
  //   prop: 'attachTime',
  //   sortable: true,
  //   width: 160,
  // },
  // {
  //   label: '附加项结项时间',
  //   prop: 'attachFinishTime',
  //   sortable: true,
  //   width: 160,
  // },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
    disabledFilter: true,
    align: 'center',
    width: 140,
  },
];
