<script lang="ts" setup>
import EmptyPng from '#/assets/images/empty.png';
</script>

<template>
  <el-empty :image="EmptyPng" class="empty-class" description="暂无数据" />
</template>

<style lang="scss" scoped>
.empty-class {
  :deep(.el-empty__description) {
    margin-top: 0;
  }
}
</style>
