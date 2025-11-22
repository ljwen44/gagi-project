<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { Database, Edit } from '@vben/icons';
import { useUserStore } from '@vben/stores';
// import { VbenHelpTooltip } from '@vben-core/shadcn-ui';

import { ElMessage } from 'element-plus';

import { getCustomerList, updateCustomer } from '#/api/core/customer';
import TableLayout from '#/components/table-layout/index.vue';
import CustomerForm, {
  type FormProps,
} from '#/components/ui/customer/form.vue';
import CustomerDetailDrawer from '#/components/ui/drawers/customer/customerDetail.vue';

import { columns, formItems, tabbar } from './config';

const customerFormRef = useTemplateRef('customerFormRef');
const tableLayoutRef = useTemplateRef('tableLayoutRef');
const showModal = ref(false);
const currentTab = ref('');
const currentPreviewIndex = ref(0);
const previewCustomerId = ref<number | undefined>();

const userStore = useUserStore();
// const handleSelectionChange = () => {
//   // todo
// };
const beforeQuery = (queryParams: Record<string, any>) => {
  queryParams.isPublicSea = 0;
  queryParams.dealt = currentTab.value;
};

const refreshData = () => {
  tableLayoutRef.value?.query();
};
const openCustomerDetail = (id: number, index: number) => {
  previewCustomerId.value = id;
  showModal.value = true;
  currentPreviewIndex.value = index;
};

const handleTabChange = (tab: string) => {
  currentTab.value = tab === 'all' ? '' : tab;
  requestAnimationFrame(refreshData);
};

const pushCustomerToSea = async (row: FormProps) => {
  try {
    await updateCustomer({ ...row, isPublicSea: 1 });
    ElMessage.success('操作成功');
    refreshData();
  } catch {
    ElMessage.error('操作失败');
  }
};
const handleCloseDrawer = () => {
  showModal.value = false;
  tableLayoutRef.value?.query();
};

const handleNextPreview = (list: any, symbol: number) => {
  currentPreviewIndex.value += symbol;
  if (currentPreviewIndex.value === list.length) {
    currentPreviewIndex.value--;
    ElMessage.info('已是最后一页');
    return;
  }

  if (currentPreviewIndex.value < 0) {
    currentPreviewIndex.value = 0;
    ElMessage.info('已是第一页');
    return;
  }

  previewCustomerId.value = list[currentPreviewIndex.value].id;
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
    @tab-change="handleTabChange"
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
    <template #customerNo="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openCustomerDetail(row.id, $index)"
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
        <el-popconfirm
          placement="bottom"
          title="确认把该客户放入公海吗?"
          width="220"
          @confirm="pushCustomerToSea(row)"
        >
          <template #reference>
            <Database class="size-4 cursor-pointer text-orange-600" />
          </template>
        </el-popconfirm>
      </div>
    </template>

    <template #default="{ tableData }">
      <CustomerForm ref="customerFormRef" @confirm="refreshData" />

      <CustomerDetailDrawer
        :id="previewCustomerId"
        :show="showModal"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1)"
        @prev="handleNextPreview(tableData, -1)"
      />
    </template>
  </TableLayout>
</template>

<style lang="scss" scoped></style>
