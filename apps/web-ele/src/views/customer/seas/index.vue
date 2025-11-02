<script lang="ts" setup>
import { ref } from 'vue';

import { Inbox } from '@vben/icons';
import { mockApi } from '@vben/utils';

import TableLayout from '#/components/table-layout/index.vue';
import CustomerDetailDrawer from '#/components/ui/drawers/customer/customerDetail.vue';

import { columns, formItems } from './config';

const showModal = ref(false);
</script>

<template>
  <TableLayout :api="() => mockApi(columns)" :columns :form-items="formItems">
    <template #action>
      <el-button type="primary"> 批量领取 </el-button>
    </template>

    <template #customerCode="{ row }">
      <el-link type="primary" @click="showModal = true">
        {{ row.customerCode }}
      </el-link>
    </template>
    <template #tag="{ row }">
      <el-tag v-for="tag in row.tag" :key="tag" class="mr-0.5" type="primary">
        {{ tag }}
      </el-tag>
    </template>
    <template #operator>
      <div
        class="flex cursor-pointer items-center gap-1 text-[var(--el-color-primary)]"
      >
        <Inbox class="size-4" />
        <span>领取</span>
      </div>
    </template>

    <CustomerDetailDrawer id="" :show="showModal" @closed="showModal = false" />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
