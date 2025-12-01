import type { FormItemType, TabbarProps } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { ElInput } from 'element-plus';

import { getAgreementPending } from '#/api/core/protocol';
import { getWorkOrderPending } from '#/api/core/workOrder';

export enum MODAL_TYPE {
  CUSTOMER = 'customer',
  INIT = '',
  PROTOCOL = 'protocol',
  WORKORDER = 'workOrder',
}

export const typeMap = {
  protocol: 'protocol',
  workOrder: 'workOrder',
} as const;

export const formItemsMap: Record<string, FormItemType[]> = {
  [typeMap.protocol]: [
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
  ],
  [typeMap.workOrder]: [
    {
      label: '关键字',
      tooltip:
        '支持模糊查询和多编号查询,模糊查询不能使用逗号分隔符,多编号查询必须是完整编号且编号之间用英文逗号分割(,)',
      component: ElInput,
      key: 'keyword',
      props: {
        placeholder: '请输入工单编号, 支持模糊查询',
      },
    },
  ],
};

export const tabbar: TabbarProps[] = [
  {
    label: '协议',
    key: typeMap.protocol,
  },
  // {
  //   label: '异常协议',
  //   key: 'abnormalProtocol',
  // },
  {
    label: '工单',
    key: typeMap.workOrder,
  },
  // {
  //   label: '异常单',
  //   key: 'abnormalWorkOrder',
  // },
  // {
  //   label: '报销申请',
  //   key: 'apply',
  // },
  // {
  //   label: '支出申请',
  //   key: 'outcome',
  // },
  // {
  //   label: '请假申请',
  //   key: 'rest',
  // },
  // {
  //   label: '离职申请',
  //   key: 'outApply',
  // },
  // {
  //   label: '发票申请',
  //   key: 'invoice',
  // },
  // {
  //   label: '入职申请',
  //   key: 'inApply',
  // },
  // {
  //   label: '进账申请',
  //   key: 'income',
  // },
  // {
  //   label: '付款申请',
  //   key: 'pay',
  // },
  // {
  //   label: '退款申请',
  //   key: 'refund',
  // },
];

export const columnsMap: Record<string, ITableColumnProps[]> = {
  [typeMap.protocol]: [
    {
      label: '编号',
      type: 'index',
      width: 60,
      disabledFilter: true,
    },
    // {
    //   label: '待办任务',
    //   prop: 'task',
    //   width: 200,
    // },
    {
      label: '协议编号',
      prop: 'agreementNo',
      width: 200,
    },
    {
      label: '客户编码',
      prop: 'customerNo',
      width: 200,
      // sortable: true,
    },
    {
      label: '客户名称',
      prop: 'customerName',
      // sortable: true,
    },
    {
      label: '联系人',
      prop: 'contact',
      // sortable: true,
    },
    {
      label: '审批状态',
      prop: 'approveStatus',
      // sortable: true,
      width: 150,
    },
    {
      label: '审批时间',
      prop: 'approveTime',
      width: 180,
      // sortable: true,
    },
    {
      label: '所属人',
      prop: 'username',
    },
    {
      label: '真实名',
      prop: 'realName',
    },
    {
      label: '最后审批人账号',
      prop: 'lastApprover',
      width: 180,
      // sortable: true,
    },
    // {
    //   label: '前审批时间',
    //   prop: 'time',
    //   width: 120,
    //   sortable: true,
    // },
  ],
  [typeMap.workOrder]: [
    {
      label: '编号',
      type: 'index',
      width: 60,
      disabledFilter: true,
    },
    {
      label: '工单编号',
      prop: 'orderNo',
      width: 200,
      // sortable: true,
    },
    {
      label: '国家',
      prop: 'country',
      // sortable: true,
    },
    {
      label: '产品名称',
      prop: 'productName',
      // sortable: true,
    },
    {
      label: '客户名称',
      prop: 'customerName',
      // sortable: true,
    },
    {
      label: '客户编号',
      prop: 'customerNo',
      // sortable: true,
    },
    {
      label: '协议编号',
      prop: 'agreementNo',
      // sortable: true,
    },
    {
      label: '审核状态',
      prop: 'auditStatus',
      // sortable: true,
    },
    {
      label: '客户确认',
      prop: 'customerConfirm',
      // sortable: true,
    },
    {
      label: '接单状态',
      prop: 'receiveStatus',
      // sortable: true,
    },
    {
      label: '做单状态',
      prop: 'workStatus',
      // sortable: true,
    },
    {
      label: '所属人',
      prop: 'username',
    },
    {
      label: '真实名',
      prop: 'realName',
    },
    {
      label: '创建人',
      prop: 'createdBy',
      // sortable: true,
    },
  ],
};

export const apiMap: Record<string, any> = {
  [typeMap.protocol]: getAgreementPending,
  [typeMap.workOrder]: getWorkOrderPending,
};

export const auditStatusMap: Record<number | string, any> = {
  0: {
    type: 'info',
    text: '待审核',
  },
  1: {
    type: 'success',
    text: '审核通过',
  },
  2: {
    type: 'danger',
    text: '审核驳回',
  },
};
