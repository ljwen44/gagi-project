<script lang="ts" setup>
import { Paperclip, SquarePen, Trash2 } from '@vben/icons';

import Atable from '#/components/common/table/index.vue';
import DrawerLayout from '#/components/drawer-layout/layout.vue';

import { paymentDetailColumns, paymentFormItems } from './config';

interface IProps {
  show: boolean;
}

defineProps<IProps>();

const emits = defineEmits(['closed']);

const handleClosed = () => {
  emits('closed');
};

const form: Record<string, any> = {};
for (const item of paymentFormItems) {
  if (!item.prop) {
    continue;
  }
  form[item.prop] = 'mock data';
}
</script>

<template>
  <DrawerLayout
    :form
    :form-items="paymentFormItems"
    :show
    title="查看报销申请详情"
    @closed="handleClosed"
  >
    <template #pre-content>
      <div class="flex flex-col gap-2">
        <el-alert title="xxx 拒绝了审核，拒绝理由" type="error" />
        <div class="flex items-center gap-2">
          <el-tooltip content="修改" placement="top">
            <div class="cursor-pointer rounded-md bg-blue-200 p-2">
              <SquarePen class="size-3 text-blue-600" />
            </div>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <div class="cursor-pointer rounded-md bg-red-200 p-2">
              <Trash2 class="size-3 text-[var(--el-color-danger)]" />
            </div>
          </el-tooltip>
        </div>
      </div>
    </template>

    <template #content-footer>
      <div class="flex flex-col gap-2 py-4">
        <div class="flex items-center gap-2">
          <div class="rounded-md bg-sky-700 p-2">
            <Paperclip class="size-4 text-white" />
          </div>
          <span>付款单附件</span>
        </div>
        <Atable
          :columns="paymentDetailColumns"
          :data="[]"
          :show-pagination="false"
        />
      </div>
    </template>
  </DrawerLayout>
</template>
