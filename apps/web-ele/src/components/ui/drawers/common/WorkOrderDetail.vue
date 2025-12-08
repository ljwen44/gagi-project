<script lang="ts" setup>
import { computed } from 'vue';

interface IProps {
  form: Record<string, any>;
}

const props = defineProps<IProps>();

const detail = computed<Record<string, any>[]>(() =>
  (props.form?.fieldConfigs || []).map((item: any) => ({
    ...item,
    value: props.form.dynamicFieldValues[item.fieldKey],
  })),
);
</script>

<template>
  <div v-if="detail.length > 0" class="grid grid-cols-2 gap-4">
    <div
      v-for="item in detail"
      :key="item.fieldKey"
      class="flex items-center gap-2"
    >
      <span>{{ item.fieldName }}:</span>
      <span>{{ item.value || '-' }}</span>
    </div>
  </div>
  <div v-else>
    <span>暂无数据</span>
  </div>
</template>
