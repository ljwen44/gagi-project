<script lang="ts" setup>
import { useTemplateRef } from 'vue';

import { Inbox } from '@vben/icons';
import { mockApi } from '@vben/utils';

import TableLayout from '#/components/table-layout/index.vue';
import CustomerForm from '#/components/ui/customer/form.vue';

import { columns, formItems } from './config';

const customerFormRef = useTemplateRef('customerFormRef');
// const modelType = ref('');
</script>

<template>
  <TableLayout :api="() => mockApi(columns)" :columns :form-items>
    <template #action>
      <el-button type="primary" @click="customerFormRef?.openModal()">
        新增
      </el-button>
    </template>

    <template #customerCode="{ row }">
      <el-link type="primary">{{ row.customerCode }}</el-link>
    </template>

    <template #operator>
      <div class="flex items-center gap-1 text-[var(--el-color-primary)]">
        <Inbox class="size-4" />
        <span>协同</span>
      </div>
    </template>

    <CustomerForm ref="customerFormRef" />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
