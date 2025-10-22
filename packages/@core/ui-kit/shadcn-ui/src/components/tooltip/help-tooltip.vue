<script setup lang="ts">
import type { TooltipContentProps } from 'radix-vue';

import { cn } from '@vben-core/shared/utils';

import { CircleHelp } from 'lucide-vue-next';

import Tooltip from './tooltip.vue';

defineOptions({
  inheritAttrs: false,
});

withDefaults(
  defineProps<{ side?: TooltipContentProps['side']; triggerClass?: string }>(),
  {
    side: 'top',
  },
);
</script>

<template>
  <Tooltip :delay-duration="300" :side>
    <template #trigger>
      <slot name="trigger">
        <CircleHelp
          :class="
            cn(
              'text-foreground/80 hover:text-foreground inline-flex size-5 cursor-pointer',
              triggerClass,
            )
          "
        />
      </slot>
    </template>
    <slot></slot>
  </Tooltip>
</template>
