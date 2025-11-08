<script lang="ts" setup>
import type { FormItemType } from '@vben/types';

import { Bell, FileText, Star } from '@vben/icons';

import TableLayout from '#/components/table-layout/index.vue';

import { workOrderRecordColumns } from '../config';

const formItems: FormItemType[] = [
  {
    label: 's工单编号',
    key: 'number',
    props: {
      placeholder: '请输入工单编号',
    },
  },
];
</script>

<template>
  <TableLayout
    :api="() => {}"
    :columns="workOrderRecordColumns"
    :form-items="formItems"
    :hidden-filter="true"
  >
    <template #number="{ row }">
      <el-link type="primary">
        {{ row.number }}
      </el-link>
    </template>

    <template #status="{ row }">
      <el-tag effect="dark" type="success">{{ row.status }}</el-tag>
    </template>

    <template #customerConfirm="{ row }">
      <el-tag effect="dark" type="success">{{ row.customerConfirm }}</el-tag>
    </template>

    <template #acceptStatus="{ row }">
      <el-tag effect="dark" type="success">{{ row.acceptStatus }}</el-tag>
    </template>

    <template #orderStatus="{ row }">
      <el-tag effect="dark" type="success">{{ row.orderStatus }}</el-tag>
    </template>

    <template #finishConfirm="{ row }">
      <el-tag effect="dark" type="success">{{ row.finishConfirm }}</el-tag>
    </template>

    <template #operator>
      <div class="flex items-center justify-center gap-2">
        <FileText class="size-4 cursor-pointer text-orange-400" />
        <Star class="size-4 cursor-pointer text-red-600" />
        <Bell class="size-4 cursor-pointer text-green-600" />
      </div>
    </template>
  </TableLayout>
</template>
