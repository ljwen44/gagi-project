<script lang="ts" setup>
import { ref } from 'vue';

import { Bell, Star } from '@vben/icons';
import { mockApi } from '@vben/utils';

import TableLayout from '#/components/table-layout/index.vue';
import CustomerDetailDrawer from '#/components/ui/drawers/customer/customerDetail.vue';
import ProtocolDrawer from '#/components/ui/drawers/protocol/protocolDrawer.vue';
import FollowUpDrawer from '#/components/ui/drawers/workOrder/follow-up/followUpDrawer.vue';

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
      <el-link type="primary" @click="modalType = MODAL_TYPE.FOLLOWUP">
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
      <el-tag type="primary">
        {{ row.status }}
      </el-tag>
    </template>

    <template #operator="{ $index }">
      <div class="flex items-center gap-2">
        <Star
          :fill="$index % 2 === 0 ? 'red' : 'transparent'"
          class="size-4 cursor-pointer text-red-600"
        />
        <Bell class="size-4 cursor-pointer text-green-600" />
      </div>
    </template>

    <FollowUpDrawer
      :show="modalType === MODAL_TYPE.FOLLOWUP"
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
