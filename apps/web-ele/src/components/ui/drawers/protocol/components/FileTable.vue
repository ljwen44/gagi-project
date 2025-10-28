<script lang="ts" setup>
import Atable from '#/components/common/table/index.vue';

import { fileColumns } from '../config';
</script>

<template>
  <Atable :columns="fileColumns" :data="[]" :show-pagination="false" />
</template>
