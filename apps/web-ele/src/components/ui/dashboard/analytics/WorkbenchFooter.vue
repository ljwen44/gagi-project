<script setup lang="ts">
import { computed } from 'vue';

import {
  AlertTriangle,
  CheckCircle,
  FileText,
  Phone,
  Server,
  ShieldAlert,
  ShoppingCart,
} from '@vben/icons';
import { Card, CardContent } from '@vben-core/shadcn-ui';

interface Props {}

defineOptions({
  name: 'WorkbenchFooter',
});

defineProps<Props>();

const items = [
  {
    label: '未完成工单数(个)',
    key: 'unfinishedWorkOrder',
    icon: FileText,
    color: '#3B82F6',
  },
  {
    label: '销售待办工单数(个)',
    key: 'saleTodoWorkOrder',
    icon: ShoppingCart,
    color: '#10B981',
  },
  {
    label: '后端未接单工单数(个)',
    key: 'bkWorkOrder',
    icon: Server,
    color: '#A855F7',
  },
  {
    label: '后端未完结工单数(个)',
    key: 'bkfinishedWorkOrder',
    icon: CheckCircle,
    color: '#34D399',
  },
  {
    label: '销售待办异常工单数(个)',
    key: 'saleTodoAbnormalWorkOrder',
    icon: AlertTriangle,
    color: '#F97316',
  },
  {
    label: '后端待办异常工单数(个)',
    key: 'bkTodoAbnormalWorkOrder',
    icon: AlertTriangle,
    color: '#EF4444',
  },
  {
    label: '未回款协议数(个)',
    key: 'unpaidAgreement',
    icon: ShieldAlert,
    color: '#EAB308',
  },
  {
    label: '未回访工单数(个)',
    key: 'unvisitedWorkOrder',
    icon: Phone,
    color: '#6366F1',
  },
];

const data = computed<Record<string, any>>(() => ({}));
</script>

<template>
  <Card>
    <CardContent class="flex flex-wrap p-0">
      <template v-for="(item, index) in items" :key="item.title">
        <div
          :class="{
            'border-r-0': index % 4 === 3,
            'border-b-0': index < 4,
            'border-t-0': index < 4,
            'pb-4': index > 3,
          }"
          class="border-border group flex w-full items-center gap-4 border-r border-t p-4 transition-all hover:shadow-xl md:w-1/2 lg:w-1/4"
        >
          <div
            :style="`background-color: ${item.color}`"
            class="rounded-full p-1.5"
          >
            <component :is="item.icon" class="size-6 text-white" />
          </div>
          <div class="flex flex-1 flex-col gap-1">
            <span class="text-foreground/60"> {{ item.label }} </span>
            <span class="inline-block w-full truncate text-3xl">
              {{ data[item.key] ?? 0 }}
            </span>
          </div>
        </div>
      </template>
    </CardContent>
  </Card>
</template>
