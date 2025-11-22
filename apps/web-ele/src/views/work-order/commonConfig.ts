import type { FormItemType, TabbarProps } from '@vben/types';

export enum MODAL_TYPE {
  BRANDOBJECTION = 'brand-objection',
  BRANDREGISTER = 'brand-register',
  BRANDRENEWAL = 'brand-renewal',
  BRANDUPDATE = 'brand-update',
  COPYRIGHT = 'copyright',
  CUSTOMER = 'customer',
  INIT = '',
  PATENTAPPLY = 'patent-apply',
  PATENTOBJECTION = 'patent-objection',
  PATENTUPDATE = 'patent-update',
  PROTOCOL = 'protocol',
  REVIEW = 'review',
  SPECIAL = 'special',
  WORKORDER = 'workOrder',
}

export const formItems: FormItemType[] = [
  {
    label: '国家',
    key: 'country',
    width: 36,
    // component: VbenSelect,
    props: {
      placeholder: '请输入',
      // options: [],
    },
  },
  {
    label: '工单编号',
    // tooltip:
    //   '支持客户编号/协议编号/异常单号,或任一类型编号的精准多号查询,编号之间用英文逗号分割(,)',
    key: 'agreementNo',
    props: {
      placeholder: '请输入工单编号',
      // placeholder: '客户编号/协议编号/异常单号',
      class: 'w-[220px]',
    },
  },
];

export const tabbar: TabbarProps[] = [
  {
    label: '全部工单',
    key: 'all',
    permissionCode: 'workorder:query:productA:all',
  },
  {
    label: '未备注',
    key: 'unremark',
    permissionCode: 'workorder:query:productA:unremark',
  },
  {
    label: '审核中',
    key: 'reviewing',
    permissionCode: 'workorder:query:productA:reviewing',
  },
  {
    label: '公示中',
    key: 'publicing',
    permissionCode: 'workorder:query:productA:publicing',
  },
  {
    label: '异常',
    key: 'abnormal',
    permissionCode: 'workorder:query:productA:abnormal',
  },
  {
    label: '暂停',
    key: 'paused',
    permissionCode: 'workorder:query:productA:paused',
  },
  {
    label: '电子证书',
    key: 'electronic',
    permissionCode: 'workorder:query:productA:electronic',
  },
  {
    label: '纸质证书',
    key: 'paper',
    permissionCode: 'workorder:query:productA:paper',
  },
  {
    label: '失败',
    key: 'failed',
    permissionCode: 'workorder:query:productA:failed',
  },
];

export const TagTypeMap: Record<number, string> = {
  0: 'info',
  1: 'success',
  2: 'danger',
};

export const AuditStatusMap: Record<number, string> = {
  0: '待审核',
  1: '审核通过',
  2: '审核驳回',
};

export const ConfirmMap: Record<number, string> = {
  0: '未确认',
  1: '已确认',
};

export const ReceiveStatusMap: Record<number, string> = {
  0: '未接单',
  1: '已接单',
};

export const WorkStatusMap: Record<number, string> = {
  0: '未结单',
  1: '已结单',
};
