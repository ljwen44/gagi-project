<script lang="ts" setup>
import { ref } from 'vue';

import TableLayout from '#/components/table-layout/index.vue';
import ProductDrawer from '#/components/ui/drawers/product/productDrawer.vue';

import { columns, formItems } from './config';

const showDrawer = ref(false);
</script>

<template>
  <TableLayout :api="() => []" :columns :form-items="formItems">
    <template #action>
      <el-button type="primary" @click="showDrawer = true">抽屉</el-button>
    </template>

    <ProductDrawer :show="showDrawer" @closed="showDrawer = false" />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
