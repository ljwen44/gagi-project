<script lang="ts" setup>
import { Paperclip } from '@vben/icons';

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
</script>

<template>
  <DrawerLayout
    :form="{}"
    :form-items="paymentFormItems"
    :show
    title="查看报销申请详情"
    @closed="handleClosed"
  >
    <template #pre-content>
      <div class="mt-4 flex flex-col gap-2">
        <el-alert title="xxx 拒绝了审核，拒绝理由" type="error" />
        <div>
          <el-button type="primary">修改</el-button>
          <el-button type="danger">删除</el-button>
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
