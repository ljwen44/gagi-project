<script lang="ts" setup>
import TableLayout from '#/components/table-layout/index.vue';

import { formItems, tabbar } from '../commonConfig';
import { columns } from './config';
</script>

<template>
  <TableLayout :api="() => []" :columns :form-items="formItems" :tabbar />
</template>

<style lang="scss" scoped></style>
