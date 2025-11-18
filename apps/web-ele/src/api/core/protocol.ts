import { requestClient } from '#/api/request';

export interface AgreementDto {
  actualPerformance: number;
  agreementAmount: number;
  agreementCost: number;
  agreementRemark: string;
  agreementTax: number;
  agreementTitle: string;
  agreementType: string;
  budgetPerformance: number;
  createBy: number;
  custId: number;
  discountAmount: number;
  orderRemark: string;
  productIds: string;
  receivedAmount: number;
  salesCost: number;
  signTitle: string;
  updateBy: number;
}

/**
 * 根据ID查询协议详情
 */
export const getAgreementById = (id: string) =>
  requestClient.get(`/agreement/${id}`);

/**
 * 新增协议
 */
export const addAgreement = (data: any): Promise<AgreementDto> =>
  requestClient.post(`/agreement/add`, { data });

/**
 * 分页条件查询协议
 */
export const getAgreementList = (data: any) =>
  requestClient.post(`/agreement/page`, data);

/**
 * 查询协议审批待办
 */
export const getAgreementPending = (params: {
  pageNum: number;
  pageSize: number;
}) => requestClient.get(`/agreement/pending`, { params });

/**
 * 生成协议编号
 */
export const genAgreementNo = () =>
  requestClient.get(`/agreement/genAgreementNo`);
