<script lang="ts" setup>
import type { FormItemType } from '@vben/types';

import TableLayout from '#/components/table-layout/index.vue';

import { businessRecordColumns } from '../config';

const formItems: FormItemType[] = [
  {
    label: '商机名称',
    key: 'name',
    props: {
      placeholder: '请输入商机名称',
    },
  },
];
</script>

<template>
  <TableLayout
    :api="() => {}"
    :columns="businessRecordColumns"
    :form-items="formItems"
    :hidden-filter="true"
  >
    <template #action>
      <el-button type="primary">添加</el-button>
      <el-button type="danger">批量删除</el-button>
    </template>
  </TableLayout>
</template>
