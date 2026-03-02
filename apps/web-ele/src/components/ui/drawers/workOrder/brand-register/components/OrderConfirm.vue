<script lang="ts" setup>
import Atable from '#/components/common/table/index.vue';

import { orderConfirmColumns } from '../config';

defineProps({
  form: { type: Object, default: () => ({}) },
});
</script>

<template>
  <Atable
    :columns="orderConfirmColumns"
    :data="form.confirmAttachments || []"
    :show-pagination="false"
  >
    <template #fileUrl="{ row }">
      <a
        :download="row.fileName"
        :href="row.fileUrl"
        class="text-[var(--el-color-primary)]"
        >文件下载
      </a>
    </template>
  </Atable>
</template>
