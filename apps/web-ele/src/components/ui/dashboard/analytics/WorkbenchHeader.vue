<script lang="ts" setup>
import { VbenAvatar } from '@vben-core/shadcn-ui';

interface Props {
  avatar?: string;
}

defineOptions({
  name: 'WorkbenchHeader',
});

withDefaults(defineProps<Props>(), {
  avatar: '',
});

// const todayTarget = useTransition(1052.63, {
//   duration: 1500
// });
</script>
<template>
  <div class="card-box flex flex-col gap-4 p-4">
    <div class="flex flex-wrap gap-4">
      <div class="flex items-center gap-4">
        <VbenAvatar :src="avatar" class="size-20" />
        <div
          v-if="$slots.title || $slots.description"
          class="flex flex-col justify-center md:mt-0"
        >
          <h1 v-if="$slots.title" class="text-md font-semibold md:text-xl">
            <slot name="title"></slot>
          </h1>
          <span v-if="$slots.description" class="text-foreground/80 mt-1">
            <slot name="description"></slot>
          </span>
        </div>
      </div>
      <div class="mt-4 flex flex-1 justify-end gap-8 md:mt-0">
        <div class="flex flex-col items-center justify-center gap-2">
          <span class="text-foreground/80"> 今日目标 </span>
          <span class="text-3xl">1052.63</span>
          <!-- <el-statistic :value="todayTarget" class="text-3xl" /> -->
        </div>

        <div class="mx-12 flex flex-col items-center justify-center gap-2">
          <span class="text-foreground/80"> 今日已完成 </span>
          <span class="text-3xl">0</span>
        </div>
        <div class="mr-4 flex flex-col items-center justify-center gap-2">
          <span class="text-foreground/80"> 今日未完成 </span>
          <span class="text-3xl">1052.63</span>
        </div>
      </div>
    </div>

    <div class="flex w-full items-center justify-between gap-4 text-white">
      <div class="box flex w-1/4 flex-1 flex-col gap-3 rounded-xl px-4 py-3">
        <span class="text-sm font-light">业绩目标(元)</span>
        <span class="inline-block w-full truncate text-3xl font-bold" title="0">
          20
        </span>
      </div>
      <div class="box flex w-1/4 flex-1 flex-col gap-3 rounded-xl px-4 py-3">
        <span class="text-sm font-light">已完成(元)</span>
        <span class="inline-block w-full truncate text-3xl font-bold" title="0">
          0
        </span>
      </div>
      <div class="box flex w-1/4 flex-1 flex-col gap-3 rounded-xl px-4 py-3">
        <span class="text-sm font-light">未完成(元)</span>
        <span class="inline-block w-full truncate text-3xl font-bold" title="0">
          0
        </span>
      </div>
      <div class="box flex w-1/4 flex-1 flex-col gap-3 rounded-xl px-4 py-3">
        <span class="text-sm font-light">完成率</span>
        <span class="inline-block w-full truncate text-3xl font-bold" title="0">
          0%
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box:nth-child(1) {
  background: linear-gradient(45deg, #2e6dd8, #5ba0f2);
}

.box:nth-child(2) {
  background: linear-gradient(45deg, #20c997, #40e0b5);
}

.box:nth-child(3) {
  background: linear-gradient(45deg, #ffb347, #ffd373);
}

.box:nth-child(4) {
  background: linear-gradient(45deg, #ff8fa3, #ffb3ba);
}
</style>
