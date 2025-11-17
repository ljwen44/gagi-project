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
export const getCustomerById = (id: number) =>
  requestClient.get(`/customer/${id}`);

/**
 * 新增客户
 */
export const addCustomer = (data: any): Promise<CustomerDto> =>
  requestClient.post(`/customer/add`, data);

/**
 * 分页条件查询客户
 */
export const getCustomerList = (data: any) =>
  requestClient.post(`/customer/page`, data);
/**
 * 更新客户信息
 */
export const updateCustomer = (data: any) =>
  requestClient.post(`/customer/update`, data);

/**
 * 生成客户编号
 */
export const genCustNo = () => requestClient.get(`/customer/genCustNo`);
