<script lang="ts" setup>
import type { FormItemType } from '@vben/types';

import { Bell, FileText, Star } from '@vben/icons';

import { getWorkOrderList } from '#/api/core/workOrder';
import TableLayout from '#/components/table-layout/index.vue';

import { workOrderRecordColumns } from '../config';

interface IProps {
  form: Record<string, any>;
}

const props = defineProps<IProps>();

const formItems: FormItemType[] = [
  {
    label: '工单编号',
    key: 'agreementId',
    props: {
      placeholder: '请输入工单编号',
    },
  },
];

const beforeQuery = (queryParams: any) => {
  queryParams.pageSize = 999;
  queryParams.customerId = props.form.id;
};
</script>

<template>
  <TableLayout
    :api="getWorkOrderList"
    :before-query
    :columns="workOrderRecordColumns"
    :form-items="formItems"
    :hidden-filter="true"
  >
    <template #orderNo="{ row }">
      <el-text type="primary">{{ row.orderNo }}</el-text>
    </template>
    <template #agreementNo="{ row }">
      <el-text type="primary">{{ row.agreementNo }}</el-text>
    </template>
    <template #customerNo="{ row }">
      <el-text type="primary">{{ row.customerNo }}</el-text>
    </template>

    <template #auditStatus="{ row }">
      <el-tag effect="dark" type="success">{{ row.auditStatus }}</el-tag>
    </template>

    <template #customerConfirm="{ row }">
      <el-tag effect="dark" type="success">{{ row.customerConfirm }}</el-tag>
    </template>

    <template #receiveStatus="{ row }">
      <el-tag effect="dark" type="success">{{ row.receiveStatus }}</el-tag>
    </template>

    <template #workStatus="{ row }">
      <el-tag effect="dark" type="success">{{ row.workStatus }}</el-tag>
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
