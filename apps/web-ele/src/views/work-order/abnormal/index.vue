<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { Bell, Bug } from '@vben/icons';

import { ElMessage } from 'element-plus';

import { getWorkOrderList } from '#/api/core/workOrder';
import TableLayout from '#/components/table-layout/index.vue';
import CustomerDetailDrawer from '#/components/ui/drawers/customer/customerDetail.vue';
import ProtocolDrawer from '#/components/ui/drawers/protocol/protocolDrawer.vue';
import AbnormalWorkOrderDrawer from '#/components/ui/drawers/workOrder/abnormal/abnormalWorkOrderDrawer.vue';
import WorkOrderDrawer from '#/components/ui/drawers/workOrder/allList/workOrderDrawer.vue';

import { TagTypeMap, WorkStatusMap } from '../commonConfig';
import { columns, formItems, MODAL_TYPE, tabbar } from './config';

const modalType = ref(MODAL_TYPE.INIT);
const currentPreviewIndex = ref(0);
const previewId = ref<number | undefined>();
const previewOrderId = ref<number | undefined>();
const previewCustomerId = ref<number | undefined>();
const previewProtocolId = ref<number | undefined>();
const tableLayoutRef = useTemplateRef('tableLayoutRef');

const beforeQuery = (queryParams: any) => {
  queryParams.orderType = 'abnormal';
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
    previewProtocolId.value = list[currentPreviewIndex.value].agreementId;
    return;
  }

  if (type === MODAL_TYPE.CUSTOMER) {
    previewCustomerId.value = list[currentPreviewIndex.value].custId;
    return;
  }

  previewId.value = list[currentPreviewIndex.value].workOrderId;
};

const handleCloseDrawer = () => {
  modalType.value = MODAL_TYPE.INIT;
  previewId.value = undefined;
  previewCustomerId.value = undefined;
  previewProtocolId.value = undefined;
  previewOrderId.value = undefined;
  tableLayoutRef.value?.query();
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
  if (type === MODAL_TYPE.WORKORDER) {
    previewOrderId.value = row.orderId;
    return;
  }
  previewId.value = row.workOrderId;
};
</script>

<template>
  <TableLayout
    ref="tableLayoutRef"
    :api="getWorkOrderList"
    :before-query
    :columns
    :form-items="formItems"
    :tabbar
  >
    <template #orderNo="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openDrawer(MODAL_TYPE.ABNORMALWORKORDER, row, $index)"
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

    <template #agreementNo="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openDrawer(MODAL_TYPE.PROTOCOL, row, $index)"
      >
        {{ row.agreementNo }}
      </el-text>
    </template>

    <template #workOrderNo="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openDrawer(MODAL_TYPE.WORKORDER, row, $index)"
      >
        {{ row.workOrderNo }}
      </el-text>
    </template>

    <template #auditStatus="{ row }">
      <el-tag :type="TagTypeMap[row.auditStatus]" effect="dark">
        {{ WorkStatusMap[row.auditStatus] }}
      </el-tag>
    </template>

    <template #customerConfirm="{ row }">
      <el-tag :type="TagTypeMap[row.customerConfirm]" effect="dark">
        {{ WorkStatusMap[row.customerConfirm] }}
      </el-tag>
    </template>

    <template #workStatus="{ row }">
      <el-tag :type="TagTypeMap[row.workStatus]" effect="dark">
        {{ WorkStatusMap[row.workStatus] }}
      </el-tag>
    </template>

    <!-- <template #method="{ row }">
      <el-tag v-if=row.method :type="TagTypeMap[row.method]" effect="dark">
        {{ row.method }}
      </el-tag>
    </template> -->

    <template #operator>
      <div class="flex items-center justify-center gap-1">
        <Bug class="size-4 cursor-pointer text-red-600" />
        <Bell class="size-4 cursor-pointer text-green-600" />
      </div>
    </template>

    <template #default="{ tableData }">
      <WorkOrderDrawer
        :id="previewOrderId"
        :show="modalType === MODAL_TYPE.WORKORDER"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.WORKORDER)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.WORKORDER)"
      />

      <AbnormalWorkOrderDrawer
        :id="previewId"
        :show="modalType === MODAL_TYPE.ABNORMALWORKORDER"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.ABNORMALWORKORDER)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.ABNORMALWORKORDER)"
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
