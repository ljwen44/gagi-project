<script lang="ts" setup>
import { computed, ref } from 'vue';

import TableLayout from '#/components/table-layout/index.vue';
import CustomerDetailDrawer from '#/components/ui/drawers/customer/customerDetail.vue';

import { columns, formItems, mockApi, tabbar } from './config';

const currentTab = ref('');

const calcColumns = computed(() =>
  ['abnormalProtocol', 'protocol'].includes(currentTab.value)
    ? columns
    : columns.filter((col) => col.prop !== 'contact'),
);

const handleTabClick = (tab: string) => {
  currentTab.value = tab;
};

const showModal = ref(false);
</script>

<template>
  <TableLayout
    :api="mockApi"
    :columns="calcColumns"
    :first-load="true"
    :form-items="formItems"
    :tabbar
    @tab-click="handleTabClick"
  >
    <template #customerCode="{ row }">
      <el-link type="primary" @click="showModal = true">
        {{ row.customerCode }}
      </el-link>
    </template>

    <CustomerDetailDrawer id="" :show="showModal" @closed="showModal = false" />
  </TableLayout>
</template>
