import type { ITableColumnProps } from '#/components/common/table/index.vue';

export const columns: ITableColumnProps[] = [
  {
    label: '编号',
    type: 'index',
    width: 60,
    disabledFilter: true,
  },
  {
    label: '异常单号',
    prop: 'number',
    sortable: true,
  },
  {
    label: '国家',
    prop: 'country',
    sortable: true,
  },
  {
    label: '产品名称',
    prop: 'productName',
    sortable: true,
  },
  {
    label: '客户名称',
    prop: 'customerName',
    sortable: true,
  },
  {
    label: '客户编号',
    prop: 'customerNumber',
    sortable: true,
  },
  {
    label: '协议编号',
    prop: 'protocolNumber',
    sortable: true,
  },
  {
    label: '关联工单',
    prop: 'workOrderNumber',
    sortable: true,
  },
  {
    label: '审核状态',
    prop: 'status',
    sortable: true,
  },
  {
    label: '做单状态',
    prop: 'acceptStatus',
    sortable: true,
  },
  {
    label: '结单确认',
    prop: 'confirm',
    sortable: true,
  },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
    disabledFilter: true,
  },
];
