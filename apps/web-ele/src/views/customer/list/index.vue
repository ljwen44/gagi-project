<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { Database, Edit } from '@vben/icons';
import { useUserStore } from '@vben/stores';
// import { VbenHelpTooltip } from '@vben-core/shadcn-ui';

import { getCustomerList } from '#/api/core/customer';
import TableLayout from '#/components/table-layout/index.vue';
import CustomerForm from '#/components/ui/customer/form.vue';
import CustomerDetailDrawer from '#/components/ui/drawers/customer/customerDetail.vue';

import { columns, formItems, tabbar } from './config';

const customerFormRef = useTemplateRef('customerFormRef');
const tableLayoutRef = useTemplateRef('tableLayoutRef');
const showModal = ref(false);
const currentForm = ref({});

const userStore = useUserStore();
// const handleSelectionChange = () => {
//   // todo
// };
const beforeQuery = (queryParams: Record<string, any>) => {
  queryParams.isPublicSea = 0;
};

const refreshData = () => {
  tableLayoutRef.value?.query();
};
const openCustomerDetail = (row: any) => {
  currentForm.value = { ...row };
  showModal.value = true;
};
</script>

<template>
  <TableLayout
    ref="tableLayoutRef"
    :api="getCustomerList"
    :before-query
    :columns
    :form-items="formItems"
    :tabbar="tabbar"
  >
    <!-- @select="handleSelectionChange" -->
    <template #action>
      <el-button
        v-if="userStore.hasRole('customer:add')"
        type="primary"
        @click="customerFormRef?.openModal()"
      >
        新增
      </el-button>
    </template>
    <!-- <template #customerFlagHeader>
      <VbenHelpTooltip>
        <template #trigger>
          <AlertCircle class="size-4 text-[#f00]" />
        </template>
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-1">
            1、超级管理员：凡是共享客户统一显示
            <component
              :is="customerFlagMap.share.component"
              v-bind="customerFlagMap.share.props"
            />
            ，渠道客户
            <component
              :is="customerFlagMap.notCoordinated.component"
              v-bind="customerFlagMap.notCoordinated.props"
            />
            （未协同）
            <component
              :is="customerFlagMap.coordinated.component"
              v-bind="customerFlagMap.coordinated.props"
            />
            （已协同）。
          </div>
          <div class="flex items-center gap-1">
            2、普通用户：凡是我共享出去的显示
            <component
              :is="customerFlagMap.upGreen.component"
              v-bind="customerFlagMap.upGreen.props"
            />
            （只读）
            <component
              :is="customerFlagMap.upRed.component"
              v-bind="customerFlagMap.upRed.props"
            />
            （读写），共享给我的显示
            <component
              :is="customerFlagMap.downGreen.component"
              v-bind="customerFlagMap.downGreen.props"
            />
            （只读）
            <component
              :is="customerFlagMap.downRed.component"
              v-bind="customerFlagMap.downRed.props"
            />
            （读写），协同客户
            <component
              :is="customerFlagMap.coordinated.component"
              v-bind="customerFlagMap.coordinated.props"
            />。
          </div>
        </div>
      </VbenHelpTooltip>
    </template> -->
    <!-- <template #customerFlag>
      <span></span>
    </template> -->
    <template #customerNo="{ row }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openCustomerDetail(row)"
      >
        {{ row.customerNo }}
      </el-text>
    </template>
    <template #tags="{ row }">
      <el-tag
        v-for="tag in row.tags?.split(',')"
        :key="tag"
        class="mr-0.5"
        type="primary"
      >
        {{ tag }}
      </el-tag>
    </template>
    <template #operator="{ row }">
      <div class="flex items-center justify-center gap-2">
        <Edit
          class="size-4 cursor-pointer text-[var(--el-color-primary)]"
          @click="
            customerFormRef?.openModal({
              target: {
                ...row,
                area: [row.province, row.city, row.district],
                tags: row.tags?.split(','),
              },
              title: '编辑客户',
            })
          "
        />
        <Database class="size-4 cursor-pointer text-orange-600" />
      </div>
    </template>

    <CustomerForm ref="customerFormRef" @confirm="refreshData" />

    <CustomerDetailDrawer
      :form="currentForm"
      :show="showModal"
      @closed="showModal = false"
    />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
