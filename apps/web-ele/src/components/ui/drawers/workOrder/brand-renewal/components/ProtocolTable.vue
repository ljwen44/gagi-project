<script lang="ts" setup>
import Atable from '#/components/common/table/index.vue';

import { protocolDetailColumns } from '../config';
</script>

<template>
  <Atable
    :columns="protocolDetailColumns"
    :data="[]"
    :show-pagination="false"
  />
</template>
