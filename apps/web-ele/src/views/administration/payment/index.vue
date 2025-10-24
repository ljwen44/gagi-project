<script lang="ts" setup>
import { useTemplateRef } from 'vue';

import TableLayout from '#/components/table-layout/index.vue';
import PaymentForm from '#/components/ui/administration/payment/form.vue';

import { columns, formItems, tabbar } from './config';

const paymentFormRef = useTemplateRef('paymentFormRef');
</script>

<template>
  <TableLayout
    :api="() => []"
    :columns
    :form-items="formItems"
    :tabbar="tabbar"
  >
    <template #action>
      <el-button type="primary" @click="paymentFormRef?.openModal()">
        添加
      </el-button>
    </template>

    <PaymentForm ref="paymentFormRef" />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
