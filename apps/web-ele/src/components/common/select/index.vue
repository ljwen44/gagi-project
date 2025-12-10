<script setup lang="ts">
import type { SelectProps } from 'element-plus';

import { onMounted, ref } from 'vue';

// type IProps = {
//   options: Array<{ disabled?: boolean; label: string; value: any }>;
//   placeholder?: string;
// } & SelectProps;

interface IProps extends Partial<SelectProps> {
  options?: Array<{ disabled?: boolean; label: string; value: any }>;
  placeholder?: string;
  width?: number | string;
  labelKey?: string;
  valueKey?: string;
  api?: () => void;
  afterGetOptions?: (data: any) => any;
}

const props = defineProps<IProps>();

const value = defineModel();

const selfOptions = ref<any>([]);

const getOptions = async () => {
  if (props.api) {
    const data = await props.api();
    selfOptions.value = data;
  }
};

onMounted(() => {
  getOptions();
});
</script>

<template>
  <el-select
    v-model="value"
    :style="{ width: width || '200px' }"
    v-bind="$props"
    :placeholder
    clearable
  >
    <el-option
      v-for="item in options || selfOptions"
      :key="item.value"
      :disabled="item.disabled"
      :label="item[labelKey || 'label']"
      :value="item[valueKey || 'value']"
    />
  </el-select>
</template>
