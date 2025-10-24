import type { IFormItem } from '#/components/common/form/index.vue';

import ARadioGroup from '#/components/common/radio/index.vue';

export const modalFormItems: IFormItem[] = [
  {
    label: '请假单号',
    prop: 'number',
    class: 'col-span-2',
    componentProps: {
      placeholder: '请输入请假单号',
      disabled: (form: any) => !!form.id,
      style: {
        width: '50%',
      },
    },
  },
  {
    label: '请假类型',
    prop: 'type',
    class: 'col-span-2',
    component: ARadioGroup,
    componentProps: {
      options: [
        { label: '病假(能提供正规医院出具的病例证明才能选择)', value: '1' },
        { label: '事假', value: '2' },
        { label: '年假', value: '3' },
        { label: '产假', value: '4' },
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
    },
  },
  {
    label: '请假天数',
    prop: 'days',
    component: 'el-input-number',
    componentProps: {
      'controls-position': 'right',
      precision: 2,
      style: {
        width: '100%',
      },
    },
  },
  {
    label: '请假原因',
    prop: 'reason',
    class: 'col-span-2',
    component: 'el-input',
    componentProps: {
      placeholder: '请输入请假原因',
      maxlength: 500,
      'show-word-limit': true,
      type: 'textarea',
    },
  },
];

export const rules = {
  number: [{ required: true, message: '请输入请假单号', trigger: 'blur' }],
  type: [{ required: true, message: '请选择请假类型', trigger: 'change' }],
  time: [{ required: true, message: '请选择请假时间', trigger: 'change' }],
  days: [{ required: true, message: '请输入请假天数', trigger: 'blur' }],
  reason: [{ required: true, message: '请输入请假原因', trigger: 'blur' }],
};
