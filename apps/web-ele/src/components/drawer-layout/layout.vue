<script lang="ts" setup>
import type { DrawerProps } from 'element-plus';

import type { IFormItem } from '../common/form/index.vue';

import { useAttrs, watch } from 'vue';

// import { ArrowLeft, ArrowRight, Check, CircleX, Users } from '@vben/icons';

interface IProps extends Partial<DrawerProps> {
  confirmText?: string;
  cancelText?: string;
  show?: boolean;
  form: Record<string, any>;
  gridCols?: number | string;
  formItems: IFormItem[];
  progresses?: any;
}

const props = withDefaults(defineProps<IProps>(), {
  confirmText: '确定',
  cancelText: '取消',
  form: () => ({}),
  formItems: () => [],
  gridCols: '4',
  progresses: () => [],
});

const emits = defineEmits(['open', 'closed']);

const showModal = defineModel({
  default: false,
  type: Boolean,
});

const attrs = useAttrs();

watch(
  () => props.show,
  (val) => {
    showModal.value = val;
  },
);

const handleOpen = () => {
  emits('open');
};
const handleClosed = () => {
  emits('closed');
};
</script>

<template>
  <el-drawer
    class="!w-[90%] min-w-[1000px]"
    v-bind="attrs"
    v-model="showModal"
    body-class="border-t border-b !px-4 !py-0"
    header-class="!mb-0 !p-4"
    @closed="handleClosed"
    @open="handleOpen"
  >
    <template #title>
      <slot name="title">
        <div>{{ title }}</div>
      </slot>
    </template>
    <div class="flex flex-col gap-2">
      <!-- <div class="flex items-center justify-end gap-4 px-4 pt-4">
        <div
          class="flex cursor-pointer items-center gap-2 rounded-md border p-2"
        >
          <ArrowLeft class="size-3" />
        </div>
        <div
          class="flex cursor-pointer items-center gap-2 rounded-md border p-2"
        >
          <ArrowRight class="size-3" />
        </div>
      </div> -->
      <slot name="pre-content"></slot>
      <slot name="content-header">
        <div :class="`grid gap-3 grid-cols-${gridCols} border-b py-4`">
          <div
            v-for="item in formItems"
            :key="item.prop"
            class="flex flex-wrap gap-2 text-sm"
            v-bind="item"
          >
            <slot :name="`${item.prop}Label`">
              <span class="text-foreground/80">{{ item.label }}:</span>
            </slot>
            <slot :data="form[item.prop!]" :name="item.prop">
              <el-text type="primary">{{ form[item.prop!] }}</el-text>
            </slot>
          </div>
        </div>
      </slot>
      <slot></slot>
      <slot name="content-footer"></slot>
    </div>
    <template #footer>
      <slot name="footer">
        <div class="flex items-center justify-end gap-2">
          <el-button @click="showModal = false">{{ cancelText }}</el-button>
          <slot name="center-footer"></slot>
          <el-button type="primary" @click="showModal = false">
            {{ confirmText }}
          </el-button>
        </div>
      </slot>
    </template>
  </el-drawer>
</template>
