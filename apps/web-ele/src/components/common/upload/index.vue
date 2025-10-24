<script lang="ts" setup>
import { useAttrs } from 'vue';

import { Upload } from '@vben/icons';

const uploadFiles = defineModel();

const attrs = useAttrs();
</script>

<template>
  <el-upload
    v-bind="attrs"
    v-model:file-list="uploadFiles"
    class="custom-upload"
  >
    <slot>
      <div class="flex items-center justify-center gap-2">
        <Upload class="size-4" />
        <span>上传文件</span>
      </div>
    </slot>
    <template #tip>
      <p>{{ attrs.tip || '单个文件限制大小1M' }}</p>
    </template>
  </el-upload>
</template>

<style scoped lang="scss">
.custom-upload {
  :deep(.el-upload-dragger) {
    padding: 8px;
  }
}
</style>
