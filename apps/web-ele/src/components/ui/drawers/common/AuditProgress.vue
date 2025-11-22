<script lang="ts" setup>
import { computed } from 'vue';

import { Check, CircleX, Users } from '@vben/icons';

import AEmpty from '#/components/common/empty/index.vue';

import { useWorkflow } from './useWorkflow';

interface IProps {
  instanceId?: string;
}

const props = defineProps<IProps>();

const { workflow, steps } = useWorkflow(props);

const showAudit = computed(() => {
  if (!workflow.value) {
    return false;
  }
  return true;
});
</script>

<template>
  <div class="flex flex-col gap-8 border-b py-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="rounded-md bg-cyan-400 p-2">
          <Users class="size-4 text-white" />
        </div>
        <span>审批流信息</span>
      </div>
      <div v-if="showAudit">
        <el-button :icon="Check" type="success">通过</el-button>
        <el-button :icon="CircleX" type="danger">拒绝</el-button>
      </div>
    </div>
    <el-steps v-if="workflow" align-center>
      <el-step
        v-for="step in steps"
        :key="step.node.id"
        :description="step.approval?.comment"
        :title="step.node.nodeName"
      />
      <!-- <el-step
        :icon="LoaderCircle"
        class="current-step"
        description="Some description"
        title="Step 2"
      />
      <el-step
        :icon="CircleDashed"
        description="Some description"
        title="Step 3"
      /> -->
    </el-steps>
    <AEmpty v-else />
  </div>
</template>

<style scoped lang="scss">
.current-step {
  :deep(.el-step__icon.is-icon) {
    color: #3131ff;
  }
}
</style>
