<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { Edit } from '@vben/icons';

import { ElMessage } from 'element-plus';

import { getInfoList, Type } from '#/api/core/administration';
import TableLayout from '#/components/table-layout/index.vue';
import PaymentForm from '#/components/ui/administration/payment/form.vue';
import PaymentDrawer from '#/components/ui/drawers/administration/paymentDrawer.vue';

import { columns, formItems, tabbar } from './config';

const paymentFormRef = useTemplateRef('paymentFormRef');

const show = ref(false);
const previewId = ref();
const currentPreviewIndex = ref(0);
const tableLayoutRef = useTemplateRef('tableLayoutRef');

const refreshData = () => {
  tableLayoutRef.value?.query();
};

const openDrawer = (row: any, index: number) => {
  currentPreviewIndex.value = index;
  previewId.value = row.id;
  show.value = true;
};

const handleCloseDrawer = () => {
  show.value = false;
  tableLayoutRef.value?.query();
  previewId.value = void 0;
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

  previewId.value = list[currentPreviewIndex.value].id;
};
</script>

<template>
  <TableLayout
    ref="tableLayoutRef"
    :api="(args: any) => getInfoList(Type.paymentApply, args)"
    :columns
    :form-items="formItems"
    :tabbar="tabbar"
  >
    <template #action>
      <el-button
        type="primary"
        @click="
          paymentFormRef?.openModal({
            title: '新增付款申请',
          })
        "
      >
        添加
      </el-button>
    </template>

    <template #paymentNo="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openDrawer(row, $index)"
      >
        {{ row.paymentNo }}s
      </el-text>
    </template>

    <template #status="{ row }">
      <el-tag effect="dark">{{ row.status }}</el-tag>
    </template>

    <template #operator="{ row }">
      <div class="flex items-center justify-center gap-2">
        <Edit
          class="size-4 cursor-pointer text-[var(--el-color-primary)]"
          @click="
            paymentFormRef?.openModal({
              title: '编辑付款申请',
              target: row,
            })
          "
        />
        <!-- <el-popconfirm placement="bottom" title="确定删除该数据吗?" width="180">
          <template #reference>
            <Trash2
              class="size-4 cursor-pointer text-[var(--el-color-danger)]"
            />
          </template>
        </el-popconfirm> -->
      </div>
    </template>

    <template #default="{ tableData }">
      <PaymentForm ref="paymentFormRef" @confirm="refreshData" />

      <PaymentDrawer
        :id="previewId"
        :show
        :type="Type.paymentApply"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1)"
        @prev="handleNextPreview(tableData, -1)"
      />
    </template>
  </TableLayout>
</template>

<style lang="scss" scoped></style>
