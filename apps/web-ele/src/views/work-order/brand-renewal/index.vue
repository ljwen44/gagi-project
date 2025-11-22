<script lang="ts" setup>
import BrandRenewalDrawer from '#/components/ui/drawers/workOrder/brand-renewal/brandRenewalDrawer.vue';

import { MODAL_TYPE } from '../commonConfig';
import OrderLayout from '../OrderLayout.vue';
import { columns } from './config';
</script>

<template>
  <OrderLayout :columns :drawer-type="MODAL_TYPE.BRANDRENEWAL" type="商标续展">
    <template #default="data">
      <BrandRenewalDrawer v-bind="data" />
    </template>
  </OrderLayout>
</template>
