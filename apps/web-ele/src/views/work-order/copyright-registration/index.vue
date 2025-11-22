<script lang="ts" setup>
import CopyrightRegistrationDrawer from '#/components/ui/drawers/workOrder/copyright-registration/copyrightRegistrationDrawer.vue';

import { MODAL_TYPE } from '../commonConfig';
import OrderLayout from '../OrderLayout.vue';
import { columns } from './config';
</script>

<template>
  <OrderLayout :columns :drawer-type="MODAL_TYPE.COPYRIGHT" type="版权登记">
    <template #default="data">
      <CopyrightRegistrationDrawer v-bind="data" />
    </template>
  </OrderLayout>
</template>
