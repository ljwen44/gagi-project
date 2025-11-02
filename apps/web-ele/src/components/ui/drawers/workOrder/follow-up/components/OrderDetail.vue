<script lang="ts" setup>
import { ref } from 'vue';

import { detailFormItems } from '../config';

const form = ref<Record<string, any>>({});
</script>

<template>
  <div class="grid grid-cols-2 gap-3">
    <div
      v-for="item in detailFormItems"
      :key="item.prop"
      class="flex flex-wrap gap-2 text-sm"
      v-bind="item"
    >
      <slot :name="`${item.prop}Label`">
        <span class="text-foreground/80">{{ item.label }}:</span>
      </slot>
      <slot :data="form[item.prop!]" :name="item.prop">
        <el-text>{{ form[item.prop!] }}</el-text>
      </slot>
    </div>
  </div>
</template>
