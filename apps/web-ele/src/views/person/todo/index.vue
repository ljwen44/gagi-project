<script lang="ts" setup>
import { computed, ref } from 'vue';

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

const api = computed(() => apiMap[currentTab.value]);
const columns = computed(() => columnsMap[currentTab.value] || []);
// const formItems = computed(() => formItemsMap[currentTab.value] || []);

const handleTabChange = (tab: string) => {
  currentTab.value = tab;
};

const modalType = ref('');
</script>

<template>
  <TableLayout
    :api
    :columns
    :form-items="[]"
    :tabbar
    @tab-change="handleTabChange"
  >
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
      <el-tag :type="auditStatusMap[row.auditStatus].type">
        {{ auditStatusMap[row.auditStatus].text }}
      </el-tag>
    </template>

    <CustomerDetailDrawer
      id=""
      :show="modalType === MODAL_TYPE.CUSTOMER"
      @closed="modalType = MODAL_TYPE.INIT"
    />

    <ProtocolDrawer
      :show="modalType === MODAL_TYPE.PROTOCOL"
      @closed="modalType = MODAL_TYPE.INIT"
    />
  </TableLayout>
</template>
