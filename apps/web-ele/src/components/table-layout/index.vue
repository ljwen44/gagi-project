<script lang="ts" setup>
import type { FormItemType, TabbarProps } from '@vben/types';

import { onMounted, ref } from 'vue';

import { Plus, Search } from '@vben/icons';
import { VbenHelpTooltip } from '@vben-core/shadcn-ui';

import ATable, { type ITableColumnProps } from '../common/table/index.vue';
import { type IProps, useTableSheet } from './useTableSheet';

type TableLayoutProps = {
  columns: ITableColumnProps[];
  formItems: FormItemType[];
  tabbar?: TabbarProps[];
} & IProps;

const props = defineProps<TableLayoutProps>();

const emits = defineEmits(['tabClick']);

const {
  form,
  formRef,
  tableData,
  paginationModel,
  query,
  reset,
  setForm,
  getForm,
} = useTableSheet(props);

const showAdvancedFilterModal = ref(false);
const activeTab = ref('');

const removeTag = () => {};

const handleTabClick = () => {
  emits('tabClick', activeTab.value);
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
  <div class="card-box flex h-full flex-col gap-2 overflow-auto px-4 py-2">
    <slot name="tabbar">
      <el-tabs
        v-if="props.tabbar"
        v-model="activeTab"
        @tab-click="handleTabClick"
      >
        <el-tab-pane v-for="tab in tabbar" :key="tab.key" :name="tab.key">
          <template #label>
            <span>{{ tab.label }}</span>
            <el-tooltip v-if="tab.tooltip" effect="dark" placement="top">
              <template #content>
                <div class="whitespace-pre-wrap">{{ tab.tooltip }}</div>
              </template>
              <VbenHelpTooltip />
            </el-tooltip>
          </template>
        </el-tab-pane>
      </el-tabs>
    </slot>
    <div class="flex flex-col gap-2">
      <!-- 搜索区域 + 操作区域 -->
      <div class="flex flex-wrap items-center justify-between">
        <el-form
          ref="formRef"
          :form
          inline
          label-position="left"
          label-width="auto"
          size="small"
        >
          <el-form-item
            v-for="item in formItems"
            :key="item.key"
            :prop="item.key"
            class="!mr-3"
          >
            <template #label>
              <div class="flex items-center gap-1">
                <span>{{ item.label }}</span>
                <el-tooltip v-if="item.tooltip" effect="dark" placement="top">
                  <template #content>
                    <div class="whitespace-pre-wrap">{{ item.tooltip }}</div>
                  </template>
                  <VbenHelpTooltip trigger-class="size-4 text-[#f00]" />
                </el-tooltip>
              </div>
            </template>
            <component
              :is="item.component"
              v-bind="item.props"
              v-model="form[item.key]"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" type="primary" @click="query">
              查询
            </el-button>
            <el-button @click="reset">重置</el-button>
            <el-button
              :icon="Plus"
              link
              type="primary"
              @click="showAdvancedFilterModal = true"
            >
              高级筛选
            </el-button>
          </el-form-item>
        </el-form>
        <slot :form :query name="action"></slot>
      </div>
      <!-- 高级筛选展示区域 -->
      <div class="flex flex-wrap">
        <el-tag
          v-for="tag in 1"
          :key="tag"
          closable
          type="primary"
          @close="removeTag"
        >
          高级筛选
        </el-tag>
      </div>
    </div>
    <ATable
      :columns="props.columns"
      :data="tableData"
      :pagination="paginationModel"
      class="h-full flex-1"
    />
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
