import type { IFormItem } from '#/components/common/form/index.vue';

import ARadioGroup from '#/components/common/radio/index.vue';
import AUpload from '#/components/common/upload/index.vue';

export const modalFormItems: IFormItem[] = [
  {
    label: '请假单号',
    prop: 'leaveNo',
    class: 'col-span-2',
    componentProps: {
      placeholder: '请输入请假单号',
      disabled: true,
      style: {
        width: '50%',
      },
    },
  },
  {
    label: '请假类型',
    prop: 'leaveNature',
    class: 'col-span-2',
    component: ARadioGroup,
    componentProps: {
      options: [
        { label: '病假(能提供正规医院出具的病例证明才能选择)', value: '病假' },
        { label: '事假', value: '事假' },
        { label: '年假', value: '年假' },
        { label: '产假', value: '产假' },
        { label: '婚假', value: '婚假' },
      ],
    },
  },
  {
    label: '请假时间',
    prop: 'time',
    component: 'el-date-picker',
    componentProps: {
      type: 'datetimerange',
      'range-separator': '至',
      'start-placeholder': '开始时间',
      'end-placeholder': '结束时间',
      'value-format': 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '请假天数',
    prop: 'leaveDays',
    component: 'el-input-number',
    componentProps: {
      'controls-position': 'right',
      precision: 0,
      style: {
        width: '100%',
      },
    },
  },
  {
    label: '备注',
    prop: 'remark',
    class: 'col-span-2',
    component: 'el-input',
    componentProps: {
      placeholder: '请输入付款说明',
      maxlength: 500,
      'show-word-limit': true,
      type: 'textarea',
    },
  },
  {
    label: '附件',
    prop: 'fileIds',
    class: 'col-span-2',
    component: AUpload,
    componentProps: {
      'business-type': 'leaveApply',
      'has-custom-class': false,
      'hidden-tip': true,
      drag: true,
      class: 'w-full',
    },
  },
];

export const rules = {
  leaveNo: [{ required: true, message: '请输入请假单号', trigger: 'blur' }],
  leaveNature: [
    { required: true, message: '请选择请假类型', trigger: 'change' },
  ],
  time: [{ required: true, message: '请选择请假时间', trigger: 'change' }],
  leaveDays: [{ required: true, message: '请输入请假天数', trigger: 'blur' }],
};
