<script lang="ts" setup>
import type { FormItemType } from '@vben/types';

import TableLayout from '#/components/table-layout/index.vue';

import { relatedInfomationOrQuestionsColumns } from '../config';

const formItems: FormItemType[] = [
  {
    label: '标题',
    key: 'keyword',
    props: {
      placeholder: '请输入标题',
    },
  },
];
</script>

<template>
  <TableLayout
    :api="() => {}"
    :columns="relatedInfomationOrQuestionsColumns"
    :form-items="formItems"
    :hidden-filter="true"
  />
</template>
