import type { IComponent } from '../common/type';

import type { IFormItem } from '#/components/common/form/index.vue';
import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { defineAsyncComponent } from 'vue';

export enum ProductTabEnum {
  // 附加项
  additionalItem = 'additionalItem',
  // 相关资料
  relatedInformation = 'relatedInformation',
  // 相关问答
  relatedQuestions = 'relatedQuestions',
}

export const drawerFormItems: IFormItem[] = [
  { label: '产品编号', prop: 'productNo' },
  { label: '产品名称', prop: 'productName' },
  { label: '服务分类', prop: 'categoryId' },
  { label: '国家', prop: 'country' },
  {
    label: '是否公证',
    prop: 'isNotarized',
    format: (value: number) => (value ? '是' : '否'),
  },
  {
    label: '是否认证',
    prop: 'isCertified',
    format: (value: number) => (value ? '是' : '否'),
  },
  {
    label: '标准售价(元)',
    prop: 'standardPrice',
    format: (value: number) => value?.toFixed(2),
  },
  {
    label: '官费(元)',
    prop: 'officialFee',
    class: 'col-span-2',
    format: (value: number) => value?.toFixed(2),
  },
  // { label: '备注', prop: 'remark', class: 'col-span-3' },
];

export const productTabs = [
  { label: '附加项', key: ProductTabEnum.additionalItem },
  { label: '相关资料', key: ProductTabEnum.relatedInformation },
  { label: '相关问答', key: ProductTabEnum.relatedQuestions },
];

export const componentsMap: Record<any, IComponent> = {
  [ProductTabEnum.additionalItem]: {
    component: defineAsyncComponent(
      () => import('./components/AdditionalItem.vue'),
    ),
  },
  [ProductTabEnum.relatedInformation]: {
    component: defineAsyncComponent(
      () => import('./components/RelatedInformation.vue'),
    ),
  },
  [ProductTabEnum.relatedQuestions]: {
    component: defineAsyncComponent(
      () => import('./components/RelatedQuestions.vue'),
    ),
  },
};

export const additionalItemColumns: ITableColumnProps[] = [
  { label: '编号', type: 'index', fixed: 'left', width: 60 },
  { label: '附加项类型', prop: 'type', sortable: true },
  { label: '附加项名称', prop: 'name', sortable: true },
  { label: '标准售价(元)', prop: 'sale', sortable: true },
  { label: '官费(元)', prop: 'fee', sortable: true },
  { label: '排序', prop: 'sort', sortable: true },
  { label: '备注', prop: 'remark', sortable: true },
  { label: '创建时间', prop: 'createdTime', sortable: true },
  { label: '更新时间', prop: 'updatedTime', sortable: true },
];

export const relatedInfomationOrQuestionsColumns: ITableColumnProps[] = [
  { label: '编号', type: 'index', fixed: 'left', width: 60 },
  { label: '标题', prop: 'type', sortable: true },
  { label: '分类', prop: 'name', sortable: true },
  { label: '排序', prop: 'sort', sortable: true },
  { label: '创建人', prop: 'createdBy', sortable: true },
  { label: '创建时间', prop: 'createdTime', sortable: true },
];
