<script lang="ts" setup>
import { CircleHelp, Layers } from '@vben/icons';
</script>

<template>
  <div class="flex flex-col gap-4 border-b py-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="rounded-md bg-cyan-700 p-2">
          <Layers class="size-4 text-white" />
        </div>
        <span>做单区域</span>
        <el-tooltip content="todo" placement="top">
          <CircleHelp class="size-4 text-[#f00]" />
        </el-tooltip>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <p>工单回执</p>
      <p>无</p>
    </div>
  </div>
</template>
