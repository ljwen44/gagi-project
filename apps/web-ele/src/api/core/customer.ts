import { requestClient } from '#/api/request';

export interface CustomerDto {
  city: string;
  companyName: string;
  createBy: number;
  customerIndustry: string;
  customerLevel: string;
  customerName: string;
  customerSource: string;
  detailAddress: string;
  district: string;
  email: string;
  isPublicSea: number;
  phone: string;
  position: string;
  province: string;
  remark: string;
  tags: string;
  updateBy: number;
  wechatQq: string;
}

/**
 * 根据ID查询客户详情
 */
export const getCustomerById = (id: string) =>
  requestClient.get(`/api/customer/${id}`);

/**
 * 新增客户
 */
export const addCustomer = (data: any): Promise<CustomerDto> =>
  requestClient.post(`/api/customer/add`, { data });

/**
 * 分页条件查询客户
 */
export const getCustomerList = (data: any) =>
  requestClient.post(`/api/customer/page`, { data });
