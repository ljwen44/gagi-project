<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { AlertCircle } from '@vben/icons';
import { VbenHelpTooltip } from '@vben-core/shadcn-ui';

import TableLayout from '#/components/table-layout/index.vue';
import CustomerForm from '#/components/ui/customer/form.vue';
import CustomerDetailDrawer from '#/components/ui/drawers/customer/customerDetail.vue';

import { columns, customerFlagMap, formItems, tabbar } from './config';

const customerFormRef = useTemplateRef('customerFormRef');
const modalType = ref('');
</script>

<template>
  <TableLayout
    :api="() => []"
    :columns
    :form-items="formItems"
    :tabbar="tabbar"
  >
    <template #action>
      <el-button type="primary" @click="customerFormRef?.openModal()">
        新增
      </el-button>
      <el-button type="primary" @click="modalType = 'customer'">
        抽屉
      </el-button>
    </template>
    <template #customerFlagHeader>
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
    </template>

    <CustomerForm ref="customerFormRef" />

    <CustomerDetailDrawer
      id=""
      :show="modalType === 'customer'"
      @closed="modalType = ''"
    />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
