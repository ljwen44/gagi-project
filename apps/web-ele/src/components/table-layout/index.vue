<script lang="ts" setup>
import type { FormItemType, TabbarProps } from '@vben/types';

import { computed, onMounted, ref, useAttrs } from 'vue';

import { Plus, Search } from '@vben/icons';
import { Input, VbenHelpTooltip, VbenSelect } from '@vben-core/shadcn-ui';

import ATable, { type ITableColumnProps } from '../common/table/index.vue';
import { type IProps, symbolOptions, useTableSheet } from './useTableSheet';

type TableLayoutProps = {
  columns: ITableColumnProps[];
  formItems: FormItemType[];
  tabbar?: TabbarProps[];
} & IProps;

const props = withDefaults(defineProps<TableLayoutProps>(), {
  firstLoad: true,
  tabbar: () => [],
});

const emits = defineEmits(['tabClick']);

const {
  form,
  formRef,
  tableData,
  paginationModel,
  Modal,
  ModalApi,
  filters,
  filterKeys,
  query,
  reset,
  setForm,
  getForm,
  appendFilter,
  removeFilter,
} = useTableSheet(props);

const activeTab = ref('');

const handleTabClick = () => {
  emits('tabClick', activeTab.value);
};

const attrs = useAttrs();

const tableEeventMap: Record<string, string> = {
  onExpandChange: 'expand-change',
  onScroll: 'scroll',
  onSelect: 'select',
  onSelectAll: 'select-all',
  onSelectionChange: 'selection-change',
  onSortChange: 'sort-change',
};
const tableEvent = computed(() =>
  Object.fromEntries(
    Object.keys(tableEeventMap).map((key) => [tableEeventMap[key], attrs[key]]),
  ),
);
const paginationEvent: any = {
  change: query,
};
onMounted(() => {
  if (props.tabbar && props.tabbar.length > 0) {
    activeTab.value = props.tabbar[0]?.key!;
  }
});

defineExpose({
  query,
  reset,
  setForm,
  getForm,
});
</script>

<template>
  <div
    class="card-box flex max-h-full min-h-full flex-col gap-2 overflow-hidden px-4 pt-2"
  >
    <slot name="tabbar">
      <el-tabs
        v-if="props.tabbar"
        v-model="activeTab"
        @tab-click="handleTabClick"
      >
        <el-tab-pane v-for="tab in tabbar" :key="tab.key" :name="tab.key">
          <template #label>
            <el-badge :max="99" :offset="[5, 0]" :value="tab.badge">
              {{ tab.label }}
            </el-badge>
            <VbenHelpTooltip
              v-if="tab.tooltip"
              trigger-class="size-4 text-[#f00] ml-1"
            >
              <div class="whitespace-pre-wrap">{{ tab.tooltip }}</div>
            </VbenHelpTooltip>
          </template>
        </el-tab-pane>
      </el-tabs>
    </slot>
    <div class="flex flex-col gap-2">
      <!-- 搜索区域 + 操作区域 -->
      <div class="flex flex-wrap items-center justify-between gap-2">
        <el-form
          ref="formRef"
          :form
          class="flex flex-wrap items-center gap-2"
          inline
          label-position="left"
          label-width="auto"
        >
          <el-form-item
            v-for="item in formItems"
            :key="item.key"
            :label-width="item.width"
            :prop="item.key"
            class="!mr-3 flex items-center"
          >
            <template #label>
              <div class="flex items-center gap-1">
                <span class="whitespace-nowrap">{{ item.label }}</span>
                <VbenHelpTooltip
                  v-if="item.tooltip"
                  trigger-class="size-4 text-[#f00]"
                >
                  <div class="whitespace-pre-wrap">{{ item.tooltip }}</div>
                </VbenHelpTooltip>
              </div>
            </template>
            <component
              :is="item.component || Input"
              v-bind="item.props"
              v-model="form[item.key]"
              clearable
            />
          </el-form-item>
          <template v-if="formItems.length > 0">
            <el-form-item>
              <el-button :icon="Search" type="primary" @click="query">
                查询
              </el-button>
              <el-button @click="reset">重置</el-button>
              <el-button
                v-if="!hiddenFilter"
                :icon="Plus"
                link
                type="primary"
                @click="ModalApi.open()"
              >
                高级筛选
              </el-button>
            </el-form-item>
          </template>
        </el-form>
        <div class="flex items-center gap-2">
          <slot :form :query name="action"></slot>
        </div>
      </div>
      <!-- 高级筛选展示区域 -->
      <div class="flex flex-wrap gap-2">
        <el-tag
          v-for="(tag, index) in filters"
          :key="tag.key"
          closable
          type="primary"
          @close="removeFilter(index)"
        >
          {{ tag.label }}
        </el-tag>
      </div>
    </div>
    <div class="flex min-h-0 w-full flex-1 overflow-hidden">
      <slot name="tableBar"></slot>
      <ATable
        v-model:pagination="paginationModel"
        :columns
        :data="tableData"
        :pagination-event="paginationEvent"
        :table-event="tableEvent"
      >
        <!-- 透传所有插槽到ATable组件 -->
        <template v-for="(_, name) in $slots" #[name]="slotData">
          <slot :name="name" v-bind="slotData"></slot>
        </template>
      </ATable>
    </div>

    <Modal>
      <el-form :model="form">
        <el-form-item v-for="item in form.filters" :key="item.key">
          <div class="mb-4 grid w-full grid-cols-3 gap-2">
            <VbenSelect
              v-model="item.key"
              :options="filterKeys"
              placeholder="请选择"
            />
            <VbenSelect
              v-model="item.symbol"
              :options="symbolOptions"
              placeholder="请选择"
            />
            <el-input v-model="item.value" placeholder="请输入" />
          </div>
        </el-form-item>
        <el-button class="w-full" @click="appendFilter">
          <Plus class="size-5" />
        </el-button>
      </el-form>
    </Modal>

    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.el-tabs {
  :deep(.el-tabs__header) {
    margin-bottom: 0;
  }
}

.el-form-item {
  margin-bottom: 0;
}
</style>
