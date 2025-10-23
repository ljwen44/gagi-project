import type { FormItemType, TabbarProps } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { VbenSelect } from '@vben-core/shadcn-ui';

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
    tooltip:
      '支持客户编号/协议编号/异常单号,或任一类型编号的精准多号查询,编号之间用英文逗号分割(,)',
    key: 'keyword',
    props: {
      placeholder: '客户编号/协议编号/异常单号',
      class: 'w-[220px]',
    },
  },
];

export const tabbar: TabbarProps[] = [
  {
    label: '全部工单',
    key: 'all',
  },
  {
    label: '未备注',
    key: 'noremark',
  },
  {
    label: '审核中',
    key: 'auditing',
  },
  {
    label: '公示中',
    key: 'show',
  },
  {
    label: '异常',
    key: 'abnormal',
  },
  {
    label: '暂停',
    key: 'pause',
  },
  {
    label: '电子证书',
    key: 'online',
  },
  {
    label: '纸质证书',
    key: 'paper',
  },
  {
    label: '失败',
    key: 'fail',
  },
];

export const columns: ITableColumnProps[] = [
  {
    label: '编号',
    type: 'index',
    width: 60,
    disabledFilter: true,
  },
  {
    label: '工单编号',
    prop: 'number',
    sortable: true,
  },
  {
    label: '工单类型',
    prop: 'type',
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
    label: '回执时间',
    prop: 'time',
    sortable: true,
  },
  {
    label: '最终状态',
    prop: 'status',
    sortable: true,
  },
  {
    label: '证书类型',
    prop: 'certType',
    sortable: true,
  },
  {
    label: '证书附件',
    prop: 'certAttachment',
    sortable: true,
  },
  {
    label: '快递单号',
    prop: 'expressNumber',
    sortable: true,
  },
  {
    label: '状态备注',
    prop: 'statusRemark',
    sortable: true,
  },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
    disabledFilter: true,
  },
];
