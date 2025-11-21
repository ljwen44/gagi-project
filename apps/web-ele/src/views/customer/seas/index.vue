<script lang="ts" setup>
import { ref } from 'vue';

import { Inbox } from '@vben/icons';

import { ElMessage } from 'element-plus';

import { getCustomerList } from '#/api/core/customer';
import TableLayout from '#/components/table-layout/index.vue';
import CustomerDetailDrawer from '#/components/ui/drawers/customer/customerDetail.vue';

import { columns, formItems } from './config';

const showModal = ref(false);
const selection = ref([]);
const currentPreviewIndex = ref(0);
const previewCustomerId = ref('');

const beforeQuery = (queryParams: Record<string, any>) => {
  queryParams.isPublicSea = 1;
};

const handleSelectionChange = (value: any) => {
  selection.value = value;
};

const openCustomerDetail = (row: any, index: number) => {
  previewCustomerId.value = row.id;
  currentPreviewIndex.value = index;
  showModal.value = true;
};

const handleNextPreview = (list: any, symbol: number) => {
  currentPreviewIndex.value += symbol;
  if (currentPreviewIndex.value === list.length) {
    currentPreviewIndex.value--;
    ElMessage.info('已是最后一页');
    return;
  }

  if (currentPreviewIndex.value < 0) {
    currentPreviewIndex.value = 0;
    ElMessage.info('已是第一页');
    return;
  }

  previewCustomerId.value = list[currentPreviewIndex.value].custId;
};
</script>

<template>
  <TableLayout
    :api="getCustomerList"
    :before-query
    :columns
    :form-items="formItems"
    @selection-change="handleSelectionChange"
  >
    <template #action>
      <el-button :disabled="selection.length <= 0" type="primary">
        批量领取
      </el-button>
    </template>

    <template #customerNo="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openCustomerDetail(row, $index)"
      >
        {{ row.customerNo }}
      </el-text>
    </template>
    <template #tags="{ row }">
      <el-tag
        v-for="tag in row.tags?.split(',')"
        :key="tag"
        class="mr-0.5"
        type="primary"
      >
        {{ tag }}
      </el-tag>
    </template>
    <template #operator>
      <div
        class="flex cursor-pointer items-center gap-1 text-[var(--el-color-primary)]"
      >
        <Inbox class="size-4" />
        <span>领取</span>
      </div>
    </template>

    <template #default="{ tableData }">
      <CustomerDetailDrawer
        :id="previewCustomerId"
        :show="showModal"
        @closed="showModal = false"
        @next="handleNextPreview(tableData, 1)"
        @prev="handleNextPreview(tableData, -1)"
      />
    </template>
  </TableLayout>
</template>
