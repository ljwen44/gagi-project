import { requestClient } from '#/api/request';

/**
 * 业绩统计查询
 */
export const getPerformanceStat = (params?: { salesmanId?: number | string }) =>
  requestClient.get('/sales/performance/stat', { params });
