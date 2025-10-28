<script lang="ts" setup>
import { BookMarked } from '@vben/icons';

import Atable from '#/components/common/table/index.vue';
import DrawerLayout from '#/components/drawer-layout/layout.vue';

import AuditProgress from '../common/AuditProgress.vue';
import { invoiceDetailColumns, invoiceFormItems } from './config';

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
    :form-items="invoiceFormItems"
    :show
    title="查看发票申请详情"
    @closed="handleClosed"
  >
    <template #pre-content>
      <el-alert class="!mt-4" title="xxx 通过了审核" type="success" />
    </template>

    <AuditProgress />

    <template #content-footer>
      <div class="flex flex-col gap-2 py-4">
        <div class="flex items-center gap-2">
          <div class="rounded-md bg-sky-700 p-2">
            <BookMarked class="size-4 text-white" />
          </div>
          <span>发票明细</span>
        </div>
        <Atable
          :columns="invoiceDetailColumns"
          :data="[]"
          :show-pagination="false"
        />
      </div>
    </template>
  </DrawerLayout>
</template>
