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
    <Atable :columns="invoiceColumns" :data="[]" :show-pagination="false">
      <template #number="{ row }">
        <el-link type="primary">
          {{ row.number }}
        </el-link>
      </template>

      <template #type="{ row }">
        <el-tag type="info">{{ row.type }}</el-tag>
      </template>
      <template #status="{ row }">
        <el-tag type="info">{{ row.status }}</el-tag>
      </template>
      <template #headType="{ row }">
        <el-tag type="primary">{{ row.headType }}</el-tag>
      </template>
    </Atable>
  </div>
</template>
