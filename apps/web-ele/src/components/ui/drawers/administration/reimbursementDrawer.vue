<script lang="ts" setup>
import { BookMarked } from '@vben/icons';

import Atable from '#/components/common/table/index.vue';
import DrawerLayout from '#/components/drawer-layout/layout.vue';

import AuditProgress from '../common/AuditProgress.vue';
import { reimbursementDetailColumns, reimbursementFormItems } from './config';

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
    :form-items="reimbursementFormItems"
    :show
    @closed="handleClosed"
  >
    <template #title>
      <div class="flex items-center gap-2">
        <span>查看报销申请详情</span>
        <el-button type="primary">打印</el-button>
      </div>
    </template>

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
          <span>报销明细</span>
        </div>
        <Atable
          :columns="reimbursementDetailColumns"
          :data="[]"
          :show-pagination="false"
        />
      </div>
    </template>
  </DrawerLayout>
</template>
