<script setup lang="ts">
import { computed } from 'vue';

import {
  HandCoins,
  MessageSquare,
  TrendingDown,
  TrendingUp,
  Users,
} from '@vben/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@vben-core/shadcn-ui';

import dayjs from 'dayjs';

interface halfYearPerformaceDto {
  month: string;
  amount: number;
}

export interface IProps {
  title: string;
  halfYearPerformanceList: Array<halfYearPerformaceDto>;
}
defineOptions({
  name: 'WorkbenchContent',
});
const props = withDefaults(defineProps<IProps>(), {
  title: '',
  halfYearPerformanceList: () => [],
});

const items = [
  {
    label: '客户数（人）',
    key: 'customerCount',
    icon: Users,
    color: '#FF6B6B',
    data: [],
    amount: '-',
  },
  {
    label: '跟进数（条）',
    key: 'followUpCount',
    icon: MessageSquare,
    color: '#4ECDC4',
    data: [],
    amount: '-',
  },
  {
    label: '回款全额（元）',
    key: 'paymentAmount',
    icon: HandCoins,
    color: '#45B7D1',
    data: [],
    amount: '-',
  },
  {
    label: '业绩全额（元）',
    key: 'performanceAmount',
    icon: TrendingUp,
    color: '#96CEB4',
    data: [],
    amount: '-',
  },
];

const last6Month = Array.from(
  {
    length: 6,
  },
  (_, index) =>
    dayjs()
      .subtract(index + 1, 'month')
      .format('YYYY-MM'),
);

const last6MonthPerformance = computed(() => {
  const map: Record<string, any> = {};
  items.forEach((item) => {
    map[item.key] =
      item.key === 'performanceAmount'
        ? {
            ...item,
            // eslint-disable-next-line unicorn/no-array-reduce
            data: props.halfYearPerformanceList.reduce(
              (prev, curr) => {
                prev[curr.month] = curr.amount;
                return prev;
              },
              {} as Record<string, any>,
            ),
            amount:
              props.halfYearPerformanceList.find(
                (item) => item.month === dayjs().format('YYYY-MM'),
              )?.amount || '-',
          }
        : {
            ...item,
          };
  });
  return map;
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-xl">{{ title }}</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid w-full grid-cols-4 gap-4 max-md:grid-cols-2">
        <template v-for="item in last6MonthPerformance" :key="item.key">
          <Card>
            <CardTitle class="flex items-center gap-2 border-b p-4">
              <div
                :style="`background-color: ${item.color}`"
                class="rounded-full p-1.5"
              >
                <component :is="item.icon" class="size-6 text-white" />
              </div>
              <span>
                {{ item.label }}
              </span>
              <span>{{ item.amount || '-' }}</span>
            </CardTitle>
            <CardContent class="flex flex-col gap-2 p-4">
              <div
                v-for="month in last6Month"
                :key="month"
                class="flex items-center gap-2"
              >
                <span class="text-lg">较 {{ month }}</span>
                <span class="text-xl">{{ item.data[month] || '-' }}</span>
                <component
                  :is="
                    item.data[month] <= item.amount ? TrendingUp : TrendingDown
                  "
                  v-if="item.data[month] !== undefined"
                  :class="
                    item.data[month] <= item.amount
                      ? 'text-green-500'
                      : 'text-red-500'
                  "
                  class="size-4"
                />
              </div>
            </CardContent>
          </Card>
        </template>
      </div>
    </CardContent>
  </Card>
</template>
