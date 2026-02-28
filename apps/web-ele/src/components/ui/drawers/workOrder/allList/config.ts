import type { IComponent } from '../../common/type';

import type { IFormItem } from '#/components/common/form/index.vue';
import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { defineAsyncComponent } from 'vue';

import dayjs from 'dayjs';

export enum WorkOrderEnum {
  abnormalOrder = 'abnormalOrder',
  attachment = 'attachment',
  confirm = 'confirm',
  detail = 'detail',
  followRecord = 'followRecord',
  operatorRecord = 'operatorRecord',
  protocol = 'protocol',
  share = 'share',
}

export const drawerFormItems: IFormItem[] = [
  { label: '工单编号', prop: 'orderNo' },
  { label: '工单类型', prop: 'categoryName' },
  { label: '客户编号', prop: 'customerNo' },
  { label: '协议编号', prop: 'agreementNo' },
  { label: '国家', prop: 'country' },
  { label: '产品分类', prop: 'productName' },
  { label: '所属人', prop: 'username', class: 'col-span-3' },
  // { label: '', prop: 'finalStatus' },
  { label: '接单状态', prop: 'receiveStatus' },
  { label: '做单状态', prop: 'workStatus' },
  { label: '审核状态', prop: 'auditStatus' },
  { label: '状态备注', prop: 'remark', class: 'col-span-3' },
];

export const workOrderTabs = [
  { label: '工单详情', key: WorkOrderEnum.detail },
  { label: '工单确认书', key: WorkOrderEnum.confirm },
  { label: '工单附件', key: WorkOrderEnum.attachment },
  { label: '关联协议', key: WorkOrderEnum.protocol },
  { label: '关联异常单', key: WorkOrderEnum.abnormalOrder },
  { label: '跟进记录', key: WorkOrderEnum.followRecord },
  { label: '共享人员', key: WorkOrderEnum.share },
  { label: '操作记录', key: WorkOrderEnum.operatorRecord },
];

export const detailFormItems: IFormItem[] = [
  { label: '回执号', prop: 'receiptNumber', class: 'col-span-2' },
  { label: '申请人名称', prop: 'applicantName' },
  { label: '法人名称', prop: 'legalName' },
  { label: '申请人地址', prop: 'applicantAddress' },
  { label: '申请人邮编', prop: 'applicantZipCode' },
  { label: '发明人/创作人名称', prop: 'inventorName' },
  { label: '发明人/创作人地址', prop: 'inventorAddress' },
  { label: '发明人/创作人邮编', prop: 'inventorZipCode', class: 'col-span-2' },
  { label: '知识产权名称', prop: 'knowledgeName' },
  { label: '专利类型', prop: 'patentType' },
  { label: '知识产权图', prop: 'knowledgeImage', class: 'col-span-2' },
  { label: '产品是否已公开', prop: 'productPublic', class: 'col-span-2' },
  { label: '其他国家是否申请', prop: 'otherCountryApply', class: 'col-span-2' },
  { label: '说明', prop: 'description', class: 'col-span-2' },
];

export const orderConfirmColumns: ITableColumnProps[] = [
  { label: '文件原始名称', prop: 'fileName' },
  { label: '文件存储路径', prop: 'filePath' },
  {
    label: '文件大小',
    prop: 'fileSize',
    format: (value: number) => {
      // 判断文件大小
      if (value < 1024) {
        return `${value}B`;
      }
      const m = 1024 * 1024;
      if (value <= m) {
        return `${(value / 1024).toFixed(1)}KB`;
      }

      const g = m * 1024;
      if (value <= g) {
        return `${(value / m).toFixed(1)}MB`;
      }
      return `${(value / g).toFixed(1)}MB`;
    },
  },
  { label: '文件访问URL', prop: 'fileUrl' },
  {
    label: '上传时间',
    prop: 'uploadTime',
    format: (value: string) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
  },
];

export const orderAttachmentColumns: ITableColumnProps[] = [
  { label: '编号', type: 'index', fixed: 'left', width: 60 },
  { label: '文件名称', prop: 'fileName' },
  { label: '文件类型', prop: 'fileSuffix' },
  {
    label: '文件大小',
    prop: 'fileSize',
    format: (value: number) => {
      // 判断文件大小
      if (value < 1024) {
        return `${value}B`;
      }
      const m = 1024 * 1024;
      if (value <= m) {
        return `${(value / 1024).toFixed(1)}KB`;
      }

      const g = m * 1024;
      if (value <= g) {
        return `${(value / m).toFixed(1)}MB`;
      }
      return `${(value / g).toFixed(1)}MB`;
    },
  },
  { label: '上传人', prop: 'uploadUserId' },
  { label: '上传时间', prop: 'uploadTime' },
  { label: '操作', prop: 'operator', fixed: 'right' },
];

export const abnormalOrderColumns: ITableColumnProps[] = [
  { label: '编号', type: 'index', width: 60 },
  { label: '异常单号', prop: 'number', sortable: true },
  { label: '客户名称', prop: 'customerName', sortable: true },
  { label: '客户编号', prop: 'customerNo', sortable: true },
  { label: '协议编号', prop: 'agreementNo', sortable: true },
  { label: '客户确认', prop: 'customerConfirm', sortable: true },
  { label: '接单状态', prop: 'orderStatus', sortable: true },
  { label: '做单状态', prop: 'acceptStatus', sortable: true },
  { label: '结单确认', prop: 'confirm', sortable: true },
  { label: '处理方式', prop: 'method', sortable: true },
  { label: '所属人', prop: 'username' },
  { label: '真实名', prop: 'realName' },
  { label: '所属部门', prop: 'group' },
  { label: '部门负责人', prop: 'leader', width: 100 },
  { label: '所属公司', prop: 'belongCompany' },
  { label: '主做单人', prop: 'owner', sortable: true },
  { label: '创建人', prop: 'createdBy', sortable: true },
  { label: '创建时间', prop: 'createdTime', sortable: true },
  { label: '操作', prop: 'operator', fixed: 'right' },
];

export const componentsMap: Record<any, IComponent> = {
  [WorkOrderEnum.followRecord]: {
    component: defineAsyncComponent(
      () => import('../../common/FollowUpRecord.vue'),
    ),
  },
  [WorkOrderEnum.share]: {
    component: defineAsyncComponent(
      () => import('../../common/SharePerson.vue'),
    ),
  },
  [WorkOrderEnum.operatorRecord]: {
    component: defineAsyncComponent(
      () => import('../../common/OperatorRecord.vue'),
    ),
  },
  [WorkOrderEnum.detail]: {
    component: defineAsyncComponent(
      () => import('../../common/WorkOrderDetail.vue'),
    ),
  },
  [WorkOrderEnum.confirm]: {
    component: defineAsyncComponent(
      () => import('./components/OrderConfirm.vue'),
    ),
  },
  [WorkOrderEnum.attachment]: {
    component: defineAsyncComponent(
      () => import('../../common/OrderAttachment.vue'),
    ),
    props: {
      columns: orderAttachmentColumns,
    },
  },
  [WorkOrderEnum.protocol]: {
    component: defineAsyncComponent(
      () => import('../../common/ProtocolTable.vue'),
    ),
  },
  [WorkOrderEnum.abnormalOrder]: {
    component: defineAsyncComponent(
      () => import('./components/AbnormalOrder.vue'),
    ),
  },
};
