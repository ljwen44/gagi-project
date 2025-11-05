<!-- eslint-disable unicorn/no-array-reduce -->
<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { Database, SquarePen } from '@vben/icons';

import DrawerLayout from '#/components/drawer-layout/layout.vue';
import CustomerForm from '#/components/ui/customer/form.vue';

import {
  componentsMap,
  CustomerTabEnum,
  customerTabs,
  drawerFormItems,
} from './config';

interface IProps {
  id: string;
  show: boolean;
}

defineProps<IProps>();

const emits = defineEmits(['closed']);

const activeTab = ref<CustomerTabEnum>(CustomerTabEnum.followRecord);
const customerFormRef = useTemplateRef('customerFormRef');

const handleClosed = () => {
  emits('closed');
};

const handleTabChange = (activeName: CustomerTabEnum) => {
  activeTab.value = activeName;
};

const form = drawerFormItems.reduce(
  (prev, next) => {
    prev[next.prop] = 'mock data';
    return prev;
  },
  {} as Record<string, any>,
);
</script>

<template>
  <DrawerLayout
    :form
    :form-items="drawerFormItems"
    :show
    grid-cols="3"
    title="查看客户详情"
    @closed="handleClosed"
  >
    <template #pre-content>
      <slot name="form-action">
        <div class="flex items-center gap-2">
          <el-tooltip content="修改" placement="top">
            <div
              class="cursor-pointer rounded-md bg-blue-200 p-2"
              @click="customerFormRef?.openModal()"
            >
              <SquarePen class="size-3 text-blue-600" />
            </div>
          </el-tooltip>
          <el-tooltip content="放入公海" placement="top">
            <div class="cursor-pointer rounded-md bg-orange-200 p-2">
              <Database class="size-3 text-orange-600" />
            </div>
          </el-tooltip>
        </div>
      </slot>
    </template>
    <div class="flex flex-col gap-2 py-4">
      <el-tabs v-model="activeTab" @tab-change="handleTabChange">
        <el-tab-pane
          v-for="item in customerTabs"
          :key="item.key"
          :label="item.label"
          :name="item.key"
        />
      </el-tabs>
      <KeepAlive>
        <Suspense>
          <component
            :is="componentsMap[activeTab]?.component"
            v-bind="componentsMap[activeTab]?.props || {}"
          />
          <template #fallback>
            <div class="p-4 text-center">loading...</div>
          </template>
        </Suspense>
      </KeepAlive>
    </div>

    <CustomerForm ref="customerFormRef" title="修改客户" />
  </DrawerLayout>
</template>
