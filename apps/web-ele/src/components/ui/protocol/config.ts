import type { ITableColumnProps } from '#/components/common/table/index.vue';

export const rules = {
  protocolHead: [
    { required: true, message: '请选择协议抬头', trigger: 'change' },
  ],
  protocolType: [
    { required: true, message: '请选择协议类型', trigger: 'change' },
  ],
  head: [{ required: true, message: '请输入签约抬头', trigger: 'blur' }],
  protocolAmount: [
    { required: true, message: '请输入协议金额', trigger: 'blur' },
  ],
  actualAmount: [
    { required: true, message: '请输入实收金额', trigger: 'blur' },
  ],
  budgetPerformance: [
    { required: true, message: '请输入预算业绩', trigger: 'blur' },
  ],
  actualPerformance: [
    { required: true, message: '请输入实际业绩', trigger: 'blur' },
  ],
  protocolCost: [
    { required: true, message: '请输入协议成本', trigger: 'blur' },
  ],
  protocolTax: [{ required: true, message: '请输入协议税费', trigger: 'blur' }],
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
