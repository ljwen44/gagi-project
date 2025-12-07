<script lang="ts" setup>
import { Upload } from '@vben/icons';

import {
  ElMessage,
  type UploadProps,
  type UploadRawFile,
  type UploadRequestOptions,
} from 'element-plus';

import { postAttachmentUpload } from '#/api/core/global';

interface IProps extends Partial<UploadProps> {
  hiddenTip?: boolean;
  hasCustomClass?: boolean;
  limitSize?: number;
  tip?: string;
  businessType?: string;
  showFileList?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  hasCustomClass: true,
  limitSize: 0,
  tip: '',
  businessType: '',
  showFileList: undefined,
});

const emits = defineEmits(['uploadSuccess']);

const uploadFiles = defineModel<Array<any>>({ required: true });

const beforeUpload = (file: UploadRawFile) => {
  if (props.limitSize !== 0 && file.size > props.limitSize) {
    ElMessage.error('文件超出大小');
    return false;
  }

  return true;
};
const handleUpload = async (options: UploadRequestOptions) => {
  try {
    if (!props.businessType) {
      return ElMessage.error('参数错误');
    }
    const file = new File([options.file], options.file.name, {
      type: options.file.type,
    });
    const formData = new FormData();
    formData.append('file', file);
    formData.append('businessType', props.businessType);
    const data = await postAttachmentUpload(formData);
    uploadFiles.value[uploadFiles.value.length - 1] = {
      ...uploadFiles.value.at(-1),
      result: data,
    };
    emits('uploadSuccess', uploadFiles.value);
  } catch {
    ElMessage.error('上传失败');
    uploadFiles.value.splice(-1, 1);
  }
};
</script>

<template>
  <el-upload
    v-bind="props"
    v-model:file-list="uploadFiles"
    :before-upload
    :class="[hasCustomClass ? 'custom-upload' : '']"
    :drag
    :http-request="handleUpload"
    :show-file-list="showFileList ?? true"
    auto-upload
    multiple
  >
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
