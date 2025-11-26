import { requestClient } from '#/api/request';

export interface AttachmentParams {
  businessType?: 'agreement' | 'sales_order' | 'work_order';
  businessId?: string;
  roofId?: string;
}

/**
 * 按业务查询附件
 */
export const getAttachment = (params: AttachmentParams) =>
  requestClient.get('/attachment/business', { params });

/**
 * 下载文件
 */
export const getAttachmentDownload = (id: string) =>
  requestClient.get(`/attachment/download/${id}`);

/**
 * 上传文件
 */
export const postAttachmentUpload = (data: any) =>
  requestClient.post(`/attachment/upload`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

/**
 * 获取当前用户
 */
export const getCurrentUser = () => requestClient.get(`/user/current`);
