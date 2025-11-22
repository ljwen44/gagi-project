<script lang="ts" setup>
import SpecialServiceDrawer from '#/components/ui/drawers/workOrder/special-service/specialServiceDrawer.vue';

import { MODAL_TYPE } from '../commonConfig';
import OrderLayout from '../OrderLayout.vue';
import { columns } from './config';
</script>

<template>
  <OrderLayout
    :columns
    :drawer-type="MODAL_TYPE.SPECIALSERVICE"
    type="专项服务"
  >
    <template #default="data">
      <SpecialServiceDrawer v-bind="data" />
    </template>
  </OrderLayout>
</template>
