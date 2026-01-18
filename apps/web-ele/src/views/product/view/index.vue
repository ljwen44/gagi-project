<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { Edit, Trash2 } from '@vben/icons';

import { ElMessage } from 'element-plus';

import { deleteProductById, getProductList } from '#/api/core/product';
import TableLayout from '#/components/table-layout/index.vue';
import ProductDrawer from '#/components/ui/drawers/product/productDrawer.vue';
import ProductForm from '#/components/ui/product/form.vue';

import { columns, formItems } from './config';

const showDrawer = ref(false);
const previewId = ref(0);
const currentPreviewIndex = ref(0);
const tableLayoutRef = useTemplateRef('tableLayoutRef');
const productFormRef = useTemplateRef('productFormRef');

const openDrawer = (row: any, index: number) => {
  showDrawer.value = true;
  previewId.value = row.id;
  currentPreviewIndex.value = index;
};

const handleDelete = async (id: number) => {
  try {
    await deleteProductById(id);
    ElMessage.success('删除成功');
    tableLayoutRef.value?.query();
  } catch {}
};

const refreshData = () => {
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

  previewId.value = list[currentPreviewIndex.value].id;
};

const handleCloseDrawer = () => {
  showDrawer.value = false;
  tableLayoutRef.value?.query();
};
</script>

<template>
  <TableLayout
    ref="tableLayoutRef"
    :api="getProductList"
    :columns
    :form-items="formItems"
  >
    <template #action>
      <el-button
        type="primary"
        v-auth="'product:add'"
        @click="productFormRef?.openModal()"
      >
        新增
      </el-button>
    </template>

    <template #productNo="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openDrawer(row, $index)"
      >
        {{ row.productNo }}
      </el-text>
    </template>
    <template #isCertified="{ row }">
      <el-tag :type="row.isCertified ? 'primary' : 'info'">
        {{ row.isCertified ? '是' : '否' }}
      </el-tag>
    </template>
    <template #isNotarized="{ row }">
      <el-tag :type="row.isNotarized ? 'primary' : 'info'">
        {{ row.isNotarized ? '是' : '否' }}
      </el-tag>
    </template>

    <template #operator="{ row }">
      <div class="flex items-center justify-center gap-2">
        <Edit
          class="size-4 cursor-pointer"
          v-auth="'product:add'"
          @click="
            productFormRef?.openModal({
              title: '编辑产品',
              target: {
                ...row,
              },
            })
          "
        />
        <el-popconfirm
          :width="180"
          placement="bottom"
          title="确认删除该产品吗?"
          v-auth="'product:delete'"
          @confirm="handleDelete(row.id)"
        >
          <template #reference>
            <Trash2 class="size-4 cursor-pointer text-red-500" />
          </template>
        </el-popconfirm>
      </div>
    </template>

    <template #default="{ tableData }">
      <ProductForm ref="productFormRef" @confirm="refreshData" />

      <ProductDrawer
        :id="previewId"
        :show="showDrawer"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1)"
        @prev="handleNextPreview(tableData, -1)"
      />
    </template>
  </TableLayout>
</template>
