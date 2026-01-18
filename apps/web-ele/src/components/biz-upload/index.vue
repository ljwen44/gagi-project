<script lang="ts" setup>
import { Upload } from '@vben/icons';

import {
  ElMessage,
  type UploadProps,
  type UploadRequestOptions,
} from 'element-plus';

import { postImageUpload } from '#/api/core/global';

interface IProps extends Partial<UploadProps> {
  hiddenTip?: boolean;
  hasCustomClass?: boolean;
  limitSize?: number;
  tip?: string;
  showFileList?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  hasCustomClass: true,
  limitSize: 0,
  tip: '',
  showFileList: undefined,
});

const emits = defineEmits(['uploadSuccess']);

const uploadFiles = defineModel<Array<any>>({ required: true });

const handleUpload = async (options: UploadRequestOptions) => {
  try {
    const file = new File([options.file], options.file.name, {
      type: options.file.type,
    });
    const formData = new FormData();
    formData.append('file', file);
    const data = await postImageUpload(formData);
    uploadFiles.value[uploadFiles.value.length - 1] = {
      ...uploadFiles.value.at(-1),
      name: '文件',
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
    :drag
    :http-request="handleUpload"
    :show-file-list="showFileList ?? true"
    accept="image/*"
    auto-upload
    list-type="picture-card"
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
