<script lang="ts" setup>
import TableLayout from '#/components/table-layout/index.vue';

import { columns, formItems } from './config';
</script>

<template>
  <TableLayout :api="() => []" :columns :form-items="formItems">
    <template #action>
      <el-button size="small" type="primary"> 添加 </el-button>
    </template>
  </TableLayout>
</template>

<style lang="scss" scoped></style>
