<script lang="ts" setup>
import { useTemplateRef } from 'vue';

import { Edit } from '@vben/icons';

import { getRoleDetailList } from '#/api/core';
import TableLayout from '#/components/table-layout/index.vue';
import RoleForm from '#/components/ui/user/roleForm.vue';

import { columns, formItems } from './config';

interface Permission {
  id: number;
  children: Permission[];
  roleName: string;
  roleCode: string;
}

const roleFormRef = useTemplateRef('roleFormRef');
const tableLayoutRef = useTemplateRef('tableLayoutRef');

const refreshData = () => {
  tableLayoutRef.value?.query();
};

const builePermissionTree = (permissions: Permission[]): number[][] => {
  const result: number[][] = [];

  const traverse = (nodes: Permission[], path: number[] = []) => {
    nodes.forEach((node) => {
      const currentPath = [...path, node.id];

      if (!node.children || node.children.length === 0) {
        // 如果是叶子节点，将完整路径添加到结果中
        result.push(currentPath);
      } else {
        // 如果有子节点，继续递归
        traverse(node.children, currentPath);
      }
    });
  };

  traverse(permissions);
  return result;
};
</script>

<template>
  <TableLayout
    ref="tableLayoutRef"
    :api="getRoleDetailList"
    :columns
    :form-items="formItems"
    hidden-filter
  >
    <template #action>
      <el-button type="primary" @click="roleFormRef?.openModal()">
        新增
      </el-button>
    </template>

    <template #operator="{ row }">
      <div class="flex items-center justify-center gap-2">
        <Edit
          class="size-4 cursor-pointer text-[var(--el-color-primary)]"
          @click="
            roleFormRef?.openModal({
              target: {
                ...row,
                permissionIds: builePermissionTree(row.permissionTrees),
              },
              title: '编辑角色',
            })
          "
        />
      </div>
    </template>

    <RoleForm ref="roleFormRef" @confirm="refreshData" />
  </TableLayout>
</template>
