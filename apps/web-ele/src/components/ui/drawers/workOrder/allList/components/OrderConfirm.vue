<script lang="ts" setup>
import Atable from '#/components/common/table/index.vue';

import { orderConfirmColumns } from '../config';
</script>

<template>
  <Atable :columns="orderConfirmColumns" :data="[]" :show-pagination="false" />
</template>
