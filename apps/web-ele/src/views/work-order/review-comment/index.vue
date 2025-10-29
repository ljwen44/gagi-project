<script lang="ts" setup>
import { ref } from 'vue';

import TableLayout from '#/components/table-layout/index.vue';
import ReviewCommentDrawer from '#/components/ui/drawers/workOrder/review-comment/reviewCommentDrawer.vue';

import { columns, formItems } from './config';

const showDrawer = ref(false);
</script>

<template>
  <TableLayout :api="() => []" :columns :form-items="formItems">
    <template #action>
      <el-button type="primary" @click="showDrawer = true">抽屉</el-button>
    </template>

    <ReviewCommentDrawer :show="showDrawer" @closed="showDrawer = false" />
  </TableLayout>
</template>
