<script lang="ts" setup>
import type { FormItemType } from '@vben/types';

import {
  AuditStatusMap,
  ConfirmMap,
  ReceiveStatusMap,
  TagTypeMap,
  WorkStatusMap,
} from '@vben/constants';
import { Bell } from '@vben/icons';

import { getWorkOrderList } from '#/api/core/workOrder';
import TableLayout from '#/components/table-layout/index.vue';

import { workOrderColumns } from '../config';

interface IProps {
  form: Record<string, any>;
}

const props = defineProps<IProps>();

const formItems: FormItemType[] = [
  {
    label: '工单编号',
    key: 'orderNo',
    props: {
      placeholder: '请输入工单编号',
    },
  },
];

const beforeQuery = (queryParams: any) => {
  queryParams.pageSize = 999;
  queryParams.agreementId = props.form.id;
};
</script>

<template>
  <TableLayout
    :api="getWorkOrderList"
    :before-query
    :columns="workOrderColumns"
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
      <el-tag :type="TagTypeMap[row.auditStatus]" effect="dark">
        {{ AuditStatusMap[row.auditStatus] }}
      </el-tag>
    </template>

    <template #customerConfirm="{ row }">
      <el-tag :type="TagTypeMap[row.customerConfirm]" effect="dark">
        {{ ConfirmMap[row.customerConfirm] }}
      </el-tag>
    </template>

    <template #receiveStatus="{ row }">
      <el-tag :type="TagTypeMap[row.receiveStatus]" effect="dark">
        {{ ReceiveStatusMap[row.receiveStatus] }}
      </el-tag>
    </template>

    <template #workStatus="{ row }">
      <el-tag :type="TagTypeMap[row.workStatus]" effect="dark">
        {{ WorkStatusMap[row.workStatus] }}
      </el-tag>
    </template>

    <template #operator>
      <div class="flex items-center justify-center gap-2">
        <Bell class="size-4 cursor-pointer text-green-600" />
      </div>
    </template>
  </TableLayout>
</template>
