<script lang="ts" setup>
import { ref } from 'vue';

import TableLayout from '#/components/table-layout/index.vue';
import brandRenewalDrawer from '#/components/ui/drawers/workOrder/brand-renewal/brandRenewalDrawer.vue';

import { formItems, tabbar } from '../commonConfig';
import { columns } from './config';

const showDrawer = ref(false);
</script>

<template>
  <TableLayout :api="() => []" :columns :form-items="formItems" :tabbar>
    <template #action>
      <el-button type="primary" @click="showDrawer = true">抽屉</el-button>
    </template>

    <brandRenewalDrawer :show="showDrawer" @closed="showDrawer = false" />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
