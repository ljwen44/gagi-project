<script lang="ts" setup>
import type { FormItemType } from '@vben/types';

import { useTemplateRef, watch } from 'vue';

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

const tableLayoutRef = useTemplateRef('tableLayoutRef');
const protocolFormRef = useTemplateRef('protocolFormRef');

const beforeQuery = (queryParams: any) => {
  queryParams.pageSize = 999;
  queryParams.customerId = props.form.id;
};

watch(
  () => props.form.id,
  () => {
    tableLayoutRef.value?.query();
  },
);
</script>

<template>
  <TableLayout
    ref="tableLayoutRef"
    :api="getAgreementList"
    :before-query
    :columns="orderRecordColumns"
    :form-items="formItems"
    :hidden-filter="true"
  >
    <template #action>
      <el-button
        type="primary"
        @click="
          protocolFormRef?.openModal({
            target: {
              custId: form.id,
              signTitle: form.companyName,
            },
          })
        "
      >
        添加
      </el-button>
    </template>

    <template #agreementNo="{ row }">
      <el-text type="primary">{{ row.agreementNo }}</el-text>
    </template>
    <template #status="{ row }">
      <el-tag effect="dark" type="success">{{ row.status }}</el-tag>
    </template>

    <ProtocolForm
      ref="protocolFormRef"
      :customer-options="[{ ...form, label: form.companyName, value: form.id }]"
      from-customer
    />
  </TableLayout>
</template>
