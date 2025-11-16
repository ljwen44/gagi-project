import { requestClient } from '#/api/request';

/**
 * 创建流程定义
 */
export const defineWorkflow = (data: any) =>
  requestClient.post(`/workflow/define`, data);

/**
 * 流程审批操作
 */
export const approveWorkflow = (data: any) =>
  requestClient.post(`/workflow/instance/approve`, data);

/**
 * 发起流程实例
 */
export const startWorkflow = (data: any) =>
  requestClient.post(`/workflow/instance/start`, data);

/**
 * 批量新增流程节点
 */
export const batchWorkflow = (data: any) =>
  requestClient.post(`/workflow/node/batch`, data);

/**
 * 查询所有可用流程定义
 */
export const getWorkflowList = (params: any) =>
  requestClient.get(`/workflow/define/list`, { params });

/**
 * 查询流程实例详情
 */
export const getWorkflowDetail = (params: any) =>
  requestClient.get(`/workflow/instance/detail`, { params });

/**
 * 查询用户发起的流程
 */
export const initiatorWorkflow = (params: any) =>
  requestClient.get(`/workflow/instance/initiator`, { params });

/**
 * 查询用户待审批列表
 */
export const getWorkflowPending = (params: any) =>
  requestClient.get(`/workflow/instance/pending`, { params });
