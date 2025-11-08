<script lang="ts" setup>
import Atable from '#/components/common/table/index.vue';

import { protocolDetailColumns } from '../config';
</script>

<template>
  <Atable :columns="protocolDetailColumns" :data="[]" :show-pagination="false">
    <template #price="{ row }">
      <span class="text-red-600">{{ row.price }}</span>
    </template>
    <template #attach>
      <div>todo</div>
    </template>
  </Atable>
</template>
