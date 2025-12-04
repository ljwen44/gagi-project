<script lang="ts" setup>
import { ref } from 'vue';

import {
  AuditStatusMap,
  ReceiveStatusMap,
  TagTypeMap,
  WorkStatusMap,
} from '@vben/constants';
import { useDrawerForm } from '@vben/hooks';

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

const { form } = useDrawerForm(props, getWorkOrderById);

const activeTab = ref<WorkOrderEnum>(WorkOrderEnum.detail);

const workflow = ref<any>(null);

const handleClosed = () => {
  emits('closed');
};

const handleTabChange = (activeName: WorkOrderEnum) => {
  activeTab.value = activeName;
};

const handleWorkflowChange = (value: any) => {
  workflow.value = value;
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
    <!-- <template #pre-content>
      <div class="flex flex-col gap-2">
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
    </template> -->

    <template #auditStatus="{ data }">
      <el-tag :type="TagTypeMap[data]" effect="dark">
        {{ AuditStatusMap[data] }}
      </el-tag>
    </template>

    <template #receiveStatus="{ data }">
      <el-tag :type="TagTypeMap[data]" effect="dark">
        {{ ReceiveStatusMap[data] }}
      </el-tag>
    </template>

    <template #workStatus="{ data }">
      <el-tag :type="TagTypeMap[data]" effect="dark">
        {{ WorkStatusMap[data] }}
      </el-tag>
    </template>

    <!-- <template #finalStatusLabel>
      <span class="font-bold text-[var(--el-color-primary)]">最终状态</span>
    </template> -->

    <AuditProgress
      :instance-id="form.instanceId"
      business-type="work_order"
      @update:workflow="handleWorkflowChange"
    />
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
            :id
          />
          <template #fallback>
            <div class="p-4 text-center">loading...</div>
          </template>
        </Suspense>
      </KeepAlive>
    </div>
  </DrawerLayout>
</template>
