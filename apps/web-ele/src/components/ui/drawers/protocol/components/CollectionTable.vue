<script lang="ts" setup>
import Atable from '#/components/common/table/index.vue';

import { collectionRecordColumns } from '../config';
</script>

<template>
  <Atable
    :columns="collectionRecordColumns"
    :data="[]"
    :show-pagination="false"
  />
</template>
