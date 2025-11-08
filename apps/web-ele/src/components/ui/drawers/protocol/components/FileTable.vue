<script lang="ts" setup>
import { ArrowDownToLine, Eye } from '@vben/icons';

import Atable from '#/components/common/table/index.vue';

import { fileColumns } from '../config';
</script>

<template>
  <Atable :columns="fileColumns" :data="[]" :show-pagination="false">
    <template #name="{ row }">
      <el-link type="primary">{{ row.name }}</el-link>
    </template>
    <template #stage="{ row }">
      <el-tag type="info">{{ row.stage }}</el-tag>
    </template>
    <template #operator>
      <div class="flex items-center justify-center gap-2">
        <Eye class="size-4 cursor-pointer" />
        <ArrowDownToLine class="size-4 cursor-pointer" />
      </div>
    </template>
  </Atable>
</template>
