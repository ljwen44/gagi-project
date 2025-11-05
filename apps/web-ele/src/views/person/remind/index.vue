<script lang="ts" setup>
import { Check } from '@vben/icons';
import { mockApi } from '@vben/utils';

import TableLayout from '#/components/table-layout/index.vue';

import { columns, formItems } from './config';
</script>

<template>
  <TableLayout
    :api="() => mockApi(columns)"
    :columns
    :form-items="formItems"
    :hidden-filter="true"
  >
    <template #number="{ row }">
      <el-link type="primary">{{ row.number }}</el-link>
    </template>
    <template #operator>
      <div class="flex items-center justify-center">
        <Check class="size-4 text-green-600" />
      </div>
    </template>
  </TableLayout>
</template>

<style lang="scss" scoped></style>
