<script setup lang="ts">
import type { DialogProps } from 'element-plus';

interface IProps extends Partial<DialogProps> {
  title: string;
  width: string;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: false,
  title: '',
  width: '50%',
});

const emit = defineEmits(['close', 'confirm']);
const show = defineModel();

const handleClose = () => {
  show.value = false;
  emit('close');
};

const handleConfirm = () => {
  emit('confirm');
};
</script>

<template>
  <el-dialog
    v-bind="props"
    v-model="show"
    :before-close="handleClose"
    :title
    :width
    modal
  >
    <!-- 标题插槽 -->
    <template #header="{ close, titleId, titleClass }">
      <slot
        :close="close"
        :title-class="titleClass"
        :title-id="titleId"
        name="header"
      >
        {{ title }}
      </slot>
    </template>

    <!-- 默认内容插槽 -->
    <slot>
      <p>默认内容</p>
    </slot>

    <!-- 底部插槽 -->
    <template #footer>
      <slot name="footer">
        <div class="flex items-center justify-end gap-2">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>
