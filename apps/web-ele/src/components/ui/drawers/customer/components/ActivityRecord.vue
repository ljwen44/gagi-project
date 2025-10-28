<script lang="ts" setup>
import type { FormItemType } from '@vben/types';

import { ref } from 'vue';

import {
  AlertCircle,
  CircleCheck,
  CirclePlus,
  CircleX,
  Database,
  Heart,
} from '@vben/icons';

import TableLayout from '#/components/table-layout/index.vue';

import { activityRecordColumns, activityRecordJoinedColumns } from '../config';

const formItems: FormItemType[] = [
  {
    label: '关键字',
    key: 'keyword',
    props: {
      placeholder: '请输入活动名称/活动地点/活动目的等进行查询',
    },
  },
];
const activeName = ref('join');
</script>

<template>
  <TableLayout
    :api="() => {}"
    :columns="
      activeName === 'joined'
        ? activityRecordJoinedColumns
        : activityRecordColumns
    "
    :form-items="formItems"
    :hidden-filter="true"
  >
    <template #tableBar>
      <el-tabs v-model="activeName" tab-position="left">
        <el-tab-pane label="可参加" name="join" />
        <el-tab-pane label="已参加" name="joined" />
      </el-tabs>
    </template>

    <template #flagHeader>
      <el-tooltip placement="top">
        <template #content>
          <p class="flex items-center">
            活动新增<CirclePlus
              class="ml-1 size-3 text-[#f00]"
            />，公海客户<Database
              class="ml-1 size-3 text-[#272525]"
            />，自己的客户<Heart
              class="ml-1 size-3 text-[#00f]"
            />，其他销售未成交<CircleX
              class="ml-1 size-3 text-[#ff4000]"
            />，其他销售已成交<CircleCheck class="ml-1 size-3 text-[#0f0]" />
          </p>
          <p>参与类型为主动邀请的客户不带标识</p>
        </template>
        <AlertCircle class="size-4 text-[#f00]" />
      </el-tooltip>
    </template>
  </TableLayout>
</template>
