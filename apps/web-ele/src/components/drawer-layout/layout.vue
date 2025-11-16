<script lang="ts" setup>
import type { DrawerProps } from 'element-plus';

import type { IFormItem } from '../common/form/index.vue';

import { useAttrs, watch } from 'vue';

import { ArrowLeft, ArrowRight } from '@vben/icons';

// import { ArrowLeft, ArrowRight, Check, CircleX, Users } from '@vben/icons';

interface IProps extends Partial<DrawerProps> {
  confirmText?: string;
  cancelText?: string;
  show?: boolean;
  form: Record<string, any>;
  gridCols?: number | string;
  formItems: IFormItem[];
  progresses?: any;
}

const props = withDefaults(defineProps<IProps>(), {
  confirmText: '确定',
  cancelText: '取消',
  form: () => ({}),
  formItems: () => [],
  gridCols: '4',
  progresses: () => [],
});

const emits = defineEmits(['open', 'closed', 'prev', 'next']);

const showModal = defineModel({
  default: false,
  type: Boolean,
});

const attrs = useAttrs();

watch(
  () => props.show,
  (val) => {
    showModal.value = val;
  },
);

const handleOpen = () => {
  emits('open');
};
const handleClosed = () => {
  emits('closed');
};

const handlePrev = () => {
  emits('prev');
};

const handleNext = () => {
  emits('next');
};
</script>

<template>
  <el-drawer
    class="!w-[90%] min-w-[1000px]"
    v-bind="attrs"
    v-model="showModal"
    body-class="border-t border-b !px-4 !py-0"
    header-class="!mb-0 !p-4"
    @closed="handleClosed"
    @open="handleOpen"
  >
    <template #title>
      <div class="flex items-center gap-2">
        <slot name="title">
          <div>{{ title }}</div>
        </slot>

        <div class="flex items-center justify-center">
          <el-button
            :icon="ArrowLeft"
            size="small"
            type="primary"
            @click="handlePrev"
          >
            上一页
          </el-button>
          <el-button
            :icon="ArrowRight"
            class="flex-row-reverse gap-1"
            size="small"
            type="primary"
            @click="handleNext"
          >
            下一页
          </el-button>
        </div>
      </div>
    </template>
    <div class="flex flex-col gap-2 py-4">
      <!-- <div class="flex items-center justify-end gap-4 px-4 pt-4">
        <div
          class="flex cursor-pointer items-center gap-2 rounded-md border p-2"
        >
          <ArrowLeft class="size-3" />
        </div>
        <div
          class="flex cursor-pointer items-center gap-2 rounded-md border p-2"
        >
          <ArrowRight class="size-3" />
        </div>
      </div> -->
      <slot name="pre-content"></slot>
      <slot name="content-header">
        <el-form
          :class="`grid grid-cols-${gridCols} border-b pb-2`"
          label-position="right"
          label-width="80px"
        >
          <el-form-item
            v-for="item in formItems"
            :key="item.prop"
            class="!mb-0 flex flex-wrap gap-2 text-sm"
            v-bind="item"
          >
            <template #label>
              <slot :name="`${item.prop}Label`">
                <span class="text-foreground/80 inline-block min-w-[80px]">
                  {{ item.label }}:
                </span>
              </slot>
            </template>
            <slot :data="form[item.prop!]" :name="item.prop">
              <el-text type="primary">
                {{
                  item.format ? item.format(form[item.prop!]) : form[item.prop!]
                }}
              </el-text>
            </slot>
          </el-form-item>
        </el-form>
      </slot>
      <slot></slot>
      <slot name="content-footer"></slot>
    </div>
    <template #footer>
      <slot name="footer">
        <div class="flex items-center justify-end gap-2">
          <el-button @click="showModal = false">{{ cancelText }}</el-button>
          <slot name="center-footer"></slot>
          <el-button type="primary" @click="showModal = false">
            {{ confirmText }}
          </el-button>
        </div>
      </slot>
    </template>
  </el-drawer>
</template>
