<script lang="ts" setup>
import { ref } from 'vue';

import { mockApi } from '@vben/utils';

import TableLayout from '#/components/table-layout/index.vue';
import CustomerDetailDrawer from '#/components/ui/drawers/customer/customerDetail.vue';
import ProtocolDrawer from '#/components/ui/drawers/protocol/protocolDrawer.vue';
import SpecialServiceDrawer from '#/components/ui/drawers/workOrder/special-service/specialServiceDrawer.vue';

import { formItems, MODAL_TYPE, tabbar } from '../commonConfig';
import { columns } from './config';

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
      <el-link type="primary" @click="modalType = MODAL_TYPE.SPECIAL">
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

    <SpecialServiceDrawer
      :show="modalType === MODAL_TYPE.SPECIAL"
      @closed="modalType = MODAL_TYPE.INIT"
    />
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
