<script lang="ts" setup>
import type { UploadProps } from 'element-plus';

import { useAttrs } from 'vue';

import { Upload } from '@vben/icons';

interface IProps extends Partial<UploadProps> {
  hiddenTip?: boolean;
  hasCustomClass?: boolean;
}

withDefaults(defineProps<IProps>(), {
  hasCustomClass: true,
});

const uploadFiles = defineModel();

const attrs = useAttrs();
</script>

<template>
  <el-upload
    v-bind="attrs"
    v-model:file-list="uploadFiles"
    :class="[hasCustomClass ? 'custom-upload' : '']"
  >
    <slot>
      <div class="flex items-center justify-center gap-2">
        <Upload class="size-4" />
        <span>上传文件</span>
      </div>
    </slot>
    <template #tip>
      <p v-if="!hiddenTip">{{ attrs.tip || '单个文件限制大小1M' }}</p>
    </template>
  </el-upload>
</template>

<style scoped lang="scss">
.custom-upload {
  display: flex;
  flex-direction: column;

  :deep(.el-upload) {
    padding: 8px;
    border: 1px dashed;
    border-radius: 8px;

    &:hover {
      color: var(--el-color-primary);
      border-color: var(--el-color-primary);
    }
  }

  :deep(.el-upload-dragger) {
    padding: 8px;
  }
}
</style>
