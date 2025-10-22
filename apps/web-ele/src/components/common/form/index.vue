<script lang="ts" setup>
import type { FormItemProps } from 'element-plus';

import { useAttrs, useTemplateRef } from 'vue';

import { Input } from '@vben-core/shadcn-ui';

export interface IFormItem extends Partial<FormItemProps> {
  component?: any;
  componentProps?: Record<string, any>;
  class?: string;
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

defineExpose({
  instance: formRef,
});
</script>

<template>
  <el-form :model="form" v-bind="attrs" ref="formRef">
    <el-form-item v-for="item in items" v-bind="item" :key="item.prop">
      <template #label>
        <slot :name="`${item.prop}Label`">{{ item.label }}</slot>
      </template>
      <slot :form :name="item.prop">
        <component
          :is="item.component || Input"
          v-model="form[item.prop as string]"
          v-bind="item.componentProps"
        />
      </slot>
    </el-form-item>
  </el-form>
</template>
