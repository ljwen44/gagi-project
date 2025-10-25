<script lang="ts" setup>
import { computed } from 'vue';

import { preferences } from '@vben/preferences';
import { useUserStore } from '@vben/stores';

import {
  WorkbenchContent,
  WorkbenchFooter,
  WorkbenchHeader,
} from '#/components/ui/dashboard/analytics/index';

const userStore = useUserStore();

const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 11) {
    return `早上好`;
  }
  if (hour < 18) {
    return `下午好`;
  }
  return `晚上好`;
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <WorkbenchHeader
      :avatar="userStore.userInfo?.avatar || preferences.app.defaultAvatar"
    >
      <template #title>
        {{ `${greeting}${userStore.userInfo?.realName}` }}
      </template>
      <template #description>
        <el-tag type="primary"> 职级: S2 </el-tag>
      </template>
    </WorkbenchHeader>

    <WorkbenchContent title="环比数据监控">
      <div>aaa</div>
    </WorkbenchContent>

    <WorkbenchFooter />
  </div>
</template>
