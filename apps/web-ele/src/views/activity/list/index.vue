<script lang="ts" setup>
import { mockApi } from '@vben/utils';

import TableLayout from '#/components/table-layout/index.vue';

import { columns, formItems, tabbar, tableBar } from './config';
</script>

<template>
  <TableLayout
    :api="() => mockApi(columns)"
    :columns
    :form-items="formItems"
    :tabbar
  >
    <template #action>
      <el-button type="primary">添加</el-button>
    </template>
    <template #tableBar>
      <div>
        <el-tabs class="tableBar h-full" tab-position="left">
          <el-tab-pane
            v-for="tab in tableBar"
            :key="tab.value"
            :label="tab.label"
            :value="tab.value"
          />
        </el-tabs>
      </div>
    </template>
    <template #activityName="{ row }">
      <el-link type="primary">{{ row.activityName }}</el-link>
    </template>
    <template #status="{ row }">
      <el-tag type="info">{{ row.status }}</el-tag>
    </template>
  </TableLayout>
</template>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .tableBar {
    :deep(.el-tabs__header) {
      flex-direction: row !important;
    }
  }
}
</style>
