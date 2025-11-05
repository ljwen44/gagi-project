<script lang="ts" setup>
import { Plus } from '@vben/icons';

import Atable from '#/components/common/table/index.vue';

import { invoiceColumns } from '../config';
</script>

<template>
  <div class="flex flex-col gap-2">
    <el-button :icon="Plus" style="width: 120px" type="primary">
      开局工具
    </el-button>
    <Atable :columns="invoiceColumns" :data="[]" :show-pagination="false" />
  </div>
</template>
