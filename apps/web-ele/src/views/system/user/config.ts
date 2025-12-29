import type { FormItemType } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

export const formItems: FormItemType[] = [
  // {
  //   label: '用户名称',
  //   key: 'customerName',
  //   props: {
  //     placeholder: '请输入用户名称',
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
    label: '用户名',
    prop: 'username',
    sortable: true,
  },
  {
    label: '真实名',
    prop: 'realName',
    sortable: true,
  },
  {
    label: '手机号',
    prop: 'phone',
    sortable: true,
  },
  {
    label: '邮箱',
    prop: 'email',
    sortable: true,
  },
  {
    label: '角色',
    prop: 'roleName',
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: 180,
  },
  {
    label: '更新时间',
    prop: 'updateTime',
    width: 180,
  },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
    align: 'center',
  },
];
