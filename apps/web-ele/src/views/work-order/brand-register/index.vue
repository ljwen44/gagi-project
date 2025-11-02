<script lang="ts" setup>
import { ref } from 'vue';

import { mockApi } from '@vben/utils';

import TableLayout from '#/components/table-layout/index.vue';
import CustomerDetailDrawer from '#/components/ui/drawers/customer/customerDetail.vue';
import ProtocolDrawer from '#/components/ui/drawers/protocol/protocolDrawer.vue';
import WorkOrderDrawer from '#/components/ui/drawers/workOrder/allList/workOrderDrawer.vue';
import BrandRegisterDrawer from '#/components/ui/drawers/workOrder/brand-register/brandRegisterDrawer.vue';

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
      <el-link type="primary" @click="modalType = MODAL_TYPE.BRANDREGISTER">
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

    <template #workOrderCode="{ row }">
      <el-link type="primary" @click="modalType = MODAL_TYPE.WORKORDER">
        {{ row.workOrderCode }}
      </el-link>
    </template>

    <template #status="{ row }">
      <el-tag effect="dark" type="success">
        {{ row.status }}
      </el-tag>
    </template>

    <template #confirm="{ row }">
      <el-tag effect="dark" type="success">
        {{ row.confirm }}
      </el-tag>
    </template>

    <template #acceptStatus="{ row }">
      <el-tag effect="dark" type="success">
        {{ row.acceptStatus }}
      </el-tag>
    </template>

    <BrandRegisterDrawer
      :show="modalType === MODAL_TYPE.BRANDREGISTER"
      @closed="modalType = MODAL_TYPE.INIT"
    />

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
