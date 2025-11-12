<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

import { preferences } from '@vben/preferences';
import { useUserStore } from '@vben/stores';

import { getPerformanceStat } from '#/api/core/dashboard';
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

const performance = ref({
  currentMonthPerformance: 0,
  halfYearPerformanceList: [],
  todayPerformance: 0,
});

const getDashboard = async () => {
  const data = await getPerformanceStat();
  performance.value = data;
};
onMounted(() => {
  getDashboard();
});
</script>

<template>
  <div class="flex flex-col gap-4 pb-4">
    <WorkbenchHeader
      :avatar="userStore.userInfo?.avatar || preferences.app.defaultAvatar"
      :current-month-performance="performance.currentMonthPerformance"
      :today-performance="performance.todayPerformance"
    >
      <template #title>
        {{ `${greeting}` }}
      </template>
      <!-- <template #description>
        <el-tag type="primary"> 职级: S2 </el-tag>
      </template> -->
    </WorkbenchHeader>

    <WorkbenchContent
      :half-year-performance-list="performance.halfYearPerformanceList"
      title="环比数据监控"
    />

    <WorkbenchFooter />
  </div>
</template>
