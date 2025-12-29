import type { FormItemType } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

export const formItems: FormItemType[] = [
  // {
  //   label: '角色名称',
  //   key: 'customerName',
  //   props: {
  //     placeholder: '请输入角色名称',
  //   },
  // },
];

export const columns: ITableColumnProps[] = [
  {
    label: '编号',
    type: 'index',
    width: 60,
  },
  {
    label: '角色名',
    prop: 'roleName',
  },
  {
    label: '角色编码',
    prop: 'roleCode',
  },
  {
    label: '角色描述',
    prop: 'description',
  },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
    align: 'center',
  },
];
