<script lang="ts" setup>
import type { FormItemType } from '@vben/types';

import { ref } from 'vue';

import ASelect from '#/components/common/select/index.vue';
import TableLayout from '#/components/table-layout/index.vue';

import { invoiceTitleColumns } from '../config';

const formItems: FormItemType[] = [
  {
    label: '抬头类型',
    key: 'type',
    component: ASelect,
    props: {
      placeholder: '请选择抬头类型',
      options: [],
    },
  },
  {
    label: '开票抬头',
    key: 'head',
    props: {
      placeholder: '请输入开票抬头',
    },
  },
];

const selection = ref<string[]>([]);
</script>

<template>
  <TableLayout
    :api="() => {}"
    :columns="invoiceTitleColumns"
    :form-items="formItems"
    :hidden-filter="true"
  >
    <template #action>
      <el-button type="primary">添加</el-button>
      <el-button :disabled="selection.length === 0" type="danger">
        批量删除
      </el-button>
    </template>
  </TableLayout>
</template>
