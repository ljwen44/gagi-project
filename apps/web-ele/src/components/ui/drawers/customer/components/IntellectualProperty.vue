<script lang="ts" setup>
import Atable from '#/components/common/table/index.vue';

import { intellectualPropertyColumns } from '../config';
</script>

<template>
  <Atable
    :columns="intellectualPropertyColumns"
    :data="[]"
    :show-pagination="false"
  />
</template>
