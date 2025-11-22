<script lang="ts" setup>
import PatentObjectionDrawer from '#/components/ui/drawers/workOrder/patent-objection/patentObjectionDrawer.vue';

import { MODAL_TYPE } from '../commonConfig';
import OrderLayout from '../OrderLayout.vue';
import { columns } from './config';
</script>

<template>
  <OrderLayout :columns :drawer-type="MODAL_TYPE.PATENTAPPLY" type="专利异议">
    <template #default="data">
      <PatentObjectionDrawer v-bind="data" />
    </template>
  </OrderLayout>
</template>
