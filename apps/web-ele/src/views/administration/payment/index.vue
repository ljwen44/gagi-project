<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import TableLayout from '#/components/table-layout/index.vue';
import PaymentForm from '#/components/ui/administration/payment/form.vue';
import RemibursementDrawer from '#/components/ui/drawers/administration/paymentDrawer.vue';

import { columns, formItems, tabbar } from './config';

const paymentFormRef = useTemplateRef('paymentFormRef');

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
      <el-button type="primary" @click="paymentFormRef?.openModal()">
        添加
      </el-button>
      <el-button size="default" type="primary" @click="show = true">
        抽屉
      </el-button>
    </template>

    <PaymentForm ref="paymentFormRef" />

    <RemibursementDrawer :show @closed="show = false" />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
