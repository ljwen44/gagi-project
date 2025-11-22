<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { Bell, Star } from '@vben/icons';
import { mockApi } from '@vben/utils';

import { ElMessage } from 'element-plus';

import TableLayout from '#/components/table-layout/index.vue';
import CustomerDetailDrawer from '#/components/ui/drawers/customer/customerDetail.vue';
import ProtocolDrawer from '#/components/ui/drawers/protocol/protocolDrawer.vue';
import FollowUpDrawer from '#/components/ui/drawers/workOrder/follow-up/followUpDrawer.vue';

import { columns, formItems, MODAL_TYPE, tabbar } from './config';

const modalType = ref(MODAL_TYPE.INIT);
const currentTab = ref('');
const currentPreviewIndex = ref(0);
const previewId = ref<number | undefined>();
const previewCustomerId = ref<number | undefined>();
const previewProtocolId = ref<number | undefined>();
const tableLayoutRef = useTemplateRef('tableLayoutRef');

const beforeQuery = (queryParams: any) => {
  if (currentTab.value === 'all') {
    queryParams.orderType = '';
    return;
  }
  queryParams.orderType = currentTab.value;
};

const openDrawer = (type: MODAL_TYPE, row: any, index: number) => {
  modalType.value = type;
  currentPreviewIndex.value = index;
  if (type === MODAL_TYPE.PROTOCOL) {
    previewProtocolId.value = row.agreementId;
    return;
  }
  if (type === MODAL_TYPE.CUSTOMER) {
    previewCustomerId.value = row.custId;
    return;
  }
  previewId.value = row.id;
};

const handleNextPreview = (list: any, symbol: number, type: MODAL_TYPE) => {
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

  if (type === MODAL_TYPE.PROTOCOL) {
    previewProtocolId.value = list[currentPreviewIndex.value].id;
    return;
  }

  if (type === MODAL_TYPE.CUSTOMER) {
    previewCustomerId.value = list[currentPreviewIndex.value].custId;
    return;
  }

  previewId.value = list[currentPreviewIndex.value].custId;
};

const handleCloseDrawer = () => {
  modalType.value = MODAL_TYPE.INIT;
  previewId.value = undefined;
  previewCustomerId.value = undefined;
  previewProtocolId.value = undefined;
  tableLayoutRef.value?.query();
};
</script>

<template>
  <TableLayout
    ref="tableLayoutRef"
    :api="() => mockApi(columns)"
    :before-query
    :columns
    :form-items="formItems"
    :tabbar
  >
    <template #orderNo="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openDrawer(MODAL_TYPE.FOLLOWUP, row, $index)"
      >
        {{ row.orderNo }}
      </el-text>
    </template>

    <template #customerNo="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openDrawer(MODAL_TYPE.CUSTOMER, row, $index)"
      >
        {{ row.customerNo }}
      </el-text>
    </template>

    <template #protocol="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openDrawer(MODAL_TYPE.PROTOCOL, row, $index)"
      >
        {{ row.protocol }}
      </el-text>
    </template>

    <template #status="{ row }">
      <el-tag type="primary">
        {{ row.status }}
      </el-tag>
    </template>

    <template #operator="{ $index }">
      <div class="flex items-center gap-2">
        <Star
          :fill="$index % 2 === 0 ? 'red' : 'transparent'"
          class="size-4 cursor-pointer text-red-600"
        />
        <Bell class="size-4 cursor-pointer text-green-600" />
      </div>
    </template>

    <template #default="{ tableData }">
      <FollowUpDrawer
        :id="previewId"
        :show="modalType === MODAL_TYPE.CUSTOMER"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.FOLLOWUP)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.FOLLOWUP)"
      />

      <CustomerDetailDrawer
        :id="previewCustomerId"
        :show="modalType === MODAL_TYPE.CUSTOMER"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.CUSTOMER)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.CUSTOMER)"
      />

      <ProtocolDrawer
        :id="previewProtocolId"
        :show="modalType === MODAL_TYPE.PROTOCOL"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.PROTOCOL)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.PROTOCOL)"
      />
    </template>
  </TableLayout>
</template>

<style lang="scss" scoped></style>
