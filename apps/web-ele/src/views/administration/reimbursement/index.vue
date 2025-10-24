<script lang="ts" setup>
import { useTemplateRef } from 'vue';

import TableLayout from '#/components/table-layout/index.vue';
import RemibursementForm from '#/components/ui/administration/reimbursement/form.vue';

import { columns, formItems, tabbar } from './config';

const remibursementFormRef = useTemplateRef('remibursementFormRef');
</script>

<template>
  <TableLayout
    :api="() => []"
    :columns
    :form-items="formItems"
    :tabbar="tabbar"
  >
    <template #action>
      <el-button
        size="default"
        type="primary"
        @click="remibursementFormRef?.openModal()"
      >
        添加
      </el-button>
    </template>

    <RemibursementForm ref="remibursementFormRef" />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
