<script lang="ts" setup>
import { useDrawerForm } from '@vben/hooks';

import { getInfoById, type Type } from '#/api/core/administration';
import DrawerLayout from '#/components/drawer-layout/layout.vue';

import AuditProgress from '../common/AuditProgress.vue';
import { paymentFormItems } from './config';

interface IProps {
  show: boolean;
  id?: number;
  type: Type;
}

const props = defineProps<IProps>();

const emits = defineEmits(['closed']);

const handleClosed = () => {
  emits('closed');
};

const { form } = useDrawerForm(props, () => getInfoById(props.type, props.id));
</script>

<template>
  <DrawerLayout
    :form
    :form-items="paymentFormItems"
    :show
    title="查看报销申请详情"
    @closed="handleClosed"
  >
    <!-- <template #pre-content>
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
    </template> -->

    <template #attachments="{ data }">
      <div class="flex flex-col">
        <a
          v-for="item in data"
          :key="item.id"
          :download="item.fileName"
          :href="item.fileUrl"
          class="text-primary"
          >{{ item.fileName }}
        </a>
      </div>
    </template>

    <AuditProgress :instance-id="form.instanceId" hidden-upload />

    <!-- <template #content-footer>
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
    </template> -->
  </DrawerLayout>
</template>
