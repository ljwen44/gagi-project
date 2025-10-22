import type { FormItemType } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { VbenSelect } from '@vben-core/shadcn-ui';

import { ElInput } from 'element-plus';

export const formItems: FormItemType[] = [
  {
    label: '国家',
    key: 'keyword',
    width: 36,
    component: VbenSelect,
    props: {
      placeholder: '请选择国家',
      options: [],
    },
  },
  {
    label: '关键字',
    component: ElInput,
    key: 'keyword',
    tooltip:
      '支持产品编号/产品名称,或产品编号/产品名称的精准多号查询,编号之间用英文逗号分割(,)',
    props: {
      placeholder: '请输入产品编号/产品名称',
    },
  },
];

export const columns: ITableColumnProps[] = [
  {
    label: '编号',
    type: 'index',
    width: 60,
  },
  {
    label: '产品编号',
    prop: 'number',
    sortable: true,
  },
  {
    label: '服务分类',
    prop: 'type',
    sortable: true,
  },
  {
    label: '国家',
    prop: 'country',
    width: 120,
    sortable: true,
  },
  {
    label: '产品名称',
    prop: 'name',
    width: 140,
    sortable: true,
  },
  {
    label: '是否公证',
    prop: 'isPublicAuth',
    sortable: true,
  },
  {
    label: '是否认证',
    prop: 'isAuth',
    sortable: true,
  },
  {
    label: '标准售价(元)',
    prop: 'saleAmount',
    sortable: true,
  },
  {
    label: '官费(元)',
    prop: 'fee',
    sortable: true,
  },
  {
    label: '备注',
    prop: 'remark',
  },
];
