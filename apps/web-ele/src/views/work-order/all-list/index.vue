<script lang="ts" setup>
import { ref } from 'vue';

import { Bell, Flag, NotebookText, RefreshCcw } from '@vben/icons';
import { mockApi } from '@vben/utils';

import TableLayout from '#/components/table-layout/index.vue';
import CustomerDetailDrawer from '#/components/ui/drawers/customer/customerDetail.vue';
import ProtocolDrawer from '#/components/ui/drawers/protocol/protocolDrawer.vue';
import WorkOrderDrawer from '#/components/ui/drawers/workOrder/allList/workOrderDrawer.vue';

import { columns, formItems, MODAL_TYPE, tabbar } from './config';

const modalType = ref(MODAL_TYPE.INIT);
</script>

<template>
  <TableLayout
    :api="() => mockApi(columns)"
    :columns
    :form-items="formItems"
    :tabbar
  >
    <template #number="{ row }">
      <el-link type="primary" @click="modalType = MODAL_TYPE.WORKORDER">
        {{ row.number }}
      </el-link>
    </template>

    <template #customerCode="{ row }">
      <el-link type="primary" @click="modalType = MODAL_TYPE.CUSTOMER">
        {{ row.customerCode }}
      </el-link>
    </template>

    <template #protocol="{ row }">
      <el-link type="primary" @click="modalType = MODAL_TYPE.PROTOCOL">
        {{ row.protocol }}
      </el-link>
    </template>

    <template #status="{ row }">
      <el-tag effect="dark" type="success">
        {{ row.status }}
      </el-tag>
    </template>

    <template #confirm="{ row }">
      <el-tag effect="dark" type="info">
        {{ row.confirm }}
      </el-tag>
    </template>

    <template #acceptStatus="{ row }">
      <el-tag effect="dark" type="success">
        {{ row.acceptStatus }}
      </el-tag>
    </template>

    <template #orderStatus="{ row }">
      <el-tag effect="dark" type="success">
        {{ row.orderStatus }}
      </el-tag>
    </template>

    <template #finishConfirm="{ row }">
      <el-tag effect="dark" type="success">
        {{ row.finishConfirm }}
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

<style lang="scss" scoped></style>
