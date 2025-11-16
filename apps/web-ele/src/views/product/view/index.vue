<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { Edit, Trash2 } from '@vben/icons';

import { ElMessage } from 'element-plus';

import { deleteProductById, getProdcutList } from '#/api/core/product';
import TableLayout from '#/components/table-layout/index.vue';
import ProductDrawer from '#/components/ui/drawers/product/productDrawer.vue';
import ProductForm from '#/components/ui/product/form.vue';

import { columns, formItems } from './config';

const showDrawer = ref(false);
const currentProductId = ref(0);
const tableLayoutRef = useTemplateRef('tableLayoutRef');
const productFormRef = useTemplateRef('productFormRef');

const openDrawer = (row: any) => {
  showDrawer.value = true;
  currentProductId.value = row.id;
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
</script>

<template>
  <TableLayout
    ref="tableLayoutRef"
    :api="getProdcutList"
    :columns
    :form-items="formItems"
  >
    <template #action>
      <el-button
        type="primary"
        v-auth="'customer:add'"
        @click="productFormRef?.openModal()"
      >
        新增
      </el-button>
    </template>

    <template #productNo="{ row }">
      <el-link type="primary" @click="openDrawer(row)">
        {{ row.productNo }}
      </el-link>
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
          @confirm="handleDelete(row.id)"
        >
          <template #reference>
            <Trash2 class="size-4 cursor-pointer text-red-500" />
          </template>
        </el-popconfirm>
      </div>
    </template>

    <ProductForm ref="productFormRef" @confirm="refreshData" />

    <ProductDrawer
      :id="currentProductId"
      :show="showDrawer"
      @closed="showDrawer = false"
    />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
