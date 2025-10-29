<script lang="ts" setup>
import { ref } from 'vue';

import { Bell } from '@vben/icons';

import DrawerLayout from '#/components/drawer-layout/layout.vue';

import OrderArea from '../../common/OrderArea.vue';
import AbnormalDetail from './components/AbnormalDetail.vue';
import {
  AbnormalWorkOrderEnum,
  abnormalWorkOrderTabs,
  drawerFormItems,
} from './config';

interface IProps {
  show: boolean;
}

defineProps<IProps>();

const emits = defineEmits(['closed']);

const activeTab = ref<AbnormalWorkOrderEnum>(AbnormalWorkOrderEnum.detail);

const handleClosed = () => {
  emits('closed');
};
</script>

<template>
  <DrawerLayout
    :form="{}"
    :form-items="drawerFormItems"
    :show
    grid-cols="2"
    title="查看异常单详情"
    @closed="handleClosed"
  >
    <template #pre-content>
      <div class="flex flex-col gap-2 pt-4">
        <el-alert title="xxx 通过了" type="success" />

        <div class="flex items-center gap-2">
          <div class="cursor-pointer rounded-md bg-lime-200 p-2">
            <Bell class="size-3 text-lime-600" />
          </div>
        </div>
      </div>
    </template>
    <OrderArea />
    <div class="flex flex-col gap-2 py-4">
      <el-tabs v-model="activeTab">
        <el-tab-pane
          v-for="item in abnormalWorkOrderTabs"
          :key="item.key"
          :label="item.label"
          :name="item.key"
        />
      </el-tabs>
      <AbnormalDetail />
      <!-- <KeepAlive>
        <Suspense>
          <component
            :is="componentsMap[activeTab]?.component"
            v-bind="componentsMap[activeTab]?.props || {}"
          />
          <template #fallback>
            <div class="p-4 text-center">loading...</div>
          </template>
        </Suspense>
      </KeepAlive> -->
    </div>
  </DrawerLayout>
</template>
