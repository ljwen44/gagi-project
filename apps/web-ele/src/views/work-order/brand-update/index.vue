<script lang="ts" setup>
import BrandUpdateDrawer from '#/components/ui/drawers/workOrder/brand-update/brandUpdateDrawer.vue';

import { MODAL_TYPE } from '../commonConfig';
import OrderLayout from '../OrderLayout.vue';
import { columns } from './config';
</script>

<template>
  <OrderLayout :columns :drawer-type="MODAL_TYPE.BRANDUPDATE" type="商标变更">
    <template #default="data">
      <BrandUpdateDrawer v-bind="data" />
    </template>
  </OrderLayout>
</template>
