<script lang="ts" setup>
import type { FormItemProps } from 'element-plus';

import { useAttrs, useTemplateRef } from 'vue';

export interface IFormItem extends Partial<FormItemProps> {
  component?: any;
  componentProps?: Record<string, any>;
  class?: string;
  prop: string;
  format?: (value: any) => any;
}

interface IFormProps {
  items: IFormItem[];
}

defineProps<IFormProps>();
const form = defineModel<Record<string, any>>({
  required: true,
});
const formRef = useTemplateRef('formRef');

const attrs = useAttrs();

const getDisabled = (item: IFormItem) => {
  if (typeof item.componentProps?.disabled === 'function') {
    return item.componentProps?.disabled(form.value);
  }
  return item.componentProps?.disabled;
};

defineExpose({
  instance: formRef,
});
</script>

<template>
  <el-form :model="form" v-bind="attrs" ref="formRef">
    <el-form-item v-for="item in items" v-bind="item" :key="item.prop">
      <template #label>
        <slot :label="item.label" :name="`${item.prop}Label`">
          {{ item.label }}
        </slot>
      </template>
      <slot :form :name="item.prop">
        <component
          :is="item.component || 'el-input'"
          v-model="form[item.prop as string]"
          v-bind="item.componentProps"
          :disabled="getDisabled(item)"
        />
      </slot>
    </el-form-item>
    <slot :form></slot>
  </el-form>
</template>
