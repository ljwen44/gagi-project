<script lang="ts" setup>
import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { ref, useTemplateRef } from 'vue';

import { ElMessage } from 'element-plus';

import { getWorkOrderList } from '#/api/core/workOrder';
import TableLayout from '#/components/table-layout/index.vue';
import CustomerDetailDrawer from '#/components/ui/drawers/customer/customerDetail.vue';
import ProtocolDrawer from '#/components/ui/drawers/protocol/protocolDrawer.vue';

import {
  AuditStatusMap,
  ConfirmMap,
  formItems,
  MODAL_TYPE,
  ReceiveStatusMap,
  tabbar,
  TagTypeMap,
} from './commonConfig';

export interface IProps {
  drawerType: MODAL_TYPE;
  type: string;
  columns: ITableColumnProps[];
}

const props = defineProps<IProps>();

const modalType = ref(MODAL_TYPE.INIT);
const currentPreviewIndex = ref(0);
const previewId = ref<number | undefined>();
const previewCustomerId = ref<number | undefined>();
const previewProtocolId = ref<number | undefined>();
const tableLayoutRef = useTemplateRef('tableLayoutRef');

const beforeQuery = (params: any) => {
  params.categoryName = props.type;
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
        @click="openDrawer(drawerType, row, $index)"
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
        {{ AuditStatusMap[row.auditStatus] }}
      </el-tag>
    </template>

    <template #customerConfirm="{ row }">
      <el-tag :type="TagTypeMap[row.customerConfirm]" effect="dark">
        {{ ConfirmMap[row.customerConfirm] }}
      </el-tag>
    </template>

    <template #workStatus="{ row }">
      <el-tag :type="TagTypeMap[row.workStatus]" effect="dark">
        {{ ReceiveStatusMap[row.workStatus] }}
      </el-tag>
    </template>

    <template #default="{ tableData }">
      <slot
        :id="previewId"
        :show="modalType === drawerType"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1, drawerType)"
        @prev="handleNextPreview(tableData, -1, drawerType)"
      ></slot>

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
