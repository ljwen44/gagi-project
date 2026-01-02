import type { FormItemType, TabbarProps } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { ElInput } from 'element-plus';

import { getInfoPending, Type } from '#/api/core/administration';
import { getAgreementPending } from '#/api/core/protocol';
import { getWorkOrderPending } from '#/api/core/workOrder';

export enum MODAL_TYPE {
  CUSTOMER = 'customer',
  INIT = '',
  INVOICE = 'invoice',
  LEAVEAPPLY = 'leaveApply',
  PAYMENT = 'payment',
  PROTOCOL = 'protocol',
  REFUND = 'refund',
  REIMBURSEMENT = 'reimbursement',
  WORKORDER = 'workOrder',
}
export const FIELD_TYPE = {
  [MODAL_TYPE.CUSTOMER]: 'custId',
  [MODAL_TYPE.PROTOCOL]: 'agreementId',
  [MODAL_TYPE.WORKORDER]: 'workOrderId',
  [MODAL_TYPE.REIMBURSEMENT]: 'reimbursementId',
  [MODAL_TYPE.LEAVEAPPLY]: 'leaveApplyId',
  [MODAL_TYPE.REFUND]: 'refundApplyId',
  [MODAL_TYPE.PAYMENT]: 'paymentApplyId',
  [MODAL_TYPE.INVOICE]: 'invoiceManageId',
};

export const typeMap = {
  protocol: 'protocol',
  workOrder: 'workOrder',
  reimbursement: 'reimbursement',
  leaveApply: 'leaveApply',
  invoice: 'invoice',
  refund: 'refund',
  payment: 'payment',
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
  {
    label: '报销申请',
    key: typeMap.reimbursement,
  },
  // {
  //   label: '支出申请',
  //   key: 'outcome',
  // },
  {
    label: '请假申请',
    key: typeMap.leaveApply,
  },
  // {
  //   label: '离职申请',
  //   key: 'outApply',
  // },
  {
    label: '发票申请',
    key: typeMap.invoice,
  },
  // {
  //   label: '入职申请',
  //   key: 'inApply',
  // },
  // {
  //   label: '进账申请',
  //   key: 'income',
  // },
  {
    label: '付款申请',
    key: typeMap.payment,
  },
  {
    label: '退款申请',
    key: typeMap.refund,
  },
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
  [typeMap.payment]: [
    {
      label: '编号',
      type: 'index',
      width: 60,
      disabledFilter: true,
    },
    {
      label: '付款单号',
      prop: 'paymentNo',
      sortable: true,
      width: 230,
    },
    {
      label: '项目名称',
      prop: 'projectName',
      sortable: true,
    },
    {
      label: '付款金额(元)',
      prop: 'paymentAmount',
      sortable: true,
      width: 150,
      format: (value: number) => value?.toFixed(2),
    },
    {
      label: '审核状态',
      prop: 'status',
      width: 120,
      sortable: true,
    },
    {
      label: '收款账户名称',
      prop: 'receiptAccountName',
      sortable: true,
      width: 160,
    },
    {
      label: '收款账号',
      prop: 'receiptAccount',
      sortable: true,
    },
    {
      label: '开户行',
      prop: 'bankName',
      sortable: true,
    },
    {
      label: '申请时间',
      prop: 'applyTime',
      width: 180,
    },
    {
      label: '用户名',
      prop: 'username',
    },
    {
      label: '真实姓名',
      prop: 'realName',
    },
    {
      label: '最后审批人账号',
      prop: 'lastApprover',
      width: 150,
    },
    {
      label: '审批时间',
      prop: 'approveTime',
      width: 180,
    },
  ],
  [typeMap.invoice]: [
    {
      label: '编号',
      type: 'index',
      width: 60,
      disabledFilter: true,
    },
    {
      label: '发票单号',
      prop: 'invoiceNo',
      sortable: true,
      width: 240,
    },
    {
      label: '关联协议',
      prop: 'agreementNo',
      sortable: true,
      width: 240,
    },
    {
      label: '签约抬头',
      prop: 'signTitle',
      sortable: true,
      width: 150,
    },
    {
      label: '开票类型',
      prop: 'invoiceType',
      sortable: true,
    },
    {
      label: '审核状态',
      prop: 'status',
      sortable: true,
    },
    {
      label: '开票抬头',
      prop: 'invoiceTitle',
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
      prop: 'invoiceAmount',
      sortable: true,
      format: (value: number) => value?.toFixed(2),
    },
    {
      label: '是否含税',
      prop: 'isTaxIncluded',
      sortable: true,
      width: 120,
    },
    {
      label: '快递单号',
      prop: 'expressNo',
      sortable: true,
      width: 120,
    },
    {
      label: '电子发票',
      prop: 'electronicInvoice',
      sortable: true,
      width: 120,
    },
    {
      label: '用户名',
      prop: 'username',
    },
    {
      label: '真实姓名',
      prop: 'realName',
    },
    {
      label: '最后审批人账号',
      prop: 'lastApprover',
      width: 150,
    },
    {
      label: '审批时间',
      prop: 'approveTime',
      width: 180,
    },
  ],
  [typeMap.leaveApply]: [
    {
      label: '编号',
      type: 'index',
      width: 60,
      disabledFilter: true,
    },
    {
      label: '请假单号',
      prop: 'leaveNo',
      sortable: true,
      width: 230,
    },
    {
      label: '请假性质',
      prop: 'leaveNature',
      sortable: true,
    },
    {
      label: '审核状态',
      prop: 'status',
      width: 120,
      sortable: true,
    },
    {
      label: '开始时间',
      prop: 'startTime',
      width: 180,
      sortable: true,
    },
    {
      label: '结束时间',
      prop: 'endTime',
      width: 180,
      sortable: true,
    },
    {
      label: '请假天数(天)',
      prop: 'leaveDays',
      width: 140,
      sortable: true,
    },
    {
      label: '用户名',
      prop: 'username',
    },
    {
      label: '真实姓名',
      prop: 'realName',
    },
    {
      label: '最后审批人账号',
      prop: 'lastApprover',
      width: 150,
    },
    {
      label: '审批时间',
      prop: 'approveTime',
      width: 180,
    },
  ],
  [typeMap.refund]: [
    {
      label: '编号',
      type: 'index',
      width: 60,
      disabledFilter: true,
    },
    {
      label: '退款单号',
      prop: 'refundNo',
      sortable: true,
      width: 230,
    },
    {
      label: '协议编号',
      prop: 'agreementNo',
      sortable: true,
      width: 240,
    },
    {
      label: '客户编号',
      prop: 'customerNo',
      sortable: true,
      width: 240,
    },
    {
      label: '退款类型',
      prop: 'refundType',
      width: 120,
      sortable: true,
    },
    {
      label: '退款金额(元)',
      prop: 'refundAmount',
      sortable: true,
      width: 160,
    },
    {
      label: '审核状态',
      prop: 'status',
      width: 120,
      sortable: true,
    },
    {
      label: '用户名',
      prop: 'username',
    },
    {
      label: '真实姓名',
      prop: 'realName',
    },
    {
      label: '最后审批人账号',
      prop: 'lastApprover',
      width: 150,
    },
    {
      label: '审批时间',
      prop: 'approveTime',
      width: 180,
    },
  ],
  [typeMap.reimbursement]: [
    {
      label: '编号',
      type: 'index',
      width: 60,
      disabledFilter: true,
    },
    {
      label: '报销单号',
      prop: 'reimbursementNo',
      sortable: true,
      width: 230,
    },
    {
      label: '报销金额(元)',
      prop: 'amount',
      sortable: true,
      format: (value: number) => value?.toFixed(2),
    },
    {
      label: '收款账号',
      prop: 'receiptAccount',
      sortable: true,
    },
    {
      label: '账户名称',
      prop: 'accountName',
      sortable: true,
    },
    {
      label: '开户行',
      prop: 'bankName',
      sortable: true,
    },
    {
      label: '审核状态',
      prop: 'status',
      width: 120,
    },
    {
      label: '报销时间',
      prop: 'reimbursementTime',
      width: 160,
    },
    {
      label: '用户名',
      prop: 'username',
    },
    {
      label: '真实姓名',
      prop: 'realName',
    },
    {
      label: '最后审批人账号',
      prop: 'lastApprover',
      width: 150,
    },
    {
      label: '审批时间',
      prop: 'approveTime',
      width: 180,
    },
    // {
    //   label: '创建时间',
    //   prop: 'createTime',
    //   width: 160,
    // },
  ],
};

export const apiMap: Record<string, any> = {
  [typeMap.protocol]: getAgreementPending,
  [typeMap.workOrder]: getWorkOrderPending,
  [typeMap.invoice]: (args: any) => getInfoPending(Type.invoiceManage, args),
  [typeMap.reimbursement]: (args: any) =>
    getInfoPending(Type.reimbursement, args),
  [typeMap.leaveApply]: (args: any) => getInfoPending(Type.leaveApply, args),
  [typeMap.payment]: (args: any) => getInfoPending(Type.paymentApply, args),
  [typeMap.refund]: (args: any) => getInfoPending(Type.refundApply, args),
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
