<script setup lang="ts">
import type { CascaderProps } from 'element-plus';

import { onMounted, ref } from 'vue';

interface IProps extends Partial<CascaderProps> {
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

const prop = {
  multiple: true,
  value: 'id',
  label: 'permissionName',
};

const selfOptions = ref<any>([]);

const getOptions = async () => {
  if (props.api) {
    const data = await props.api();
    selfOptions.value = props.afterGetOptions
      ? props.afterGetOptions(data)
      : data;
  }
};

onMounted(() => {
  getOptions();
});
</script>

<template>
  <el-cascader
    v-model="value"
    :style="{ width: width || '200px' }"
    v-bind="$props"
    :options="selfOptions"
    :placeholder
    :props="prop"
    clearable
  />
</template>
