<script setup lang="ts">
import { HandCoins, MessageSquare, TrendingUp, Users } from '@vben/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@vben-core/shadcn-ui';

import dayjs from 'dayjs';

export interface IProps {
  title: string;
}
defineOptions({
  name: 'WorkbenchContent',
});
defineProps<IProps>();

const items = [
  {
    label: '客户数(人)',
    key: 'customerCount',
    icon: Users,
    color: '#FF6B6B',
  },
  {
    label: '跟进数(条)',
    key: 'followUpCount',
    icon: MessageSquare,
    color: '#4ECDC4',
  },
  {
    label: '回款全额(元)',
    key: 'paymentAmount',
    icon: HandCoins,
    color: '#45B7D1',
  },
  {
    label: '业绩全额(元)',
    key: 'performanceAmount',
    icon: TrendingUp,
    color: '#96CEB4',
  },
];

const last6Month = Array.from(
  {
    length: 6,
  },
  (_, index) => dayjs().subtract(index, 'month').format('YYYY-MM'),
);
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-xl">{{ title }}</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid w-full grid-cols-4 gap-4 max-md:grid-cols-2">
        <template v-for="item in items" :key="item.key">
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
              <span>0</span>
            </CardTitle>
            <CardContent class="flex flex-col gap-2 p-4">
              <div
                v-for="month in last6Month"
                :key="month"
                class="flex items-center gap-2"
              >
                <span class="text-lg">较 {{ month }}</span>
                <span class="text-xl">-</span>
              </div>
            </CardContent>
          </Card>
        </template>
      </div>
    </CardContent>
  </Card>
</template>
