import type { FormItemType } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { ElInput } from 'element-plus';

export const formItems: FormItemType[] = [
  {
    label: '工单编号',
    component: ElInput,
    key: 'keyword',
    props: {
      placeholder: '请输入工单编号',
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
    label: '工单编号',
    prop: 'number',
    width: 140,
  },
  {
    label: '预警内容',
    prop: 'content',
    sortable: true,
  },
  {
    label: '预警时间',
    prop: 'time',
    sortable: true,
    width: 160,
  },
  {
    label: '预警状态',
    prop: 'status',
    sortable: true,
    width: 120,
  },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
    width: 80,
    align: 'center',
  },
];
