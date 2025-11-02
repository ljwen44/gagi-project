<script lang="ts" setup>
import { computed, ref } from 'vue';

import { mockApi } from '@vben/utils';

import TableLayout from '#/components/table-layout/index.vue';
import CustomerDetailDrawer from '#/components/ui/drawers/customer/customerDetail.vue';
import ProtocolDrawer from '#/components/ui/drawers/protocol/protocolDrawer.vue';

import { columns, formItems, MODAL_TYPE, tabbar } from './config';

const currentTab = ref('protocol');

const calcColumns = computed(() =>
  ['abnormalProtocol', 'protocol'].includes(currentTab.value)
    ? columns
    : columns.filter((col) => col.prop !== 'contact'),
);

const handleTabClick = (tab: string) => {
  currentTab.value = tab;
};

const modalType = ref('');
</script>

<template>
  <TableLayout
    :api="() => mockApi(columns)"
    :columns="calcColumns"
    :form-items="formItems"
    :tabbar
    @tab-click="handleTabClick"
  >
    <template #customerCode="{ row }">
      <el-link type="primary" @click="modalType = MODAL_TYPE.CUSTOMER">
        {{ row.customerCode }}
      </el-link>
    </template>
    <template #task="{ row }">
      <p class="flex items-center gap-1">
        协议【
        <el-link type="primary" @click="modalType = MODAL_TYPE.PROTOCOL">
          {{ row.task }}
        </el-link>
        】已生成
      </p>
    </template>
    <template #status="{ row }">
      <el-tag type="primary">{{ row.status }}</el-tag>
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
