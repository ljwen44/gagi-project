import { requestClient } from '#/api/request';

interface GetPerformanceDto {
  salesmanId?: string;
  performanceDateStart?: string;
  performanceDateEnd?: string;
  pageNum?: number;
  pageSize?: number;
}

/**
 * 业绩统计查询
 */
export const getPerformanceStat = (params?: { salesmanId?: number | string }) =>
  requestClient.get('/sales/performance/stat', { params });

/**
 * 分页条件查询业绩
 */
export const getPerformanceList = (data: GetPerformanceDto) =>
  requestClient.post(`/sales/performance/queryPage`, data);

/**
 * 更新业绩
 */
export const updatePerformanceDate = (data: any) =>
  requestClient.post(`/sales/performance/updatePerformanceDate`, data);

/**
 * 导出业绩列表
 */
export const exportPerformance = (data: GetPerformanceDto) =>
  requestClient.post(`/sales/performance/export`, data, {
    responseType: 'blob',
  });

/**
 * 统计
 */
export const getPerformanceSys = (data: GetPerformanceDto) =>
  requestClient.post(`/sales/performance/summary`, data);
