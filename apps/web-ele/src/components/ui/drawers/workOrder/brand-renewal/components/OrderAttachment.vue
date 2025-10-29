<script lang="ts" setup>
import { CloudUpload } from '@vben/icons';

import Atable from '#/components/common/table/index.vue';

import { orderAttachmentColumns } from '../config';
</script>

<template>
  <div class="flex flex-col gap-2">
    <div>
      <el-button :icon="CloudUpload" type="primary">上传身份证明</el-button>
      <el-button :icon="CloudUpload" type="primary">上传其他文件</el-button>
    </div>
    <Atable
      :columns="orderAttachmentColumns"
      :data="[]"
      :show-pagination="false"
    />
  </div>
</template>
