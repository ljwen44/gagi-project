<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import TableLayout from '#/components/table-layout/index.vue';
import RemibursementForm from '#/components/ui/administration/reimbursement/form.vue';
import RemibursementDrawer from '#/components/ui/drawers/administration/reimbursementDrawer.vue';

import { columns, formItems, tabbar } from './config';

const remibursementFormRef = useTemplateRef('remibursementFormRef');

const show = ref(false);
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
      <el-button size="default" type="primary" @click="show = true">
        抽屉
      </el-button>
    </template>

    <RemibursementForm ref="remibursementFormRef" />

    <RemibursementDrawer :show @closed="show = false" />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
