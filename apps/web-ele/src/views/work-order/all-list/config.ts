import type { FormItemType, TabbarProps } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { VbenSelect } from '@vben-core/shadcn-ui';

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
      '支持工单编号/协议编号/客户编号,或任一类型编号的精准多号查询,编号之间用英文逗号分割(,)',
    key: 'keyword',
    props: {
      placeholder: '工单编号/协议编号/客户编号',
      class: 'w-[220px]',
    },
  },
];

export const tabbar: TabbarProps[] = [
  {
    label: '待办工单',
    key: 'todo',
    tooltip: '未结单确认的工单,包含未完结及后端驳回',
  },
  {
    label: '已完结',
    key: 'finish',
    tooltip: '已结单确认的工单',
  },
  {
    label: '全部工单',
    key: 'all',
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
    prop: 'number',
    sortable: true,
  },
  {
    label: '工单类型',
    prop: 'type',
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
    prop: 'customerNumber',
    sortable: true,
  },
  {
    label: '协议编号',
    prop: 'protocolNumber',
    sortable: true,
  },
  {
    label: '审核状态',
    prop: 'status',
    sortable: true,
  },
  {
    label: '客户确认',
    prop: 'confirm',
    sortable: true,
  },
  {
    label: '接单状态',
    prop: 'acceptStatus',
    sortable: true,
  },
  {
    label: '做单状态',
    prop: 'orderStatus',
    sortable: true,
  },
  {
    label: '结单确认',
    prop: 'finishConfirm',
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
  {
    label: '所属部门',
    prop: 'group',
  },
  {
    label: '部门负责人',
    prop: 'leader',
  },
  {
    label: '所属公司',
    prop: 'belongCompany',
  },
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
    label: '客户确认时间',
    prop: 'customerConfirmTime',
    sortable: true,
  },
  {
    label: '接单时间',
    prop: 'orderTime',
    sortable: true,
  },
  {
    label: '结单时间',
    prop: 'finishTime',
    sortable: true,
  },
  {
    label: '结单确认时间',
    prop: 'finishConfirmTime',
    sortable: true,
  },
  {
    label: '前置项接单时间',
    prop: 'preOrderTime',
    sortable: true,
  },
  {
    label: '前置项结项时间',
    prop: 'preFinishTime',
    sortable: true,
  },
  {
    label: '附加项分配时间',
    prop: 'attachTime',
    sortable: true,
  },
  {
    label: '附加项结项时间',
    prop: 'attachFinishTime',
    sortable: true,
  },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
    disabledFilter: true,
  },
];
