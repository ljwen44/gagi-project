import type { FormItemType, TabbarProps } from '@vben/types';

import type { ITableColumnProps } from '#/components/common/table/index.vue';

export const formItems: FormItemType[] = [
  {
    label: '关键字',
    key: 'keyword',
    props: {
      placeholder: '请输入活动名称/活动类型',
    },
  },
];

export const tabbar: TabbarProps[] = [
  {
    label: '全部活动',
    key: 'all',
  },
  {
    label: '专利专题',
    key: 'patent',
  },
];

export const tableBar = [
  { label: '全部', value: 'all' },
  { label: '计划中', value: 'planning' },
  { label: '已发布', value: 'publish' },
  { label: '已结束', value: 'end' },
];

export const columns: ITableColumnProps[] = [
  {
    label: '编号',
    type: 'index',
    width: 60,
    disabledFilter: true,
    fixed: 'left',
  },
  {
    label: '活动名称',
    prop: 'activityName',
    sortable: true,
  },
  {
    label: '活动类型',
    prop: 'type',
    sortable: true,
  },
  {
    label: '活动状态',
    prop: 'status',
    sortable: true,
  },
  {
    label: '开始时间',
    prop: 'startTime',
    sortable: true,
  },
  {
    label: '结束时间',
    prop: 'endTime',
    sortable: true,
  },
  {
    label: '活动地点',
    prop: 'addr',
  },
  {
    label: '活动人数(个)',
    prop: 'persons',
    sortable: true,
  },
  {
    label: '授权邀约人',
    prop: 'visitors',
    width: 100,
  },
  {
    label: '活动目的',
    prop: 'purpose',
  },
  {
    label: '活动内容',
    prop: 'content',
  },
  {
    label: '活动预期',
    prop: 'expect',
  },
  {
    label: '目标人群',
    prop: 'targetPerson',
  },
  {
    label: '备注',
    prop: 'remark',
  },
  {
    label: '创建人',
    prop: 'createdBy',
    sortable: true,
  },
  {
    label: '真实名',
    prop: 'username',
    width: 100,
  },
  {
    label: '所属部门',
    prop: 'group',
  },
  {
    label: '部门负责人',
    prop: 'leader',
    width: 120,
  },
  {
    label: '所属公司',
    prop: 'company',
  },
  {
    label: '创建时间',
    prop: 'createdTime',
    sortable: true,
  },
  {
    label: '创建人',
    prop: 'createdBy',
    sortable: true,
  },
  {
    label: '操作',
    prop: 'operator',
    fixed: 'right',
    disabledFilter: true,
  },
];
