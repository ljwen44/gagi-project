<script lang="ts" setup>
import { ref } from 'vue';

import { Bell, Star } from '@vben/icons';

import DrawerLayout from '#/components/drawer-layout/layout.vue';

import AuditProgress from '../../common/AuditProgress.vue';
import OrderArea from '../../common/OrderArea.vue';
import {
  componentsMap,
  drawerFormItems,
  PatentObjectionTabEnum,
  patentObjectionTabs,
} from './config';

interface IProps {
  show: boolean;
}

defineProps<IProps>();

const emits = defineEmits(['closed']);

const activeTab = ref<PatentObjectionTabEnum>(PatentObjectionTabEnum.detail);

const handleClosed = () => {
  emits('closed');
};

const handleTabChange = (activeName: PatentObjectionTabEnum) => {
  activeTab.value = activeName;
};
</script>

<template>
  <DrawerLayout
    :form="{}"
    :form-items="drawerFormItems"
    :show
    grid-cols="4"
    title="查看工单详情"
    @closed="handleClosed"
  >
    <template #pre-content>
      <div class="flex flex-col gap-2">
        <el-alert title="xxx 通过了" type="success" />

        <div class="flex items-center gap-2">
          <el-tooltip content="收藏" placement="top">
            <div class="cursor-pointer rounded-md bg-orange-200 p-2">
              <Star class="size-3 text-orange-600" />
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

    <AuditProgress />

    <OrderArea />

    <div class="flex flex-col gap-2 py-4">
      <el-tabs v-model="activeTab" @tab-change="handleTabChange">
        <el-tab-pane
          v-for="item in patentObjectionTabs"
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
