<script lang="ts" setup>
import DrawerLayout from '#/components/drawer-layout/layout.vue';

import AuditProgress from '../common/AuditProgress.vue';
import { restFormItems } from './config';

interface IProps {
  show: boolean;
}

defineProps<IProps>();

const emits = defineEmits(['closed']);

const handleClosed = () => {
  emits('closed');
};
</script>

<template>
  <DrawerLayout
    :form="{}"
    :form-items="restFormItems"
    :show
    title="查看请假申请详情"
    @closed="handleClosed"
  >
    <template #pre-content>
      <el-alert class="!mt-4" title="xxx 通过了审核" type="success" />
    </template>

    <AuditProgress />
  </DrawerLayout>
</template>
