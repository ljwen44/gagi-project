<script lang="ts" setup>
import type { DrawerProps } from 'element-plus';

import type { IFormItem } from '../common/form/index.vue';

import { computed, useAttrs, watch } from 'vue';

import { ArrowLeft, ArrowRight } from '@vben/icons';

import ATable, {
  type ITableColumnProps,
} from '#/components/common/table/index.vue';

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

const appendColumns: ITableColumnProps[] = [
  { label: '产品名称', prop: 'productName' },
  { label: '服务项', prop: 'itemName' },
  { label: '成本', prop: 'itemCost' },
  { label: '价格', prop: 'itemPrice' },
  { label: '价格合计', prop: 'itemPriceSum' },
];

const showModal = defineModel({
  default: false,
  type: Boolean,
});

const attrs = useAttrs();

const serviceItems = computed(() => {
  const result: any = [];
  if (props.form.serviceItemV2Vos?.length > 0) {
    for (const item of props.form.serviceItemV2Vos) {
      let flag = true;
      for (const i of item.serviceItems) {
        result.push({
          productName: item.productName,
          itemPriceSum: item.itemPriceSum,
          ...i,
          row: flag ? item.serviceItems.length : 0,
        });
        if (flag) {
          flag = false;
        }
      }
    }
    return result;
  }
  return result;
});

const spanColumns = ({ row, columnIndex }: any) => {
  // 只对产品名称列（第0列）和价格合计列（最后一列）进行合并
  if (columnIndex === 0 || columnIndex === 4) {
    return row.row > 0
      ? {
          rowspan: row.row,
          colspan: 1,
        }
      : {
          rowspan: 0,
          colspan: 0,
        };
  }
  // 其他列保持正常显示
  return {
    rowspan: 1,
    colspan: 1,
  };
};

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
    destroy-on-close
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
          :style="`grid-template-columns: repeat(${gridCols}, 1fr)`"
          class="grid border-b pb-2"
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
                <span
                  class="text-foreground/80 inline-block min-w-[80px] whitespace-nowrap"
                >
                  {{ item.label }}:
                </span>
              </slot>
            </template>
            <slot
              :data="form[item.prop!]"
              :name="item.prop"
              :origin-data="form"
            >
              <el-text type="primary">
                {{
                  item.format ? item.format(form[item.prop!]) : form[item.prop!]
                }}
              </el-text>
            </slot>
          </el-form-item>
        </el-form>
        <template v-if="form.serviceItemV2Vos?.length > 0">
          <ATable
            :columns="appendColumns"
            :data="serviceItems"
            :table-config="{
              'span-method': spanColumns,
              data: serviceItems,
              size: 'small',
              stripe: false,
            }"
          />
        </template>
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
