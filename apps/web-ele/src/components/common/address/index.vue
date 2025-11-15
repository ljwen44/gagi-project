<script lang="ts" setup>
import data from './data.json';

const addrProps = {
  label: 'label',
  value: 'label',
};
const value = defineModel();
</script>

<template>
  <el-cascader
    v-model="value"
    :options="data"
    :props="addrProps"
    v-bind="$attrs"
    clearable
    filterable
  />
</template>
