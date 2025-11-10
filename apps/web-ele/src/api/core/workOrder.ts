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
export const getWorkOrderById = (id: string) =>
  requestClient.get(`/api/work-order/${id}`);

/**
 * 新增工单
 */
export const addWorkOrder = (data: any): Promise<WorkOrderDto> =>
  requestClient.post(`/api/work-order/add`, { data });

/**
 * 分页条件查询工单
 */
export const getWorkOrderList = (data: any) =>
  requestClient.post(`/api/work-order/page`, { data });

/**
 * 查询协议审批待办
 */
export const getWorkOrderPending = (params: {
  pageNum: number;
  pageSize: number;
}) => requestClient.get(`/api/work-order/pending`, { params });
