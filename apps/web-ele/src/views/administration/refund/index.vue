<script lang="ts" setup>
import { ref } from 'vue';

import TableLayout from '#/components/table-layout/index.vue';
import RefundDrawer from '#/components/ui/drawers/administration/refundDrawer.vue';

import { columns, formItems, tabbar } from './config';

const show = ref(false);
</script>

<template>
  <TableLayout
    :api="() => []"
    :columns
    :form-items="formItems"
    :tabbar="tabbar"
  >
    <template #action>
      <el-button type="primary"> 添加 </el-button>
      <el-button type="primary" @click="show = true"> 抽屉 </el-button>
    </template>

    <RefundDrawer :show @closed="show = false" />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
