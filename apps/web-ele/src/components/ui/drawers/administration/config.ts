import type { IFormItem } from '#/components/common/form/index.vue';
import type { ITableColumnProps } from '#/components/common/table/index.vue';

export const reimbursementFormItems: IFormItem[] = [
  {
    label: '报销单号',
    prop: 'number',
  },
  {
    label: '报销金额',
    prop: 'amount',
  },
  {
    label: '审核状态',
    prop: 'status',
    class: 'col-span-2',
  },
  {
    label: '收款账号',
    prop: 'account',
  },
  {
    label: '账户名称',
    prop: 'accountName',
  },
  {
    label: '开户行',
    prop: 'type',
    class: 'col-span-2',
  },
  {
    label: '姓名',
    prop: 'name',
  },
  {
    label: '所属部门',
    prop: 'dept',
  },
  {
    label: '部门负责人',
    prop: 'leader',
  },
  {
    label: '所属公司',
    prop: 'company',
  },
  {
    label: '报销凭证',
    prop: 'attachments',
    class: 'col-span-2',
  },
  {
    label: '报销时间',
    prop: 'time',
    class: 'col-span-2',
  },
];

export const reimbursementDetailColumns: ITableColumnProps[] = [
  {
    label: '报销类型',
    prop: 'type',
  },
  {
    label: '报销时间',
    prop: 'time',
  },
  {
    label: '报销金额(元)',
    prop: 'amount',
  },
  {
    label: '报销说明',
    prop: 'desc',
  },
];

export const paymentFormItems: IFormItem[] = [
  {
    label: '付款单号',
    prop: 'number',
  },
  {
    label: '项目名称',
    prop: 'projectName',
  },
  {
    label: '审核状态',
    prop: 'status',
    class: 'col-span-2',
  },
  {
    label: '付款金额 ',
    prop: 'amount',
  },
  {
    label: '账户名称',
    prop: 'accountName',
  },
  {
    label: '收款账号',
    prop: 'account',
  },
  {
    label: '开户行',
    prop: 'type',
  },
  {
    label: '姓名',
    prop: 'name',
  },
  {
    label: '所属部门',
    prop: 'dept',
  },
  {
    label: '部门负责人',
    prop: 'leader',
  },
  {
    label: '所属公司',
    prop: 'company',
  },
  {
    label: '合同文件',
    prop: 'attachments',
    class: 'col-span-2',
  },
  {
    label: '申请时间',
    prop: 'applyTime',
    class: 'col-span-2',
  },
  {
    label: '备注',
    prop: 'remark',
    class: 'col-span-4',
  },
];

export const paymentDetailColumns: ITableColumnProps[] = [
  {
    label: '编号',
    prop: 'index',
    width: 80,
  },
  {
    label: '文件名称',
    prop: 'fileName',
  },
  {
    label: '文件类型',
    prop: 'fileType',
  },
  {
    label: '文件大小',
    prop: 'fileSize',
  },
  {
    label: '上传人',
    prop: 'createdBy',
  },
  {
    label: '上传时间',
    prop: 'updatedTime',
  },
  {
    label: '操作',
    prop: 'operator',
  },
];

export const restFormItems: IFormItem[] = [
  {
    label: '请假单号',
    prop: 'number',
  },
  {
    label: '请假类型',
    prop: 'type',
  },
  {
    label: '审核状态',
    prop: 'status',
    class: 'col-span-2',
  },
  {
    label: '开始时间',
    prop: 'startTime',
  },
  {
    label: '截止时间',
    prop: 'endTime',
  },
  {
    label: '请假天数',
    prop: 'days',
    class: 'col-span-2',
  },
  {
    label: '申请人',
    prop: 'owner',
  },
  {
    label: '申请时间',
    prop: 'applyTime',
    class: 'col-span-3',
  },
  {
    label: '真实名',
    prop: 'name',
  },
  {
    label: '所属部门',
    prop: 'dept',
  },
  {
    label: '部门负责人',
    prop: 'leader',
  },
  {
    label: '所属公司',
    prop: 'company',
  },
  {
    label: '请假原因',
    prop: 'reason',
    class: 'col-span-4',
  },
];

export const refundFormItems: IFormItem[] = [
  {
    label: '退款单号',
    prop: 'number',
  },
  {
    label: '退款类型',
    prop: 'type',
  },
  {
    label: '审核状态',
    prop: 'status',
    class: 'col-span-2',
  },
  {
    label: '协议编号',
    prop: 'protocolCode',
  },
  {
    label: '退款金额',
    prop: 'amount',
    class: 'col-span-3',
  },
  {
    label: '申请人',
    prop: 'owner',
  },
  {
    label: '申请时间',
    prop: 'applyTime',
    class: 'col-span-3',
  },
  {
    label: '真实名',
    prop: 'name',
  },
  {
    label: '所属部门',
    prop: 'dept',
  },
  {
    label: '部门负责人',
    prop: 'leader',
  },
  {
    label: '所属公司',
    prop: 'company',
  },
  {
    label: '退款证明',
    prop: 'attchments',
    class: 'col-span-2',
  },
  {
    label: '退款说明',
    prop: 'reason',
    class: 'col-span-4',
  },
];

export const refundDetailColumns: ITableColumnProps[] = [
  {
    label: '编号',
    prop: 'index',
    width: 80,
  },
  {
    label: '文件名称',
    prop: 'fileName',
  },
  {
    label: '文件类型',
    prop: 'fileType',
  },
  {
    label: '文件大小',
    prop: 'fileSize',
  },
  {
    label: '上传人',
    prop: 'createdBy',
  },
  {
    label: '上传时间',
    prop: 'updatedTime',
  },
  {
    label: '操作',
    prop: 'operator',
  },
];

export const invoiceFormItems: IFormItem[] = [
  {
    label: '发票单号',
    prop: 'title',
  },
  {
    label: '关联协议',
    prop: 'bindProtocol',
  },
  {
    label: '签约抬头',
    prop: 'signHead',
  },
  {
    label: '审核状态',
    prop: 'status',
  },
  {
    label: '抬头类型',
    prop: 'type',
  },
  {
    label: '开票抬头',
    prop: 'head',
  },
  {
    label: '纳税人识别号',
    prop: 'owner',
  },
  {
    label: '开户银行',
    prop: 'bank',
  },
  {
    label: '银行账号',
    prop: 'bankAccount',
  },
  {
    label: '单位电话',
    prop: 'phone',
  },
  {
    label: '单位地址',
    prop: 'addr',
    class: 'col-span-2',
  },
  {
    label: '开票类型',
    prop: 'invoiceType',
  },
  {
    label: '开票金额',
    prop: 'amount',
  },
  {
    label: '是否含税',
    prop: 'hasTax',
    class: 'col-span-2',
  },
  {
    label: '收件人名称',
    prop: 'recipient',
  },
  {
    label: '收件人手机号',
    prop: 'recipientPhone',
  },
  {
    label: '收件人地址',
    prop: 'recipientAddr',
    class: 'col-span-2',
  },
  {
    label: '申请人',
    prop: 'owner',
  },
  {
    label: '申请时间',
    prop: 'applyTime',
    class: 'col-span-3',
  },
  {
    label: '真实名',
    prop: 'name',
  },
  {
    label: '所属部门',
    prop: 'dept',
  },
  {
    label: '部门负责人',
    prop: 'leader',
  },
  {
    label: '所属公司',
    prop: 'company',
  },
];

export const invoiceDetailColumns: ITableColumnProps[] = [
  {
    label: '产品名称',
    prop: 'productName',
  },
  {
    label: '服务分类',
    prop: 'servieType',
  },
  {
    label: '国家',
    prop: 'country',
  },
  {
    label: '售价(元)',
    prop: 'price',
  },
  {
    label: '官费(元)',
    prop: 'fee',
  },
  {
    label: '数量(标)',
    prop: 'quantities',
  },
  {
    label: '附加项',
    prop: 'attach',
  },
  {
    label: '销售额(元)',
    prop: 'sale',
  },
  {
    label: '销售业绩(元)',
    prop: 'performance',
  },
];
