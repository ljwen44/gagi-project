<script lang="ts" setup>
import { computed, ref } from 'vue';

import TableLayout from '#/components/table-layout/index.vue';

import { columns, formItems, tabbar } from './config';

const currentTab = ref('');

const calcColumns = computed(() =>
  ['abnormalProtocol', 'protocol'].includes(currentTab.value)
    ? columns
    : columns.filter((col) => col.prop !== 'contact'),
);

const handleTabClick = (tab: string) => {
  currentTab.value = tab;
};
</script>

<template>
  <TableLayout
    :api="() => []"
    :columns="calcColumns"
    :form-items="formItems"
    :tabbar
    @tab-click="handleTabClick"
  />
</template>

<style lang="scss" scoped></style>
