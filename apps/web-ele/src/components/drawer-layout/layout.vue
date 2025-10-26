<script lang="ts" setup>
import type { DrawerProps } from 'element-plus';

import { useAttrs, watch } from 'vue';

interface IProps extends Partial<DrawerProps> {
  confirmText?: string;
  cancelText?: string;
  show?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  confirmText: '确定',
  cancelText: '取消',
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
    class="common-drawer !w-[90%] min-w-[1000px]"
    v-bind="attrs"
    v-model="showModal"
    body-class="border-t border-b"
    @closed="handleClosed"
    @open="handleOpen"
  >
    <template #title>
      <div class="flex items-center justify-between">
        <slot name="title">{{ title }}</slot>
      </div>
    </template>
    <slot></slot>
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
