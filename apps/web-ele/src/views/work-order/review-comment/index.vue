<script lang="ts" setup>
import ReviewCommentDrawer from '#/components/ui/drawers/workOrder/review-comment/reviewCommentDrawer.vue';

import { MODAL_TYPE } from '../commonConfig';
import OrderLayout from '../OrderLayout.vue';
import { columns } from './config';
</script>

<template>
  <OrderLayout :columns :drawer-type="MODAL_TYPE.REVIEW" type="审查意见">
    <template #default="data">
      <ReviewCommentDrawer v-bind="data" />
    </template>
  </OrderLayout>
</template>
