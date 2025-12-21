<script lang="ts" setup>
import { getProductList } from '#/api/core/product';
import TableLayout from '#/components/table-layout/index.vue';

import { formItems, productColumns } from './config';

const emits = defineEmits(['selectionChange']);

const handleSelectionChange = (val: any) => {
  emits('selectionChange', val);
};
</script>

<template>
  <TableLayout
    :api="getProductList"
    :columns="productColumns"
    :form-items
    hidden-filter
    @selection-change="handleSelectionChange"
  >
    <template #productNo="{ row }">
      <el-text type="primary">
        {{ row.productNo }}
      </el-text>
    </template>
    <template #isCertified="{ row }">
      <el-tag :type="row.isCertified ? 'primary' : 'info'">
        {{ row.isCertified ? '是' : '否' }}
      </el-tag>
    </template>
    <template #isNotarized="{ row }">
      <el-tag :type="row.isNotarized ? 'primary' : 'info'">
        {{ row.isNotarized ? '是' : '否' }}
      </el-tag>
    </template>
    <template #serviceItems="{ row }">
      <el-select
        v-if="row.serviceItems.length > 0"
        v-model="row.selectServiceItems"
        collapse-tags
        multiple
      >
        <el-option
          v-for="item in row.serviceItems"
          :key="item.itemName"
          :label="item.itemName"
          :value="item.itemName"
        />
      </el-select>
      <el-text v-else />
    </template>
  </TableLayout>
</template>
