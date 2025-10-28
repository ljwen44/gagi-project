<script lang="ts" setup>
import Atable from '#/components/common/table/index.vue';

import { searchStatisticsColumns } from '../config';
</script>

<template>
  <Atable
    :columns="searchStatisticsColumns"
    :data="[]"
    :show-pagination="false"
  />
</template>
