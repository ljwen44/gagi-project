<script lang="ts" setup>
import { ref } from 'vue';

import { Inbox } from '@vben/icons';

import { getCustomerList } from '#/api/core/customer';
import TableLayout from '#/components/table-layout/index.vue';
import CustomerDetailDrawer from '#/components/ui/drawers/customer/customerDetail.vue';

import { columns, formItems } from './config';

const showModal = ref(false);
const selection = ref([]);
const currentForm = ref({});

const beforeQuery = (queryParams: Record<string, any>) => {
  queryParams.isPublicSea = 1;
};

const handleSelectionChange = (value: any) => {
  selection.value = value;
};

const openCustomerDetail = (row: any) => {
  currentForm.value = structuredClone(row);
  showModal.value = true;
};
</script>

<template>
  <TableLayout
    :api="getCustomerList"
    :before-query
    :columns
    :form-items="formItems"
    @selection-change="handleSelectionChange"
  >
    <template #action>
      <el-button :disabled="selection.length <= 0" type="primary">
        批量领取
      </el-button>
    </template>

    <template #customerNo="{ row }">
      <el-text type="primary" @click="openCustomerDetail">
        {{ row.customerNo }}
      </el-text>
    </template>
    <template #tags="{ row }">
      <el-tag
        v-for="tag in row.tags?.split(',')"
        :key="tag"
        class="mr-0.5"
        type="primary"
      >
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

    <CustomerDetailDrawer
      :form="currentForm"
      :show="showModal"
      @closed="showModal = false"
    />
  </TableLayout>
</template>
