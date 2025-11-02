import type { FormItemType, TabbarProps } from '@vben/types';

import { VbenSelect } from '@vben-core/shadcn-ui';

export enum MODAL_TYPE {
  BRANDOBJECTION = 'brand-objection',
  BRANDPDATE = 'brand-update',
  BRANDREGISTER = 'brand-register',
  BRANDRENEWAL = 'brand-renewal',
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
