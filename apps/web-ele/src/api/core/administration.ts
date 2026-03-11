import { requestClient } from '#/api/request';

export interface ReimbursementDto {
  accountName: string;
  amount: number;
  bankName: string;
  createBy: string;
  createTime: string;
  id?: number;
  receiptAccount: string;
  reimbursementNo: string;
  reimbursementTime: string;
  status: string;
}

export enum Type {
  invoiceManage = 'invoiceManage',
  leaveApply = 'leaveApply',
  paymentApply = 'paymentApply',
  refundApply = 'refundApply',
  reimbursement = 'reimbursement',
}

/**
 * 根据ID查询信息
 */
export const getInfoById = (type: Type, id?: number) =>
  requestClient.get(`/${type}/${id}`);

/**
 * 新增信息
 */
export const addInfo = (type: Type, data: any): Promise<ReimbursementDto> =>
  requestClient.post(`/${type}/add`, data);

/**
 * 分页条件查询信息
 */
export const getInfoList = (type: Type, data: any) =>
  requestClient.post(`/${type}/page`, data);

/**
 * 查询待办
 */
export const getInfoPending = (type: Type, params: any) =>
  requestClient.get(`/${type}/pending`, { params });

/**
 * 生成报销编号
 */
export const genReimbursementNo = () =>
  requestClient.get(`/reimbursement/genReimbursementNo`);

/**
 * 生成付款编号
 */
export const genPaymentApplyNo = () =>
  requestClient.get(`/paymentApply/genPaymentNo`);

/**
 * 生成发票编号
 */
export const genInvoiceManageNo = () =>
  requestClient.get(`/invoiceManage/genInvoiceNo`);

/**
 * 生成请假编号
 */
export const genLeaveApplyNo = () =>
  requestClient.get(`/leaveApply/genLeaveNo`);

/**
 * 生成退款申请编号
 */
export const genRefundApplyApplyNo = () =>
  requestClient.get(`/refundApply/genRefundNo`);

/**
 * 查询处理过的数据
 */
export const getInfoApproved = (type: Type, params: any) =>
  requestClient.get(`/${type}/approved`, { params });
