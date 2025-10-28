<script lang="ts" setup>
import { Check, CircleX, Users } from '@vben/icons';
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
      <div>
        <el-button :icon="Check" type="success">通过</el-button>
        <el-button :icon="CircleX" type="danger">拒绝</el-button>
      </div>
    </div>
    <el-steps
      :active="2"
      align-center
      finish-status="success"
      process-status="process"
    >
      <el-step description="Some description" title="Step 1" />
      <el-step description="Some description" title="Step 2" />
      <el-step description="Some description" title="Step 3" />
    </el-steps>
  </div>
</template>
