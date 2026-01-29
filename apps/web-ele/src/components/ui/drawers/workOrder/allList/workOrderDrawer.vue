<script lang="ts" setup>
import type { Workflow } from '../../common/useWorkflow';

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
import EditWorkOrder from '../../common/EditWorkOrder.vue';
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

const { form, updateForm } = useDrawerForm(props, getWorkOrderById);

const activeTab = ref<WorkOrderEnum>(WorkOrderEnum.detail);

const workflow = ref<null | Workflow>(null);

const handleClosed = () => {
  activeTab.value = WorkOrderEnum.detail;
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
    <template #pre-content>
      <EditWorkOrder
        v-if="form.status !== '审核通过'"
        :id
        :form
        @confirm="updateForm"
      />
    </template>

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
            :form
            :workflow
          />
          <template #fallback>
            <div class="p-4 text-center">loading...</div>
          </template>
        </Suspense>
      </KeepAlive>
    </div>
  </DrawerLayout>
</template>
