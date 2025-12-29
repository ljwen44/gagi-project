<script lang="ts" setup>
import { useTemplateRef } from 'vue';

import { Edit } from '@vben/icons';
// import { useUserStore } from '@vben/stores';

import { getUserList } from '#/api/core';
import TableLayout from '#/components/table-layout/index.vue';
import UserForm from '#/components/ui/user/form.vue';

import { columns, formItems } from './config';

// const userStore = useUserStore();

const userFormRef = useTemplateRef('userFormRef');
const tableLayoutRef = useTemplateRef('tableLayoutRef');
const refreshData = () => {
  tableLayoutRef.value?.query();
};

// const handleDelete = async (row: any) => {
//   try {
//     await deleteUser(row.id);
//     ElMessage.error('删除成功');
//     refreshData();
//   } catch {
//     ElMessage.error('删除失败');
//   }
// };
</script>

<template>
  <TableLayout
    ref="tableLayoutRef"
    :api="getUserList"
    :columns
    :form-items="formItems"
    hidden-filter
  >
    <template #action>
      <el-button type="primary" @click="userFormRef?.openModal()">
        新增
      </el-button>
    </template>

    <template #operator="{ row }">
      <div class="flex items-center justify-center gap-2">
        <Edit
          class="size-4 cursor-pointer text-[var(--el-color-primary)]"
          @click="
            userFormRef?.openModal({
              target: {
                ...row,
              },
              title: '编辑用户',
            })
          "
        />
        <!-- <el-popconfirm
          placement="bottom"
          title="确认把删除该用户吗?"
          width="220"
          @confirm="handleDelete(row)"
        >
          <template #reference>
            <Trash2 class="size-4 cursor-pointer text-red-600" />
          </template>
        </el-popconfirm> -->
      </div>
    </template>

    <UserForm ref="userFormRef" @confirm="refreshData" />
  </TableLayout>
</template>
