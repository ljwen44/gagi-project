<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { Edit } from '@vben/icons';

import { ElMessage } from 'element-plus';

import { getInfoList, Type } from '#/api/core/administration';
import TableLayout from '#/components/table-layout/index.vue';
import RemibursementForm from '#/components/ui/administration/reimbursement/form.vue';
import RemibursementDrawer from '#/components/ui/drawers/administration/reimbursementDrawer.vue';

import { columns, formItems, tabbar } from './config';

const remibursementFormRef = useTemplateRef('remibursementFormRef');

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
    :api="(args: any) => getInfoList(Type.reimbursement, args)"
    :columns
    :form-items="formItems"
    :tabbar="tabbar"
  >
    <template #action>
      <el-button
        size="default"
        type="primary"
        @click="
          remibursementFormRef?.openModal({
            title: '新增报销申请',
          })
        "
      >
        添加
      </el-button>
    </template>

    <template #reimbursementNo="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openDrawer(row, $index)"
      >
        {{ row.reimbursementNo }}
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
            remibursementFormRef?.openModal({
              title: '编辑报销申请',
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
      <RemibursementForm ref="remibursementFormRef" @confirm="refreshData" />

      <RemibursementDrawer
        :id="previewId"
        :show
        :type="Type.reimbursement"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1)"
        @prev="handleNextPreview(tableData, -1)"
      />
    </template>
  </TableLayout>
</template>

<style lang="scss" scoped></style>
