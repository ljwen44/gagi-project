<script lang="ts" setup>
import BrandRegisterDrawer from '#/components/ui/drawers/workOrder/brand-register/brandRegisterDrawer.vue';

import { MODAL_TYPE } from '../commonConfig';
import OrderLayout from '../OrderLayout.vue';
import { columns } from './config';
</script>

<template>
  <OrderLayout :columns :drawer-type="MODAL_TYPE.BRANDREGISTER" type="商标注册">
    <template #default="data">
      <BrandRegisterDrawer v-bind="data" />
    </template>
  </OrderLayout>
</template>
