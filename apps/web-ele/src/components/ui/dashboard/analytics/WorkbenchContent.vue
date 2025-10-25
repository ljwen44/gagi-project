<script setup lang="ts">
import { onMounted, ref } from 'vue';

import {
  EchartsUI,
  type EchartsUIType,
  useEcharts,
} from '@vben/plugins/echarts';
import { Card, CardContent, CardHeader, CardTitle } from '@vben-core/shadcn-ui';

export interface IProps {
  title: string;
}
defineOptions({
  name: 'WorkbenchContent',
});
defineProps<IProps>();
const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

onMounted(() => {
  renderEcharts({
    legend: {
      top: '2%',
      left: 'center',
      data: ['客户数(人)', '跟进数(条)', '回款全额(元)', '业绩全额(元)'],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'],
      axisLabel: {
        interval: 0,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: false,
      },
    },
    series: [
      {
        name: '客户数(人)',
        type: 'bar',
        data: [120, 132, 101, 134, 90, 230],
        itemStyle: {
          color: '#FF6B6B', // 红色
        },
        label: {
          show: true,
          position: 'top',
        },
      },
      {
        name: '跟进数(条)',
        type: 'bar',
        data: [220, 182, 191, 234, 290, 330],
        itemStyle: {
          color: '#4ECDC4', // 青色
        },
        label: {
          show: true,
          position: 'top',
        },
      },
      {
        name: '回款全额(元)',
        type: 'bar',
        data: [150, 232, 201, 154, 190, 330],
        itemStyle: {
          color: '#45B7D1', // 蓝色
        },
        label: {
          show: true,
          position: 'top',
        },
      },
      {
        name: '业绩全额(元)',
        type: 'bar',
        data: [320, 332, 301, 334, 390, 330],
        itemStyle: {
          color: '#96CEB4', // 绿色
        },
        label: {
          show: true,
          position: 'top',
        },
      },
    ],
  });
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-xl">{{ title }}</CardTitle>
    </CardHeader>
    <CardContent>
      <EchartsUI ref="chartRef" />
    </CardContent>
  </Card>
</template>
