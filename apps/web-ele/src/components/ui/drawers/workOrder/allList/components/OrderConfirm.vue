<script lang="ts" setup>
import Atable from '#/components/common/table/index.vue';

import { orderConfirmColumns } from '../config';

defineProps({
  form: { type: Object, default: () => ({}) },
});
</script>

<template>
  <Atable
    :columns="orderConfirmColumns"
    :data="form.confirmAttachments || []"
    :show-pagination="false"
  />
</template>
