<script lang="ts" setup>
import type { FormItemType } from '@vben/types';

import TableLayout from '#/components/table-layout/index.vue';

import { abnormalOrderColumns } from '../config';

const formItems: FormItemType[] = [
  {
    label: '异常单号',
    key: 'number',
    props: {
      placeholder: '请输入异常单号',
    },
  },
];
</script>

<template>
  <TableLayout
    :api="() => {}"
    :columns="abnormalOrderColumns"
    :form-items="formItems"
    :hidden-filter="true"
  />
</template>
