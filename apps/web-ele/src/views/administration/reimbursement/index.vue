<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { Edit, Trash2 } from '@vben/icons';
import { mockApi } from '@vben/utils';

import TableLayout from '#/components/table-layout/index.vue';
import RemibursementForm from '#/components/ui/administration/reimbursement/form.vue';
import RemibursementDrawer from '#/components/ui/drawers/administration/reimbursementDrawer.vue';

import { columns, formItems, tabbar } from './config';

const remibursementFormRef = useTemplateRef('remibursementFormRef');

const show = ref(false);
</script>

<template>
  <TableLayout
    :api="() => mockApi(columns)"
    :columns
    :form-items="formItems"
    :tabbar="tabbar"
  >
    <template #action>
      <el-button
        size="default"
        type="primary"
        @click="remibursementFormRef?.openModal()"
      >
        添加
      </el-button>
    </template>

    <template #number="{ row }">
      <el-link type="primary" @click="show = true">
        {{ row.number }}
      </el-link>
    </template>

    <template #status="{ row }">
      <el-tag effect="dark" type="success">{{ row.status }}</el-tag>
    </template>

    <template #operator>
      <div class="flex items-center justify-center gap-2">
        <Edit
          class="size-4 cursor-pointer text-[var(--el-color-primary)]"
          @click="remibursementFormRef?.openModal('编辑报销申请')"
        />
        <el-popconfirm placement="bottom" title="确定删除该数据吗?" width="180">
          <template #reference>
            <Trash2
              class="size-4 cursor-pointer text-[var(--el-color-danger)]"
            />
          </template>
        </el-popconfirm>
      </div>
    </template>

    <RemibursementForm ref="remibursementFormRef" />

    <RemibursementDrawer :show @closed="show = false" />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
