import { requestClient } from '#/api/request';

export interface GetProductListParams {
  categoryId: string;
  country: string;
  pageNum: number;
  pageSize: number;
  productName?: string;
  productNo?: string;
}

export interface ProductDto {
  categoryId: number;
  country: string;
  createBy: number;
  id: number;
  isCertified: number;
  isNotarized: number;
  officialFee: number;
  productName: string;
  productNo: string;
  standardPrice: number;
  updateBy: number;
}

/**
 * 根据ID查询产品详情
 */
export const getProductById = (id: string) =>
  requestClient.get(`/api/product/${id}`);

/**
 * 根据ID删除产品
 */
export const deleteProductById = (id: string) =>
  requestClient.delete(`/api/product/${id}`);

/**
 * 新增产品
 */
export const addProduct = (data: any): Promise<ProductDto> =>
  requestClient.post(`/api/product/add`, { data });

/**
 * 分页条件查询产品
 */
export const getProdcutList = (params: GetProductListParams) =>
  requestClient.get(`/api/product/page`, { params });

/**
 * 更新产品
 */
export const updateProduct = (data: any) =>
  requestClient.put(`/api/product/update`, { data });
