<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { Edit, Trash2 } from '@vben/icons';
import { mockApi } from '@vben/utils';

import TableLayout from '#/components/table-layout/index.vue';
import RestForm from '#/components/ui/administration/rest/form.vue';
import RestDrawer from '#/components/ui/drawers/administration/restDrawer.vue';

import { columns, formItems } from './config';

const restFormRef = useTemplateRef('restFormRef');

const show = ref(false);
</script>

<template>
  <TableLayout :api="() => mockApi(columns)" :columns :form-items="formItems">
    <template #action>
      <el-button type="primary" @click="restFormRef?.openModal()">
        添加
      </el-button>
    </template>

    <template #number="{ row }">
      <el-link type="primary" @click="show = true">
        {{ row.number }}
      </el-link>
    </template>

    <template #type="{ row }">
      <el-tag type="primary" @click="show = true">
        {{ row.number }}
      </el-tag>
    </template>

    <template #status="{ row }">
      <el-tag effect="dark" type="success">{{ row.status }}</el-tag>
    </template>

    <template #operator>
      <div class="flex items-center justify-center gap-2">
        <Edit
          class="size-4 cursor-pointer text-[var(--el-color-primary)]"
          @click="restFormRef?.openModal('编辑请假申请')"
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

    <RestForm ref="restFormRef" />

    <RestDrawer :show @closed="show = false" />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
