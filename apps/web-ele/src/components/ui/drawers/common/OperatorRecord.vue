<script lang="ts" setup>
import { useAttrs } from 'vue';

import { Circle } from '@vben/icons';

import dayjs from 'dayjs';

import AEmpty from '#/components/common/empty/index.vue';

interface IRecord {
  time: string;
  operator?: string;
  action?: string;
}

interface IProps {
  records: IRecord[];
}

defineProps<IProps>();

const attrs = useAttrs();
</script>

<template>
  <el-steps
    :space="100"
    direction="vertical"
    v-bind="attrs"
    v-if="records.length > 0"
  >
    <el-step v-for="record in records" :key="record.time">
      <template #icon>
        <slot name="icon">
          <Circle class="size-3 text-[#409eff]" fill="#409eff" />
        </slot>
      </template>
      <template #title>
        <slot name="title">
          {{ dayjs(record.time).format('YYYY-MM-DD HH:mm:ss') }}
        </slot>
      </template>
      <template #description>
        <slot name="description"></slot>
      </template>
    </el-step>
  </el-steps>
  <AEmpty v-else />
</template>
