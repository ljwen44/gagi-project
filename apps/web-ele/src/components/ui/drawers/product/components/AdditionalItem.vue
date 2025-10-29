<script lang="ts" setup>
import type { FormItemType } from '@vben/types';

import TableLayout from '#/components/table-layout/index.vue';

import { additionalItemColumns } from '../config';

const formItems: FormItemType[] = [
  {
    label: '附加项名称',
    key: 'keyword',
    props: {
      placeholder: '请输入附加项名称',
    },
  },
];
</script>

<template>
  <TableLayout
    :api="() => {}"
    :columns="additionalItemColumns"
    :form-items="formItems"
    :hidden-filter="true"
  />
</template>
