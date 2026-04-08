import type { FormItemType } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

import dayjs from 'dayjs';
import { ElDatePicker } from 'element-plus';

import { getUserList } from '#/api';
import ASelect from '#/components/common/select/index.vue';

export enum MODAL_TYPE {
  INIT = '',
  PROTOCOL = 'protocol',
}

export const formItems: FormItemType[] = [
  {
    label: '业绩结算日期',
    key: 'performanceDate',
    component: ElDatePicker,
    props: {
      placeholder: '业绩结算日期',
      type: 'daterange',
      'start-placeholder': '开始日期',
      'end-placeholder': '结束日期',
    },
  },
  {
    label: '业务员',
    key: 'salesmanId',
    component: ASelect,
    props: {
      placeholder: '请选择业务员',
      api: () =>
        getUserList({
          pageNum: 1,
          pageSize: 999,
          roleCode: 'user',
        }),
      afterGetOptions: (data: any) => data?.records || [],
      labelKey: 'realName',
      valueKey: 'id',
    },
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
    label: '订单编号',
    prop: 'orderNo',
    sortable: true,
    disabledFilter: true,
    width: 250,
  },
  {
    label: '协议编号',
    prop: 'agreementNo',
    sortable: true,
    disabledFilter: true,
    width: 250,
  },
  {
    label: '官费',
    prop: 'officialFee',
    sortable: true,
    format: (v) => v?.toFixed(2),
  },
  {
    label: '订单金额',
    prop: 'orderAmount',
    sortable: true,
    disabledFilter: true,
    width: 180,
    format: (v) => v?.toFixed(2),
  },
  {
    label: '业绩',
    prop: 'performanceAmount',
    sortable: true,
    disabledFilter: true,
    format: (v) => v?.toFixed(2),
  },
  {
    label: '业绩结算日期',
    prop: 'performanceDate',
    sortable: true,
    width: 220,
    disabledFilter: true,
    format: (value) =>
      value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '',
  },
  {
    label: '业务员',
    prop: 'salesmanName',
    sortable: true,
    disabledFilter: true,
  },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
    disabledFilter: true,
    align: 'center',
  },
];
