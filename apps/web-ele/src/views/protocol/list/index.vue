<script lang="ts" setup>
import { ref } from 'vue';

import { AlertCircle } from '@vben/icons';
import { mockApi } from '@vben/utils';
import { VbenHelpTooltip } from '@vben-core/shadcn-ui';

import TableLayout from '#/components/table-layout/index.vue';
import CustomerDetailDrawer from '#/components/ui/drawers/customer/customerDetail.vue';
import ProtocolDrawer from '#/components/ui/drawers/protocol/protocolDrawer.vue';

import { columns, formItems, MODAL_TYPE, tabbar } from './config';

const modalType = ref(MODAL_TYPE.INIT);
</script>

<template>
  <TableLayout
    :api="() => mockApi(columns)"
    :columns
    :form-items="formItems"
    :tabbar="tabbar"
  >
    <template #action>
      <el-button type="primary"> 新增 </el-button>
    </template>
    <template #protocolHeader>
      <VbenHelpTooltip>
        <template #trigger>
          <span>协议编号</span>
          <AlertCircle class="ml-1 inline-block size-4 text-[#f00]" />
        </template>
        <div class="flex flex-col gap-2">111</div>
      </VbenHelpTooltip>
    </template>
    <template #protocol="{ row }">
      <el-link type="primary" @click="modalType = MODAL_TYPE.PROTOCOL">
        {{ row.protocol }}
      </el-link>
    </template>

    <template #customerCode="{ row }">
      <el-link type="primary" @click="modalType = MODAL_TYPE.CUSTOMER">
        {{ row.customerCode }}
      </el-link>
    </template>

    <template #status="{ row }">
      <el-tag effect="dark" type="success">{{ row.status }}</el-tag>
    </template>
    <template #workOrderStatus="{ row }">
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
    </template>
    <template #hasTicket="{ row }">
      <el-tag type="primary">{{ row.hasTicket }}</el-tag>
    </template>
    <template #hasUpdate="{ row }">
      <el-tag type="primary">{{ row.hasUpdate }}</el-tag>
    </template>
    <template #protocolType="{ row }">
      <el-tag type="primary">{{ row.protocolType }}</el-tag>
    </template>

    <ProtocolDrawer
      :show="modalType === MODAL_TYPE.PROTOCOL"
      @closed="modalType = MODAL_TYPE.INIT"
    />

    <CustomerDetailDrawer
      id=""
      :show="modalType === MODAL_TYPE.CUSTOMER"
      @closed="modalType = MODAL_TYPE.INIT"
    />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
