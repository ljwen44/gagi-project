<script lang="ts" setup>
import { Bell } from '@vben/icons';

import Atable from '#/components/common/table/index.vue';

import { workOrderColumns } from '../config';
</script>

<template>
  <Atable :columns="workOrderColumns" :data="[]" :show-pagination="false">
    <template #number="{ row }">
      <el-link type="primary">
        {{ row.number }}
      </el-link>
    </template>

    <template #status="{ row }">
      <el-tag effect="dark" type="success">{{ row.status }}</el-tag>
    </template>

    <template #acceptStatus="{ row }">
      <el-tag effect="dark" type="success">{{ row.acceptStatus }}</el-tag>
    </template>

    <template #orderStatus="{ row }">
      <el-tag effect="dark" type="success">{{ row.orderStatus }}</el-tag>
    </template>

    <template #finishConfirm="{ row }">
      <el-tag effect="dark" type="success">{{ row.finishConfirm }}</el-tag>
    </template>

    <template #operator>
      <div class="flex items-center justify-center gap-2">
        <Bell class="size-4 cursor-pointer text-green-600" />
      </div>
    </template>
  </Atable>
</template>
