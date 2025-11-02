<script lang="ts" setup>
import { ref } from 'vue';

import { mockApi } from '@vben/utils';

import TableLayout from '#/components/table-layout/index.vue';
import ProductDrawer from '#/components/ui/drawers/product/productDrawer.vue';

import { columns, formItems } from './config';

const showDrawer = ref(false);
</script>

<template>
  <TableLayout :api="() => mockApi(columns)" :columns :form-items="formItems">
    <template #number="{ row }">
      <el-link type="primary" @click="showDrawer = true">
        {{ row.number }}
      </el-link>
    </template>
    <template #isPublicAuth="{ row }">
      <el-tag type="primary">
        {{ row.isPublicAuth }}
      </el-tag>
    </template>
    <template #isAuth="{ row }">
      <el-tag type="primary">
        {{ row.isAuth }}
      </el-tag>
    </template>

    <ProductDrawer :show="showDrawer" @closed="showDrawer = false" />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
