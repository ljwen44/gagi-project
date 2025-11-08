<script setup lang="ts">
import type { SelectProps } from 'element-plus';

import { defineModel, useAttrs } from 'vue';

type IProps = {
  options: Array<{ disabled?: boolean; label: string; value: any }>;
  placeholder?: string;
} & Partial<SelectProps>;

defineProps<IProps>();

const modelValue = defineModel();

const attrs = useAttrs();
</script>

<template>
  <el-select
    v-model="modelValue"
    :style="{ width: attrs.width || '200px' }"
    v-bind="attrs"
    :placeholder
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :disabled="item.disabled"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
