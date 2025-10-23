<script lang="ts" setup>
import TableLayout from '#/components/table-layout/index.vue';

import { columns, formItems, tabbar } from './config';
</script>

<template>
  <TableLayout :api="() => []" :columns :form-items="formItems" :tabbar />
</template>

<style lang="scss" scoped></style>
