<script lang="ts" setup>
import type { FormItemType } from '@vben/types';

import { ref } from 'vue';

import { getAgreementList } from '#/api/core/protocol';
import TableLayout from '#/components/table-layout/index.vue';
import ProtocolForm from '#/components/ui/protocol/form.vue';

import { orderRecordColumns } from '../config';

interface IProps {
  form: Record<string, any>;
}

const props = defineProps<IProps>();

const formItems: FormItemType[] = [
  {
    label: '协议编号',
    key: 'agreementNo',
    props: {
      placeholder: '请输入协议编号',
    },
  },
];

const showModal = ref(false);
const beforeQuery = (queryParams: any) => {
  queryParams.pageSize = 999;
  queryParams.customerId = props.form.id;
};
</script>

<template>
  <TableLayout
    :api="getAgreementList"
    :before-query
    :columns="orderRecordColumns"
    :form-items="formItems"
    :hidden-filter="true"
  >
    <template #action>
      <el-button type="primary" @click="showModal = true">添加</el-button>
    </template>

    <template #agreementNo="{ row }">
      <el-link type="primary">{{ row.agreementNo }}</el-link>
    </template>
    <template #status="{ row }">
      <el-tag effect="dark" type="success">{{ row.status }}</el-tag>
    </template>
    <ProtocolForm v-model="showModal" />
  </TableLayout>
</template>
