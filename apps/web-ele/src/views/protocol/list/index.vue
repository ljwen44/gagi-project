<script lang="ts" setup>
import { ref } from 'vue';

import { AlertCircle, Bug } from '@vben/icons';
import { mockApi } from '@vben/utils';
import { VbenHelpTooltip } from '@vben-core/shadcn-ui';

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
</script>

<template>
  <TableLayout
    :api="() => mockApi(columns)"
    :columns
    :expand="true"
    :form-items="formItems"
    :tabbar="tabbar"
  >
    <template #action>
      <el-button type="primary" @click="showModal = true"> 新增 </el-button>
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
