<script lang="ts" setup>
import { useTemplateRef } from 'vue';

import TableLayout from '#/components/table-layout/index.vue';
import InvoiceForm from '#/components/ui/administration/invoice/form.vue';

import { columns, formItems } from './config';

const invoiceFormRef = useTemplateRef('invoiceFormRef');
</script>

<template>
  <TableLayout :api="() => []" :columns :form-items="formItems">
    <template #action>
      <el-button type="primary" @click="invoiceFormRef?.openModal()">
        添加
      </el-button>
    </template>

    <InvoiceForm ref="invoiceFormRef" />
  </TableLayout>
</template>
