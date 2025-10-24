<script lang="ts" setup>
import type { RadioProps } from 'element-plus';

import { useAttrs } from 'vue';

interface OptionItem {
  label: string;
  value: string;
}

interface IProps extends RadioProps {
  options: OptionItem[];
}

defineProps<IProps>();

const radioValue = defineModel();

const attrs = useAttrs();
</script>

<template>
  <el-radio-group v-model="radioValue" v-bind="attrs">
    <el-radio
      v-for="radio in options"
      :key="radio.value"
      :label="radio.label"
      :value="radio.value"
    />
  </el-radio-group>
</template>
