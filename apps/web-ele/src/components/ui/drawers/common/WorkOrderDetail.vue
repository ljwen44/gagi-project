<script lang="ts" setup>
import { computed } from 'vue';

interface IProps {
  form: Record<string, any>;
}

const props = defineProps<IProps>();

const detail = computed<Record<string, any>[]>(() =>
  (props.form?.fieldConfigs || []).map((item: any) => {
    let value = props.form.dynamicFieldValues[item.fieldKey];
    if (item.fieldType === 'select') {
      const options = JSON.parse(item.options);
      value = options.find((option: any) => option.value === value)?.label;
    }
    return {
      ...item,
      value,
    };
  }),
);
</script>

<template>
  <div v-if="detail.length > 0" class="grid grid-cols-2 gap-4">
    <div
      v-for="item in detail"
      :key="item.fieldKey"
      class="flex items-start gap-2"
    >
      <span>{{ item.fieldName }}:</span>
      <template v-if="item.fieldKey !== 'ip_image'">
        <span>{{ item.value || '-' }}</span>
      </template>
      <template v-else>
        <div class="flex flex-col gap-2">
          <a
            v-for="i in item.value.split(';')"
            :key="i"
            :href="i.split(',')[1]"
            class="text-primary-600 underline"
            download
            >文件下载
          </a>
        </div>
      </template>
    </div>
  </div>
  <div v-else>
    <span>暂无数据</span>
  </div>
</template>
