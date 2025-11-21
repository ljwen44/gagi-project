<script lang="ts" setup>
import { onMounted, ref, useTemplateRef } from 'vue';

import { AlertCircle, Bug, Edit } from '@vben/icons';

import { ElMessage } from 'element-plus';

import { getCustomerList } from '#/api/core/customer';
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
  statusTypeMap,
  tabbar,
} from './config';

const modalType = ref(MODAL_TYPE.INIT);
const currentTab = ref('');
const drawerForm = ref({});
const customerOptions = ref([]);
const currentPreviewIndex = ref(0);
const previewCustomerId = ref('');
const tableLayoutRef = useTemplateRef('tableLayoutRef');
const protocolFormRef = useTemplateRef('protocolFormRef');

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

const openDrawer = (type: MODAL_TYPE, row: any, index: number) => {
  modalType.value = type;
  currentPreviewIndex.value = index;
  if (type === MODAL_TYPE.PROTOCOL) {
    drawerForm.value = row;
    return;
  }
  if (type === MODAL_TYPE.CUSTOMER) {
    previewCustomerId.value = row.custId;
  }
};

const getCustomerListOptions = async () => {
  const { records } = await getCustomerList({
    pageNum: 1,
    pageSize: 1000,
  });
  customerOptions.value = records.map((item: any) => ({
    ...item,
    label: item.companyName,
    value: item.id,
  }));
};

const handleProductConfirm = () => {
  tableLayoutRef.value?.query();
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
    drawerForm.value = list[currentPreviewIndex.value];
    return;
  }

  previewCustomerId.value = list[currentPreviewIndex.value].custId;
};

onMounted(() => {
  getCustomerListOptions();
});
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
      <el-button type="primary" @click="protocolFormRef?.openModal()">
        新增
      </el-button>
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
    <template #agreementNo="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openDrawer(MODAL_TYPE.PROTOCOL, row, $index)"
      >
        {{ row.agreementNo }}
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

    <template #status="{ row }">
      <el-tag :type="statusTypeMap[row.status] || 'primary'" effect="dark">
        {{ row.status }}
      </el-tag>
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

    <template #operator="{ row }">
      <div class="flex items-center justify-center gap-1">
        <Edit
          class="size-4 cursor-pointer text-[var(--el-color-primary)]"
          @click="
            protocolFormRef?.openModal({
              target: {
                ...row,
              },
              title: '编辑协议',
            })
          "
        />
      </div>
    </template>

    <template #default="{ tableData }">
      <ProtocolForm
        ref="protocolFormRef"
        :customer-options
        @confirm="handleProductConfirm"
      />

      <ProtocolDrawer
        :form="drawerForm"
        :show="modalType === MODAL_TYPE.PROTOCOL"
        @closed="modalType = MODAL_TYPE.INIT"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.PROTOCOL)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.PROTOCOL)"
      />

      <CustomerDetailDrawer
        :id="previewCustomerId"
        :show="modalType === MODAL_TYPE.CUSTOMER"
        @closed="modalType = MODAL_TYPE.INIT"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.CUSTOMER)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.CUSTOMER)"
      />
    </template>
  </TableLayout>
</template>

<style lang="scss" scoped></style>
