<script lang="ts" setup>
import { ref } from 'vue';

import { useDrawerForm } from '@vben/hooks';

import { getProductById } from '#/api/core/product';
import Atable from '#/components/common/table/index.vue';
import DrawerLayout from '#/components/drawer-layout/layout.vue';

import {
  componentsMap,
  drawerFormItems,
  ProductTabEnum,
  productTabs,
  serviceItemsColumns,
} from './config';

interface IProps {
  show: boolean;
  id: number;
}

const props = defineProps<IProps>();

const emits = defineEmits(['closed']);

const activeTab = ref<ProductTabEnum>(ProductTabEnum.additionalItem);
const { form } = useDrawerForm(props, getProductById);

const handleClosed = () => {
  activeTab.value = ProductTabEnum.additionalItem;
  emits('closed');
};

const handleTabChange = (activeName: ProductTabEnum) => {
  activeTab.value = activeName;
};
</script>

<template>
  <DrawerLayout
    :form
    :form-items="drawerFormItems"
    :show
    grid-cols="3"
    title="查看产品详情"
    @closed="handleClosed"
  >
    <template #templateCode="{ originData }">
      <a
        :href="originData.templateDownloadUrl"
        class="text-[var(--el-color-primary)]"
        download
        >{{ originData.templateName }}
      </a>
    </template>

    <template v-if="form.serviceItems?.length > 0">
      <Atable :columns="serviceItemsColumns" :data="form.serviceItems" />
    </template>

    <div class="flex flex-col gap-2 py-4">
      <el-tabs v-model="activeTab" @tab-change="handleTabChange">
        <el-tab-pane
          v-for="item in productTabs"
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
