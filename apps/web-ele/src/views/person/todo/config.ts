import type { FormItemType, TabbarProps } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { ElInput } from 'element-plus';

export const formItems: FormItemType[] = [
  {
    label: '关键字',
    tooltip:
      '支持模糊查询和多编号查询,模糊查询不能使用逗号分隔符,多编号查询必须是完整编号且编号之间用英文逗号分割(,)',
    component: ElInput,
    key: 'keyword',
    props: {
      placeholder: '请输入协议编号, 支持模糊查询',
    },
  },
];

export const tabbar: TabbarProps[] = [
  {
    label: '协议',
    key: 'protocol',
  },
  {
    label: '异常协议',
    key: 'abnormalProtocol',
  },
  {
    label: '工单',
    key: 'workOrder',
  },
  {
    label: '异常单',
    key: 'abnormalWorkOrder',
  },
  {
    label: '报销申请',
    key: 'apply',
  },
  {
    label: '支出申请',
    key: 'outcome',
  },
  {
    label: '离职申请',
    key: 'outApply',
  },
  {
    label: '发票申请',
    key: 'invoice',
  },
  {
    label: '入职申请',
    key: 'inApply',
  },
  {
    label: '进账申请',
    key: 'income',
  },
  {
    label: '付款申请',
    key: 'pay',
  },
  {
    label: '退款申请',
    key: 'refund',
  },
];

export const columns: ITableColumnProps[] = [
  {
    label: '编号',
    type: 'index',
    width: 60,
  },
  {
    label: '待办任务',
    prop: 'task',
  },
  {
    label: '客户编码',
    prop: 'customerCode',
    sortable: true,
  },
  {
    label: '联系人',
    prop: 'contact',
    sortable: true,
  },
  {
    label: '流程状态',
    prop: 'status',
    sortable: true,
  },
  {
    label: '所属人',
    prop: 'owner',
    sortable: true,
  },
  {
    label: '真实名',
    prop: 'username',
    width: 120,
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
    prop: 'company',
  },
  {
    label: '前审批人',
    prop: 'preAuditor',
    sortable: true,
  },
  {
    label: '前审批时间',
    prop: 'time',
    width: 120,
    sortable: true,
  },
];
