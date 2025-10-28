<script lang="ts" setup>
import Atable from '#/components/common/table/index.vue';

import { allocationRecordColumns } from '../config';
</script>

<template>
  <Atable
    :columns="allocationRecordColumns"
    :data="[]"
    :show-pagination="false"
  />
</template>
