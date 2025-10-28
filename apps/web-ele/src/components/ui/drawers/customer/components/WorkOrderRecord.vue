<script lang="ts" setup>
import type { FormItemType } from '@vben/types';

import TableLayout from '#/components/table-layout/index.vue';

import { workOrderRecordColumns } from '../config';

const formItems: FormItemType[] = [
  {
    label: '工单编号',
    key: 'number',
    props: {
      placeholder: '请输入工单编号',
    },
  },
];
</script>

<template>
  <TableLayout
    :api="() => {}"
    :columns="workOrderRecordColumns"
    :form-items="formItems"
    :hidden-filter="true"
  />
</template>
