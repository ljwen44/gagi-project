<script lang="ts" setup>
import type { TimelineItemProps } from 'element-plus';

import { useAttrs } from 'vue';

import dayjs from 'dayjs';

import AEmpty from '#/components/common/empty/index.vue';

interface IRecord extends Partial<TimelineItemProps> {
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
  <el-timeline v-bind="attrs" v-if="records.length > 0">
    <el-timeline-item
      v-for="(record, index) in records"
      :key="index"
      :timestamp="dayjs(record.time).format('YYYY-MM-DD HH:mm:ss')"
      placement="top"
      v-bind="record"
    >
      <slot>
        {{ record.action }}
      </slot>
    </el-timeline-item>
  </el-timeline>
  <AEmpty v-else />
</template>
