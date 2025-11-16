<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { AlertCircle, Bug } from '@vben/icons';

import { getAgreementList } from '#/api/core/protocol';
import ATable from '#/components/common/table/index.vue';
import TableLayout from '#/components/table-layout/index.vue';
import CustomerDetailDrawer from '#/components/ui/drawers/customer/customerDetail.vue';
import ProtocolDrawer from '#/components/ui/drawers/protocol/protocolDrawer.vue';
import ProtocolForm from '#/components/ui/protocol/form.vue';

import {
  columns,
  detailColumns,
  formItems,
  MODAL_TYPE,
  tabbar,
} from './config';

const modalType = ref(MODAL_TYPE.INIT);
const showModal = ref(false);
const currentTab = ref('');
const drawerForm = ref({});
const tableLayoutRef = useTemplateRef('tableLayoutRef');

const beforeQuery = (queryParams: any) => {
  if (currentTab.value === 'all') {
    queryParams.agreementType = '';
    return;
  }
  queryParams.agreementType = currentTab.value;
};
const handleTabChange = (tab: string) => {
  currentTab.value = tab;

  tableLayoutRef.value?.query();
};

const openDrawer = (type: MODAL_TYPE, row: any) => {
  modalType.value = type;
  drawerForm.value = row;
};
</script>

<template>
  <TableLayout
    ref="tableLayoutRef"
    :api="getAgreementList"
    :before-query
    :columns
    :expand="true"
    :form-items="formItems"
    :tabbar
    hidden-filter
    @tab-change="handleTabChange"
  >
    <template #action>
      <el-button type="primary" @click="showModal = true"> 新增 </el-button>
    </template>
    <template #agreementNoHeader>
      <el-tooltip placement="top">
        <template #content>
          <div class="flex flex-col gap-2">111</div>
        </template>
        <div class="inline-flex items-center gap-1">
          <span>协议编号</span>
          <AlertCircle class="ml-1 inline-block size-4 text-[#f00]" />
        </div>
      </el-tooltip>
    </template>
    <template #agreementNo="{ row }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openDrawer(MODAL_TYPE.PROTOCOL, row)"
      >
        {{ row.agreementNo }}
      </el-text>
    </template>

    <template #customerNo="{ row }">
      <el-link type="primary" @click="openDrawer(MODAL_TYPE.CUSTOMER, row)">
        {{ row.customerNo }}
      </el-link>
    </template>

    <template #status="{ row }">
      <el-tag effect="dark" type="success">{{ row.status }}</el-tag>
    </template>
    <!-- <template #workOrderStatus="{ row }">
      <el-tag type="success">{{ row.workOrderStatus }}</el-tag>
    </template>
    <template #amountStatus="{ row }">
      <div class="inline-flex items-center gap-1">
        <el-tag v-for="tag in row.amountStatus" :key="tag" type="success">
          {{ tag }}
        </el-tag>
      </div>
    </template>
    <template #allocation="{ row }">
      <el-tag type="primary">{{ row.allocation }}</el-tag>
    </tem<plate>
    <template #hasTicket="{ row }">
      <el-tag type="primary">{{ row.hasTicket }}</el-tag>
    </template>
    <template #hasUpdate="{ row }">
      <el-tag type="primary">{{ row.hasUpdate }}</el-tag>
    </template>
    <template #protocolType="{ row }">
      <el-tag type="primary">{{ row.protocolType }}</el-tag>
    </template> -->

    <template #expand>
      <Bug
        class="flex size-4 w-full cursor-pointer items-center justify-center text-red-600"
      />
    </template>

    <template #expand-content>
      <ATable :columns="detailColumns" :data="[]" class="pl-[108px]">
        <template #price="{ row }">
          <span class="text-red-600">{{ row.price }}</span>
        </template>
      </ATable>
    </template>

    <ProtocolForm v-model="showModal" />

    <ProtocolDrawer
      :form="drawerForm"
      :show="modalType === MODAL_TYPE.PROTOCOL"
      @closed="modalType = MODAL_TYPE.INIT"
    />

    <CustomerDetailDrawer
      :form="{}"
      :show="modalType === MODAL_TYPE.CUSTOMER"
      @closed="modalType = MODAL_TYPE.INIT"
    />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
