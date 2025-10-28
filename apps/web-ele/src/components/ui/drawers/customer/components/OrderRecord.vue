<script lang="ts" setup>
import type { FormItemType } from '@vben/types';

import TableLayout from '#/components/table-layout/index.vue';

import { orderRecordColumns } from '../config';

const formItems: FormItemType[] = [
  {
    label: '关键字',
    key: 'keyword',
    props: {
      placeholder: '请输入关键字',
    },
  },
];
</script>

<template>
  <TableLayout
    :api="() => {}"
    :columns="orderRecordColumns"
    :form-items="formItems"
    :hidden-filter="true"
  >
    <template #action>
      <el-button type="primary">添加</el-button>
    </template>
  </TableLayout>
</template>
