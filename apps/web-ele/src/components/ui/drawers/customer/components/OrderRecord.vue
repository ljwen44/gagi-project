<script lang="ts" setup>
import type { FormItemType } from '@vben/types';

import { ref } from 'vue';

import TableLayout from '#/components/table-layout/index.vue';
import ProtocolForm from '#/components/ui/protocol/form.vue';

import { orderRecordColumns } from '../config';

const formItems: FormItemType[] = [
  {
    label: '关键字',
    key: 'keyword',
    props: {
      placeholder: '请输入关键字',
    },
  },
];

const showModal = ref(false);
</script>

<template>
  <TableLayout
    :api="() => {}"
    :columns="orderRecordColumns"
    :form-items="formItems"
    :hidden-filter="true"
  >
    <template #action>
      <el-button type="primary" @click="showModal = true">添加</el-button>
    </template>

    <template #protocolCode="{ row }">
      <el-link type="primary">{{ row.protocolCode }}</el-link>
    </template>
    <template #auditStatus="{ row }">
      <el-tag effect="dark" type="success">{{ row.auditStatus }}</el-tag>
    </template>
    <template #workOrder="{ row }">
      <el-tag type="success">{{ row.workOrder }}</el-tag>
    </template>
    <template #collection="{ row }">
      <el-tag type="primary">{{ row.collection }}</el-tag>
    </template>
    <template #performanceAllocation="{ row }">
      <el-tag type="primary">{{ row.performanceAllocation }}</el-tag>
    </template>

    <ProtocolForm v-model="showModal" />
  </TableLayout>
</template>
