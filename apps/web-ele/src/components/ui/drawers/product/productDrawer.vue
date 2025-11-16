<script lang="ts" setup>
import { ref, watch } from 'vue';

import { getProductById } from '#/api/core/product';
import DrawerLayout from '#/components/drawer-layout/layout.vue';

import {
  componentsMap,
  drawerFormItems,
  ProductTabEnum,
  productTabs,
} from './config';

interface IProps {
  show: boolean;
  id: number;
}

const props = defineProps<IProps>();

const emits = defineEmits(['closed']);

const activeTab = ref<ProductTabEnum>(ProductTabEnum.additionalItem);
const productDetail = ref<Record<string, any>>({});

const handleClosed = () => {
  emits('closed');
};

const handleTabChange = (activeName: ProductTabEnum) => {
  activeTab.value = activeName;
};

const getProductDetail = async () => {
  const data = await getProductById(props.id);
  productDetail.value = data;
};

watch(
  () => props.id,
  () => {
    getProductDetail();
  },
);
</script>

<template>
  <DrawerLayout
    :form="productDetail"
    :form-items="drawerFormItems"
    :show
    grid-cols="3"
    title="查看产品详情"
    @closed="handleClosed"
  >
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
