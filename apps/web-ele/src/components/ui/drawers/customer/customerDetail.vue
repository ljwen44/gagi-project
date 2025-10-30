<script lang="ts" setup>
import { ref } from 'vue';

import { Database, SquarePen } from '@vben/icons';

import DrawerLayout from '#/components/drawer-layout/layout.vue';

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

const handleClosed = () => {
  emits('closed');
};
</script>

<template>
  <DrawerLayout
    :form="{}"
    :form-items="drawerFormItems"
    :show
    grid-cols="3"
    title="查看客户详情"
    @closed="handleClosed"
  >
    <template #pre-content>
      <div class="flex items-center gap-2 pt-4">
        <div class="cursor-pointer rounded-md bg-blue-200 p-2" title="修改">
          <SquarePen class="size-3 text-blue-600" />
        </div>
        <div
          class="cursor-pointer rounded-md bg-orange-200 p-2"
          title="放入公海"
        >
          <Database class="size-3 text-orange-600" />
        </div>
      </div>
    </template>
    <div class="flex flex-col gap-2 py-4">
      <el-tabs v-model="activeTab">
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
  </DrawerLayout>
</template>
