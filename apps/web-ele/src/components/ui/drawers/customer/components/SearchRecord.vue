<script lang="ts" setup>
import type { FormItemType } from '@vben/types';

import { ref } from 'vue';

import TableLayout from '#/components/table-layout/index.vue';

import {
  searchRecordColumns,
  searchRecordFinishedColumns,
  searchRecordTabbar,
} from '../config';

const formItems: FormItemType[] = [
  {
    label: '关键字',
    key: 'keyword',
    props: {
      placeholder: '请输入检索编号/客户编号',
    },
  },
];
const activeName = ref('unfinished');
</script>

<template>
  <TableLayout
    :api="() => {}"
    :columns="
      activeName === 'finished'
        ? searchRecordFinishedColumns
        : searchRecordColumns
    "
    :form-items="formItems"
    :hidden-filter="true"
    :tabbar="searchRecordTabbar"
  >
    <template #action>
      <el-button type="primary">添加</el-button>
    </template>
    <template #tableBar>
      <el-tabs v-model="activeName" tab-position="left">
        <el-tab-pane label="未完结" name="unfinished" />
        <el-tab-pane label="已完结" name="finished" />
      </el-tabs>
    </template>
  </TableLayout>
</template>
