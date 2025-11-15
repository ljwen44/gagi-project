<script setup lang="ts">
import type { SelectProps } from 'element-plus';

import { defineModel } from 'vue';

// type IProps = {
//   options: Array<{ disabled?: boolean; label: string; value: any }>;
//   placeholder?: string;
// } & SelectProps;

interface IProps extends SelectProps {
  options: Array<{ disabled?: boolean; label: string; value: any }>;
  placeholder?: string;
  width?: number | string;
}

defineProps<IProps>();

const modelValue = defineModel();
</script>

<template>
  <el-select
    v-model="modelValue"
    :style="{ width: width || '200px' }"
    v-bind="$props"
    :placeholder
    clearable
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
