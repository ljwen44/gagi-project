<script lang="ts" setup>
import { ref } from 'vue';

import TableLayout from '#/components/table-layout/index.vue';
import WorkOrderDrawer from '#/components/ui/drawers/workOrder/allList/workOrderDrawer.vue';

import { columns, formItems, tabbar } from './config';

const showModal = ref(false);
</script>

<template>
  <TableLayout :api="() => []" :columns :form-items="formItems" :tabbar>
    <template #action>
      <el-button type="primary" @click="showModal = true">抽屉</el-button>
    </template>

    <WorkOrderDrawer :show="showModal" @closed="showModal = false" />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
