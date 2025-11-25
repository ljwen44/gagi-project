<script lang="ts" setup>
import { ref } from 'vue';

import { useDrawerForm } from '@vben/hooks';
import { Bell, RefreshCcw, SquarePen } from '@vben/icons';

import { getWorkOrderById } from '#/api/core/workOrder';
import DrawerLayout from '#/components/drawer-layout/layout.vue';

import AuditProgress from '../../common/AuditProgress.vue';
import OrderArea from '../../common/OrderArea.vue';
import {
  componentsMap,
  drawerFormItems,
  WorkOrderEnum,
  workOrderTabs,
} from './config';

interface IProps {
  id?: number;
  show: boolean;
}

const props = defineProps<IProps>();

const emits = defineEmits(['closed']);

const activeTab = ref<WorkOrderEnum>(WorkOrderEnum.detail);

const handleClosed = () => {
  emits('closed');
};

const { form } = useDrawerForm(props, getWorkOrderById);

const handleTabChange = (activeName: WorkOrderEnum) => {
  activeTab.value = activeName;
};
</script>

<template>
  <DrawerLayout
    :form
    :form-items="drawerFormItems"
    :show
    grid-cols="3"
    title="查看工单详情"
    @closed="handleClosed"
  >
    <template #pre-content>
      <div class="flex flex-col gap-2">
        <!-- <el-alert title="xxx 通过了" type="success" /> -->

        <div class="flex items-center gap-2">
          <el-tooltip content="编辑" placement="top">
            <div class="cursor-pointer rounded-md bg-blue-200 p-2">
              <SquarePen class="size-3 text-blue-600" />
            </div>
          </el-tooltip>
          <el-tooltip content="刷新" placement="top">
            <div class="cursor-pointer rounded-md bg-gray-200 p-2">
              <RefreshCcw class="size-3 text-gray-600" />
            </div>
          </el-tooltip>
          <el-tooltip content="提醒" placement="top">
            <div class="cursor-pointer rounded-md bg-lime-200 p-2">
              <Bell class="size-3 text-lime-600" />
            </div>
          </el-tooltip>
        </div>
      </div>
    </template>

    <template #finalStatusLabel>
      <span class="font-bold text-[var(--el-color-primary)]">最终状态</span>
    </template>

    <AuditProgress :instance-id="form.instanceId" business-type="work_order" />
    <OrderArea />
    <div class="flex flex-col gap-2 py-4">
      <el-tabs v-model="activeTab" @tab-change="handleTabChange">
        <el-tab-pane
          v-for="item in workOrderTabs"
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
  </DrawerLayout>
</template>
