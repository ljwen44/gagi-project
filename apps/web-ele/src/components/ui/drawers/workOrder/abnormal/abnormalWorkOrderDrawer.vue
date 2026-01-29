<script lang="ts" setup>
import { ref } from 'vue';

import { useDrawerForm } from '@vben/hooks';

import { getWorkOrderById } from '#/api/core/workOrder';
import DrawerLayout from '#/components/drawer-layout/layout.vue';

import EditWorkOrder from '../../common/EditWorkOrder.vue';
import OrderArea from '../../common/OrderArea.vue';
import {
  AbnormalWorkOrderEnum,
  abnormalWorkOrderTabs,
  componentsMap,
  drawerFormItems,
} from './config';

interface IProps {
  show: boolean;
  id?: number;
}

const props = defineProps<IProps>();

const emits = defineEmits(['closed']);

const { form, updateForm } = useDrawerForm(props, getWorkOrderById);

const activeTab = ref<AbnormalWorkOrderEnum>(AbnormalWorkOrderEnum.detail);

const handleClosed = () => {
  activeTab.value = AbnormalWorkOrderEnum.detail;
  emits('closed');
};

const handleTabChange = (activeName: AbnormalWorkOrderEnum) => {
  activeTab.value = activeName;
};
</script>

<template>
  <DrawerLayout
    :form
    :form-items="drawerFormItems"
    :show
    grid-cols="2"
    title="查看异常单详情"
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

    <OrderArea />
    <div class="flex flex-col gap-2 py-4">
      <el-tabs v-model="activeTab" @tab-change="handleTabChange">
        <el-tab-pane
          v-for="item in abnormalWorkOrderTabs"
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
          />
          <template #fallback>
            <div class="p-4 text-center">loading...</div>
          </template>
        </Suspense>
      </KeepAlive>
    </div>
  </DrawerLayout>
</template>
