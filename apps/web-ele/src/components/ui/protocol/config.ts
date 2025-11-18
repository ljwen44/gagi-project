import type { ITableColumnProps } from '#/components/common/table/index.vue';

export const rules = {
  protocolHead: [
    { required: true, message: '请选择协议抬头', trigger: 'change' },
  ],
  protocolType: [
    { required: true, message: '请选择协议类型', trigger: 'change' },
  ],
  head: [{ required: true, message: '请输入签约抬头', trigger: 'blur' }],
  agreementAmount: [
    { required: true, message: '请输入协议金额', trigger: 'blur' },
  ],
  receivedAmount: [
    { required: true, message: '请输入实收金额', trigger: 'blur' },
  ],
  budgetPerformance: [
    { required: true, message: '请输入预算业绩', trigger: 'blur' },
  ],
  actualPerformance: [
    { required: true, message: '请输入实际业绩', trigger: 'blur' },
  ],
  agreementCost: [
    { required: true, message: '请输入协议成本', trigger: 'blur' },
  ],
  agreementTax: [
    { required: true, message: '请输入协议税费', trigger: 'blur' },
  ],
  product: [{ required: true, message: '请选择', trigger: 'change' }],
};

export const protocolProductColumns: ITableColumnProps[] = [
  { label: '产品名称', prop: 'name' },
  { label: '服务分类', prop: 'service' },
  { label: '国家', prop: 'country' },
  { label: '官费(元)', prop: 'official' },
  { label: '售价(元)', prop: 'price' },
  { label: '数量(标)', prop: 'number' },
  { label: '附加项', prop: 'extra' },
  { label: '操作', prop: 'operator', fixed: 'right' },
];

export const agreementTypeOptions = [
  { label: '普通协议', value: 'normal' },
  { label: '异常协议', value: 'abnormal' },
];

export const productColumns: ITableColumnProps[] = [
  {
    type: 'selection',
    width: 60,
  },
  {
    label: '编号',
    type: 'index',
    width: 60,
  },
  {
    label: '产品编号',
    prop: 'productNo',
    sortable: true,
  },
  {
    label: '服务分类',
    prop: 'categoryId',
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
    prop: 'productName',
    width: 140,
    sortable: true,
  },
  {
    label: '是否公证',
    prop: 'isCertified',
    sortable: true,
    format: (value: number) => (value ? '是' : '否'),
  },
  {
    label: '是否认证',
    prop: 'isNotarized',
    sortable: true,
    format: (value: number) => (value ? '是' : '否'),
  },
  {
    label: '标准售价(元)',
    prop: 'standardPrice',
    sortable: true,
    format: (value: number) => value?.toFixed(2),
  },
  {
    label: '官费(元)',
    prop: 'officialFee',
    sortable: true,
    format: (value: number) => value?.toFixed(2),
  },
];
