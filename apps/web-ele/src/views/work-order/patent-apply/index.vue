<script lang="ts" setup>
import PatentApplyDrawer from '#/components/ui/drawers/workOrder/patent-apply/patentApplyDrawer.vue';

import { MODAL_TYPE } from '../commonConfig';
import OrderLayout from '../OrderLayout.vue';
import { columns } from './config';
</script>

<template>
  <OrderLayout :columns :drawer-type="MODAL_TYPE.PATENTAPPLY" type="专利申请">
    <template #default="data">
      <PatentApplyDrawer v-bind="data" />
    </template>
  </OrderLayout>
</template>
