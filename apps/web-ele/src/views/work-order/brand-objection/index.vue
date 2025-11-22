<script lang="ts" setup>
import BrandObjectionDrawer from '#/components/ui/drawers/workOrder/brand-objection/brandObjectionDrawer.vue';

import { MODAL_TYPE } from '../commonConfig';
import OrderLayout from '../OrderLayout.vue';
import { columns } from './config';
</script>

<template>
  <OrderLayout
    :columns
    :drawer-type="MODAL_TYPE.BRANDOBJECTION"
    type="商标异议"
  >
    <template #default="data">
      <BrandObjectionDrawer v-bind="data" />
    </template>
  </OrderLayout>
</template>
