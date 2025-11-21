<script lang="ts" setup>
import type { FormItemType, TabbarProps } from '@vben/types';

import { computed, onMounted, ref, useAttrs } from 'vue';

import { Plus, Search } from '@vben/icons';
import { useUserStore } from '@vben/stores';
import { Input, VbenHelpTooltip } from '@vben-core/shadcn-ui';

import ATable, { type ITableColumnProps } from '../common/table/index.vue';
import { type IProps, useTableSheet } from './useTableSheet';

type TableLayoutProps = {
  columns: ITableColumnProps[];
  expand?: boolean;
  formItems: FormItemType[];
  tabbar?: TabbarProps[];
} & IProps;

const props = withDefaults(defineProps<TableLayoutProps>(), {
  firstLoad: true,
  tabbar: () => [],
  showPagination: true,
});

const emits = defineEmits(['tabChange']);

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
  // appendFilter,
  removeFilter,
} = useTableSheet(props);

const attrs = useAttrs();
const activeTab = ref<number | string>('');
const { hasRole } = useUserStore();
const tableEeventMap: Record<string, string> = {
  onExpandChange: 'expand-change',
  onScroll: 'scroll',
  onSelect: 'select',
  onSelectAll: 'select-all',
  onSelectionChange: 'selection-change',
  onSortChange: 'sort-change',
};
const paginationEvent: any = {
  change: query,
};
const tableEvent = computed(() =>
  Object.fromEntries(
    Object.keys(tableEeventMap).map((key) => [tableEeventMap[key], attrs[key]]),
  ),
);
const filterTabbar = computed(() =>
  props.tabbar?.filter((tab) => {
    if (tab.permissionCode) {
      return hasRole(tab.permissionCode);
    }
    return true;
  }),
);

const handleTabChange = (value: string) => {
  emits('tabChange', value);
};

onMounted(() => {
  if (filterTabbar.value && filterTabbar.value.length > 0) {
    activeTab.value = filterTabbar.value[0]?.key!;
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
    class="card-box flex max-h-full min-h-full flex-col gap-2 overflow-hidden px-4 py-2"
  >
    <slot name="tabbar">
      <el-tabs
        v-if="props.tabbar"
        v-model="activeTab"
        @tab-change="handleTabChange"
      >
        <el-tab-pane v-for="tab in filterTabbar" :key="tab.key" :name="tab.key">
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
            class="!mb-0 !mr-3 flex items-center"
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
            <el-form-item class="!mb-0">
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
                更多筛选
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
        :expand
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
      <el-form :model="form" label-width="120px">
        <template v-for="item in filterKeys" :key="item.value">
          <el-form-item :label="item.label" :prop="item.value" class="mb-4">
            <component
              :is="item.component || 'el-input'"
              :placeholder="item.componentProps?.placeholder || '请输入'"
              v-bind="item.componentProps"
              v-model="form[item.value]"
            />
          </el-form-item>
        </template>
        <!-- <el-form-item v-for="item in form.filters" :key="item.key">
          <div class="mb-4 flex w-full items-center gap-2">
            <VbenSelect
              v-model="item.key"
              :options="filterKeys"
              class="w-[200px]"
              placeholder="请选择"
            />
            <VbenSelect
              v-model="item.symbol"
              :options="symbolOptions"
              placeholder="请选择"
            />
            <el-input
              v-model="item.value"
              class="flex-1"
              placeholder="请输入"
            />
          </div>
        </el-form-item>
        <el-button class="w-full" @click="appendFilter">
          <Plus class="size-5" />
        </el-button> -->
      </el-form>
    </Modal>

    <slot :table-data></slot>
  </div>
</template>

<style lang="scss" scoped>
.el-tabs {
  :deep(.el-tabs__header) {
    margin-bottom: 0;
  }
}
</style>
