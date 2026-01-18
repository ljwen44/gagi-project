<script lang="ts" setup>
import type { Workflow } from './useWorkflow';

import { computed, useAttrs } from 'vue';

import { Check, X } from '@vben/icons';

import dayjs from 'dayjs';

import AEmpty from '#/components/common/empty/index.vue';

interface IProps {
  workflow: Workflow;
}

const props = defineProps<IProps>();

const attrs = useAttrs();

const approvals = computed(() => props.workflow?.value?.approvals || []);
</script>

<template>
  <el-timeline v-bind="attrs" v-if="approvals?.length > 0">
    <el-timeline-item
      v-for="record in approvals"
      :key="record.approvalTime"
      :icon="record.approvalType === 1 ? Check : X"
      :timestamp="dayjs(record.approvalTime).format('YYYY-MM-DD HH:mm:ss')"
      :type="record.approvalType === 1 ? 'success' : 'danger'"
      placement="top"
      v-bind="record"
      size="large"
    >
      <slot>
        <el-card>
          <h4 class="mb-4">用户: {{ record.approverName }}</h4>
          <p>评审意见: {{ record.comment || '-' }}</p>
        </el-card>
      </slot>
    </el-timeline-item>
  </el-timeline>
  <AEmpty v-else />
</template>
