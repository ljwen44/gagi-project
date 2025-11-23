<script lang="ts" setup>
import { Upload } from '@vben/icons';

import { ElMessage, type UploadProps, type UploadRawFile } from 'element-plus';

interface IProps extends Partial<UploadProps> {
  hiddenTip?: boolean;
  hasCustomClass?: boolean;
  limitSize?: number;
  tip?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  hasCustomClass: true,
  limitSize: 0,
  tip: '',
});

const uploadFiles = defineModel();

const beforeUpload = (file: UploadRawFile) => {
  if (props.limitSize !== 0 && file.size > props.limitSize) {
    ElMessage.error('文件超出大小');
    return false;
  }

  return true;
};
// const handleUpload = (options: UploadRequestOptions) => {};
</script>

<template>
  <el-upload
    action="#"
    v-bind="$props"
    v-model:file-list="uploadFiles"
    :before-upload
    :class="[hasCustomClass ? 'custom-upload' : '']"
    :drag
  >
    <!-- :http-request="handleUpload" -->
    <slot>
      <div class="flex items-center justify-center gap-2">
        <Upload class="size-4" />
        <span>上传文件</span>
      </div>
    </slot>
    <template #tip>
      <p v-if="!hiddenTip">{{ tip || '单个文件限制大小1M' }}</p>
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
