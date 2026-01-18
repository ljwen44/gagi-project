<script lang="ts" setup>
import { getAgreementList } from '#/api/core/protocol';
import TableLayout from '#/components/table-layout/index.vue';

import { protocolDetailColumns } from './config';

interface IProps {
  form: any;
  columns: any;
}

const props = defineProps<IProps>();

const statusTypeMap: Record<string, string> = {
  暂存: 'info',
  已完结: 'success',
  已驳回: 'danger',
};

const beforeQuery = (queryParams: any) => {
  queryParams.agreementNo = props.form?.agreementNo;
};
</script>

<template>
  <TableLayout
    :api="getAgreementList"
    :before-query
    :columns="protocolDetailColumns"
    :form-items="[]"
    hidden-filter
  >
    <template #agreementNo="{ row }">
      <el-text type="primary">
        {{ row.agreementNo }}
      </el-text>
    </template>

    <template #customerNo="{ row }">
      <el-text type="primary">
        {{ row.customerNo }}
      </el-text>
    </template>

    <template #status="{ row }">
      <el-tag :type="statusTypeMap[row.status] || 'primary'" effect="dark">
        {{ row.status }}
      </el-tag>
    </template>
  </TableLayout>
</template>
