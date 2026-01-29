<!-- eslint-disable unicorn/no-array-reduce -->
<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { useDrawerForm } from '@vben/hooks';
import { Database, SquarePen } from '@vben/icons';

import { ElMessage, ElMessageBox } from 'element-plus';

import { getCustomerById, updateCustomer } from '#/api/core/customer';
import DrawerLayout from '#/components/drawer-layout/layout.vue';
import CustomerForm from '#/components/ui/customer/form.vue';

import {
  componentsMap,
  CustomerTabEnum,
  customerTabs,
  drawerFormItems,
} from './config';

interface IProps {
  id?: number | string;
  show: boolean;
}

const props = defineProps<IProps>();

const emits = defineEmits(['closed']);

const { form, updateForm } = useDrawerForm(props, getCustomerById);

const activeTab = ref<CustomerTabEnum>(CustomerTabEnum.orderRecord);
const customerFormRef = useTemplateRef('customerFormRef');

const handleClosed = () => {
  activeTab.value = CustomerTabEnum.orderRecord;
  emits('closed');
};

const handleTabChange = (activeName: CustomerTabEnum) => {
  requestAnimationFrame(() => (activeTab.value = activeName));
};

const updateCustomerToisPublicSea = async () => {
  try {
    ElMessageBox.confirm('确定将该客户放入公海吗?', 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    });
    await updateCustomer({ ...form.value, isPublicSea: 1 });
    ElMessage.success('操作成功');
  } catch {
    ElMessage.error('操作失败');
  }
};
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
          <el-tooltip v-if="id" content="修改" placement="top">
            <div
              class="cursor-pointer rounded-md bg-blue-200 p-2"
              @click="
                customerFormRef?.openModal({
                  target: {
                    ...form,
                    area: [form.province, form.city, form.district],
                    tags: form.tags?.split(','),
                  },
                  title: '编辑客户',
                })
              "
            >
              <SquarePen class="size-3 text-blue-600" />
            </div>
          </el-tooltip>
          <el-tooltip
            v-if="id && !form.isPublicSea"
            content="放入公海"
            placement="top"
          >
            <div
              class="cursor-pointer rounded-md bg-orange-200 p-2"
              @click="updateCustomerToisPublicSea"
            >
              <Database class="size-3 text-orange-600" />
            </div>
          </el-tooltip>
        </div>
      </slot>
    </template>
    <template #tags="{ data }">
      <el-tag
        v-for="(tag, index) in data?.split(',')"
        :key="index"
        class="mr-2"
        type="primary"
      >
        {{ tag }}
      </el-tag>
    </template>
    <template #address="{ originData }">
      <el-text type="primary">
        {{
          `${originData.province ?? ''}${originData.city ?? ''}${originData.district ?? ''}${originData.detailAddress ?? ''}`
        }}
      </el-text>
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
            :form
          />
          <template #fallback>
            <div class="p-4 text-center">loading...</div>
          </template>
        </Suspense>
      </KeepAlive>
    </div>

    <CustomerForm
      ref="customerFormRef"
      title="修改客户"
      @confirm="updateForm"
    />
  </DrawerLayout>
</template>
