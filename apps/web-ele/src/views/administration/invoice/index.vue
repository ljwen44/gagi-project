<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import TableLayout from '#/components/table-layout/index.vue';
import InvoiceForm from '#/components/ui/administration/invoice/form.vue';
import InvoiceDrawer from '#/components/ui/drawers/administration/invoiceDrawer.vue';

import { columns, formItems } from './config';

const invoiceFormRef = useTemplateRef('invoiceFormRef');

const show = ref(false);
</script>

<template>
  <TableLayout :api="() => []" :columns :form-items="formItems">
    <template #action>
      <el-button type="primary" @click="invoiceFormRef?.openModal()">
        添加
      </el-button>
      <el-button type="primary" @click="show = true"> 抽屉 </el-button>
    </template>

    <InvoiceForm ref="invoiceFormRef" />

    <InvoiceDrawer :show @closed="show = false" />
  </TableLayout>
</template>
