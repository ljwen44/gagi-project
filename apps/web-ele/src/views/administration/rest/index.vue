<script lang="ts" setup>
import { useTemplateRef } from 'vue';

import TableLayout from '#/components/table-layout/index.vue';
import RestForm from '#/components/ui/administration/rest/form.vue';

import { columns, formItems } from './config';

const restFormRef = useTemplateRef('restFormRef');
</script>

<template>
  <TableLayout :api="() => []" :columns :form-items="formItems">
    <template #action>
      <el-button type="primary" @click="restFormRef?.openModal()">
        添加
      </el-button>
    </template>

    <RestForm ref="restFormRef" />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
