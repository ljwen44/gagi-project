<script lang="ts" setup>
import TableLayout from '#/components/table-layout/index.vue';

import { columns, formItems, tabbar } from './config';
</script>

<template>
  <TableLayout
    :api="() => []"
    :columns
    :form-items="formItems"
    :tabbar="tabbar"
  >
    <template #action>
      <el-button size="small" type="primary"> 新增 </el-button>
    </template>
  </TableLayout>
</template>

<style lang="scss" scoped></style>
