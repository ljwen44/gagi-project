<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { Bell, Flag, NotebookText, RefreshCcw } from '@vben/icons';

import { getWorkOrderList } from '#/api/core/workOrder';
import TableLayout from '#/components/table-layout/index.vue';
import CustomerDetailDrawer from '#/components/ui/drawers/customer/customerDetail.vue';
import ProtocolDrawer from '#/components/ui/drawers/protocol/protocolDrawer.vue';
import WorkOrderDrawer from '#/components/ui/drawers/workOrder/allList/workOrderDrawer.vue';

import {
  AuditStatusMap,
  ConfirmMap,
  ReceiveStatusMap,
  WorkStatusMap,
} from '../commonConfig';
import { columns, formItems, MODAL_TYPE, tabbar } from './config';

const modalType = ref(MODAL_TYPE.INIT);
const currentTab = ref('');
const tableLayoutRef = useTemplateRef('tableLayoutRef');

const beforeQuery = (queryParams: any) => {
  if (currentTab.value === 'all') {
    queryParams.orderType = '';
    return;
  }
  queryParams.orderType = currentTab.value;
};
const handleTabChange = (tab: string) => {
  currentTab.value = tab;

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
    @tab-change="handleTabChange"
  >
    <template #orderNo="{ row }">
      <el-link type="primary" @click="modalType = MODAL_TYPE.WORKORDER">
        {{ row.orderNo }}
      </el-link>
    </template>

    <template #customerNo="{ row }">
      <el-link type="primary" @click="modalType = MODAL_TYPE.CUSTOMER">
        {{ row.customerNo }}
      </el-link>
    </template>

    <template #agreementNo="{ row }">
      <el-link type="primary" @click="modalType = MODAL_TYPE.PROTOCOL">
        {{ row.agreementNo }}
      </el-link>
    </template>

    <template #auditStatus="{ row }">
      <el-tag effect="dark" type="success">
        {{ AuditStatusMap[row.auditStatus] }}
      </el-tag>
    </template>

    <template #customerConfirm="{ row }">
      <el-tag effect="dark" type="info">
        {{ ConfirmMap[row.customerConfirm] }}
      </el-tag>
    </template>

    <template #receiveStatus="{ row }">
      <el-tag effect="dark" type="success">
        {{ ReceiveStatusMap[row.receiveStatus] }}
      </el-tag>
    </template>

    <template #workStatus="{ row }">
      <el-tag effect="dark" type="success">
        {{ WorkStatusMap[row.workStatus] }}
      </el-tag>
    </template>

    <template #operator>
      <div class="flex items-center justify-center gap-1">
        <Flag class="size-4 cursor-pointer text-[red]" fill="red" />
        <Flag class="size-4 cursor-pointer text-[orange]" fill="orange" />
        <NotebookText class="size-4 cursor-pointer text-purple-600" />
        <Bell class="size-4 cursor-pointer text-green-600" />
        <RefreshCcw class="size-4 cursor-pointer text-red-600" />
      </div>
    </template>

    <WorkOrderDrawer
      :show="modalType === MODAL_TYPE.WORKORDER"
      @closed="modalType = MODAL_TYPE.INIT"
    />

    <CustomerDetailDrawer
      :form="{}"
      :show="modalType === MODAL_TYPE.CUSTOMER"
      @closed="modalType = MODAL_TYPE.INIT"
    />

    <ProtocolDrawer
      :show="modalType === MODAL_TYPE.PROTOCOL"
      @closed="modalType = MODAL_TYPE.INIT"
    />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
