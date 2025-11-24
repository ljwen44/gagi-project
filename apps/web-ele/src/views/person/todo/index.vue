<script lang="ts" setup>
import { computed, ref, useTemplateRef } from 'vue';

import { ElMessage } from 'element-plus';

import TableLayout from '#/components/table-layout/index.vue';
import CustomerDetailDrawer from '#/components/ui/drawers/customer/customerDetail.vue';
import ProtocolDrawer from '#/components/ui/drawers/protocol/protocolDrawer.vue';

import {
  apiMap,
  auditStatusMap,
  columnsMap,
  MODAL_TYPE,
  tabbar,
} from './config';

const currentTab = ref('protocol');

const api = computed(() => apiMap[currentTab.value] || (() => {}));
const columns = computed(() => columnsMap[currentTab.value] || []);
const currentPreviewIndex = ref(0);
const previewCustomerId = ref<number | undefined>();
const previewAgreementId = ref<number | undefined>();
const modalType = ref(MODAL_TYPE.INIT);
const tableLayoutRef = useTemplateRef('tableLayoutRef');

const handleTabChange = (tab: string) => {
  currentTab.value = tab;
  // requestAnimationFrame(() => tableLayoutRef.value?.query());
};

const openDrawer = (type: MODAL_TYPE, row: any, index: number) => {
  modalType.value = type;
  currentPreviewIndex.value = index;
  if (type === MODAL_TYPE.PROTOCOL) {
    previewAgreementId.value = +row.agreementId;
    return;
  }
  previewCustomerId.value = +row.custId;
};

const handleCloseDrawer = () => {
  modalType.value = MODAL_TYPE.INIT;
  tableLayoutRef.value?.query();
  previewAgreementId.value = void 0;
  previewCustomerId.value = void 0;
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
    previewAgreementId.value = +list[currentPreviewIndex.value].agreementId;
    return;
  }

  previewCustomerId.value = +list[currentPreviewIndex.value].custId;
};
</script>

<template>
  <TableLayout
    ref="tableLayoutRef"
    :api
    :columns
    :form-items="[]"
    :tabbar
    @tab-change="handleTabChange"
  >
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
    <template #status="{ row }">
      <el-tag type="primary">{{ row.status }}</el-tag>
    </template>

    <template #workStatus="{ row }">
      <el-tag :type="row.workStatus === 0 ? 'info' : 'primary'">
        {{ row.workStatus === 0 ? '未结单' : '已结单' }}
      </el-tag>
    </template>
    <template #receiveStatus="{ row }">
      <el-tag :type="row.receiveStatus === 0 ? 'info' : 'primary'">
        {{ row.receiveStatus === 0 ? '未接单' : '已接单' }}
      </el-tag>
    </template>
    <template #customerConfirm="{ row }">
      <el-tag :type="row.customerConfirm === 0 ? 'info' : 'primary'">
        {{ row.customerConfirm === 0 ? '未确认' : '已确认' }}
      </el-tag>
    </template>
    <template #auditStatus="{ row }">
      <el-tag :type="auditStatusMap[row.auditStatus]?.type">
        {{ auditStatusMap[row.auditStatus]?.text }}
      </el-tag>
    </template>

    <template #default="{ tableData }">
      <CustomerDetailDrawer
        :id="previewCustomerId"
        :show="modalType === MODAL_TYPE.CUSTOMER"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.CUSTOMER)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.CUSTOMER)"
      />

      <ProtocolDrawer
        :id="previewAgreementId"
        :show="modalType === MODAL_TYPE.PROTOCOL"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.PROTOCOL)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.PROTOCOL)"
      />
    </template>
  </TableLayout>
</template>
