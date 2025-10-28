<script lang="ts" setup>
import Atable from '#/components/common/table/index.vue';

import { workOrderColumns } from '../config';
</script>

<template>
  <Atable :columns="workOrderColumns" :data="[]" :show-pagination="false" />
</template>
