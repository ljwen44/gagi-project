import { requestClient } from '#/api/request';

export interface WorkOrderDto {
  agreementId: number;
  auditStatus: number;
  country: string;
  customerId: number;
  orderBy: string;
  orderDir: string;
  pageNum: number;
  pageSize: number;
  productId: number;
  receiveStatus: number;
  workStatus: number;
}

/**
 * 根据ID查询工单详情
 */
export const getWorkOrderById = (id: number | string) =>
  requestClient.get(`/work-order/${id}`);

/**
 * 新增工单
 */
export const addWorkOrder = (data: any): Promise<WorkOrderDto> =>
  requestClient.post(`/work-order/add`, data);

/**
 * 分页条件查询工单
 */
export const getWorkOrderList = (data: any) =>
  requestClient.post(`/work-order/page`, data);

/**
 * 查询协议审批待办
 */
export const getWorkOrderPending = (params: {
  pageNum: number;
  pageSize: number;
}) => requestClient.get(`/work-order/pending`, { params });

/**
 * 更新工单详情
 */
export const updateDynamicFields = (data: any) =>
  requestClient.post(`/work-order/updateDynamicFields`, data);
