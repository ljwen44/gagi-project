<script lang="ts" setup>
import TableLayout from '#/components/table-layout/index.vue';

import { columns, formItems, tabbar, tableBar } from './config';
</script>

<template>
  <TableLayout :api="() => []" :columns :form-items="formItems" :tabbar>
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
