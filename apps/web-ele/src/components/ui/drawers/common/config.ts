import type { ITableColumnProps } from '#/components/common/table/index.vue';

export const protocolDetailColumns: ITableColumnProps[] = [
  {
    label: '编号',
    type: 'index',
    width: 60,
    disabledFilter: true,
  },
  {
    label: '协议编号',
    prop: 'agreementNo',
    sortable: true,
    width: 150,
  },
  {
    label: '客户编号',
    prop: 'customerNo',
    sortable: true,
  },
  {
    label: '客户名称',
    prop: 'customerName',
    sortable: true,
  },
  {
    label: '公司名称',
    prop: 'custTitle',
    sortable: true,
  },
  {
    label: '审核状态',
    prop: 'status',
    sortable: true,
    width: 150,
  },
  {
    label: '协议金额',
    prop: 'agreementAmount',
    format: (value) => value?.toFixed(2),
    width: 150,
  },
  {
    label: '实收金额',
    prop: 'receivedAmount',
    sortable: true,
    format: (value) => value?.toFixed(2),
    width: 150,
  },
  {
    label: '协议税额',
    prop: 'agreementTax',
    sortable: true,
    format: (value) => value?.toFixed(2),
    width: 150,
  },
  {
    label: '预算业绩',
    prop: 'budgetPerformance',
    format: (value) => value?.toFixed(2),
    width: 150,
  },
  {
    label: '实际业绩',
    prop: 'actualPerformance',
    sortable: true,
    format: (value) => value?.toFixed(2),
    width: 150,
  },
  {
    label: '销售成本',
    prop: 'salesCost',
    sortable: true,
    format: (value) => value?.toFixed(2),
    width: 150,
  },
  {
    label: '订单备注',
    prop: 'orderRemark',
    sortable: true,
  },
  {
    label: '协议备注',
    prop: 'agreementRemark',
    sortable: true,
  },
  {
    label: '所属人',
    prop: 'username',
  },
  {
    label: '真实名',
    prop: 'realName',
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
];
