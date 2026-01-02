<script lang="ts" setup>
import { computed, ref, useTemplateRef } from 'vue';

import { ElMessage } from 'element-plus';

import { Type } from '#/api/core/administration';
import TableLayout from '#/components/table-layout/index.vue';
import InvoiceDrawer from '#/components/ui/drawers/administration/invoiceDrawer.vue';
import PaymentDrawer from '#/components/ui/drawers/administration/paymentDrawer.vue';
import RefundDrawer from '#/components/ui/drawers/administration/refundDrawer.vue';
import RemibursementDrawer from '#/components/ui/drawers/administration/reimbursementDrawer.vue';
import RestDrawer from '#/components/ui/drawers/administration/restDrawer.vue';
import CustomerDetailDrawer from '#/components/ui/drawers/customer/customerDetail.vue';
import ProtocolDrawer from '#/components/ui/drawers/protocol/protocolDrawer.vue';
import WorkOrderDrawer from '#/components/ui/drawers/workOrder/allList/workOrderDrawer.vue';

import {
  apiMap,
  auditStatusMap,
  columnsMap,
  FIELD_TYPE,
  MODAL_TYPE,
  tabbar,
} from './config';

const currentTab = ref('protocol');

const api = computed(() => apiMap[currentTab.value] || (() => {}));
const columns = computed(() => columnsMap[currentTab.value] || []);
const previewId = ref();
const currentPreviewIndex = ref(0);
// const previewCustomerId = ref<number | undefined>();
// const previewAgreementId = ref<number | undefined>();
// const previewOrderId = ref<number | undefined>();
const modalType = ref(MODAL_TYPE.INIT);
const tableLayoutRef = useTemplateRef('tableLayoutRef');

const handleTabChange = (tab: string) => {
  currentTab.value = tab;
  requestAnimationFrame(() => tableLayoutRef.value?.query());
};

const openDrawer = (type: MODAL_TYPE, row: any, index: number) => {
  modalType.value = type;
  currentPreviewIndex.value = index;
  previewId.value = row[FIELD_TYPE[type as keyof typeof FIELD_TYPE] || 'id'];
  // if (type === MODAL_TYPE.PROTOCOL) {
  //   previewAgreementId.value = +row.agreementId;
  //   return;
  // }
  // if (type === MODAL_TYPE.WORKORDER) {
  //   previewOrderId.value = +row.workOrderId;
  //   return;
  // }
  // previewCustomerId.value = +row.custId;
};

const handleCloseDrawer = () => {
  modalType.value = MODAL_TYPE.INIT;
  tableLayoutRef.value?.query();
  previewId.value = void 0;
  // previewAgreementId.value = void 0;
  // previewCustomerId.value = void 0;
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

  const row = list[currentPreviewIndex.value];

  previewId.value = row[FIELD_TYPE[type as keyof typeof FIELD_TYPE] || 'id'];

  // if (type === MODAL_TYPE.PROTOCOL) {
  //   previewAgreementId.value = +list[currentPreviewIndex.value].agreementId;
  //   return;
  // }

  // previewCustomerId.value = +list[currentPreviewIndex.value].custId;
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
    <template #orderNo="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openDrawer(MODAL_TYPE.WORKORDER, row, $index)"
      >
        {{ row.orderNo }}
      </el-text>
    </template>
    <template #invoiceNo="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openDrawer(MODAL_TYPE.INVOICE, row, $index)"
      >
        {{ row.invoiceNo }}
      </el-text>
    </template>
    <template #paymentNo="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openDrawer(MODAL_TYPE.PAYMENT, row, $index)"
      >
        {{ row.paymentNo }}
      </el-text>
    </template>
    <template #refundNo="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openDrawer(MODAL_TYPE.REFUND, row, $index)"
      >
        {{ row.refundNo }}
      </el-text>
    </template>
    <template #reimbursementNo="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openDrawer(MODAL_TYPE.REIMBURSEMENT, row, $index)"
      >
        {{ row.reimbursementNo }}
      </el-text>
    </template>
    <template #leaveNo="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openDrawer(MODAL_TYPE.LEAVEAPPLY, row, $index)"
      >
        {{ row.leaveNo }}
      </el-text>
    </template>
    <template #approveStatus="{ row }">
      <el-tag type="primary">
        {{ row.approveStatus }}
      </el-tag>
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
        :id="previewId"
        :show="modalType === MODAL_TYPE.CUSTOMER"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.CUSTOMER)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.CUSTOMER)"
      />

      <ProtocolDrawer
        :id="previewId"
        :show="modalType === MODAL_TYPE.PROTOCOL"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.PROTOCOL)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.PROTOCOL)"
      />

      <WorkOrderDrawer
        :id="previewId"
        :show="modalType === MODAL_TYPE.WORKORDER"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.WORKORDER)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.WORKORDER)"
      />

      <InvoiceDrawer
        :id="previewId"
        :show="modalType === MODAL_TYPE.INVOICE"
        :type="Type.invoiceManage"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.INVOICE)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.INVOICE)"
      />

      <PaymentDrawer
        :id="previewId"
        :show="modalType === MODAL_TYPE.PAYMENT"
        :type="Type.paymentApply"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.PAYMENT)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.PAYMENT)"
      />

      <RefundDrawer
        :id="previewId"
        :show="modalType === MODAL_TYPE.REFUND"
        :type="Type.refundApply"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.REFUND)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.REFUND)"
      />

      <RemibursementDrawer
        :id="previewId"
        :show="modalType === MODAL_TYPE.REIMBURSEMENT"
        :type="Type.reimbursement"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.REIMBURSEMENT)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.REIMBURSEMENT)"
      />

      <RestDrawer
        :id="previewId"
        :show="modalType === MODAL_TYPE.LEAVEAPPLY"
        :type="Type.leaveApply"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.LEAVEAPPLY)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.LEAVEAPPLY)"
      />
    </template>
  </TableLayout>
</template>
