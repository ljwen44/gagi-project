<script lang="ts" setup>
import { MODAL_TYPE } from '../commonConfig';
import OrderLayout from '../OrderLayout.vue';
import { columns } from './config';
</script>

<template>
  <OrderLayout :columns :drawer-type="MODAL_TYPE.PATENTUPDATE" type="专利变更">
    <!-- <template #default="data">
      <PatentObjectionDrawer v-bind="data" />
    </template> -->
  </OrderLayout>
</template>
